import os
import glob
import warnings
import chromadb
from chromadb.utils import embedding_functions
from transformers import pipeline, logging

# Suppress Hugging Face & PyTorch warnings
warnings.filterwarnings("ignore")
logging.set_verbosity_error()

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
DB_DIR = os.path.join(os.path.dirname(__file__), "leave_policy_db")

class LeaveRAGEngine:
    def __init__(self, db_path=DB_DIR, data_path=DATA_DIR):
        self.db_path = db_path
        self.data_path = data_path
        
        print("Initializing local embedding model (all-MiniLM-L6-v2)...")
        self.embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"
        )
        
        self.chroma_client = chromadb.PersistentClient(path=self.db_path)
        self.collection = self.chroma_client.get_or_create_collection(
            name="employee_leave_policy",
            embedding_function=self.embedding_fn
        )
        
        if self.collection.count() == 0:
            self.index_documents()
            
        print("Loading local HuggingFace model (Qwen/Qwen2.5-0.5B-Instruct)...")
        self.qa_pipeline = pipeline(
            "text-generation",
            model="Qwen/Qwen2.5-0.5B-Instruct"
        )
        print("RAG Engine Initialization Complete.")

    def load_documents_from_data(self):
        docs = []
        files = glob.glob(os.path.join(self.data_path, "*.md")) + glob.glob(os.path.join(self.data_path, "*.txt"))
        
        for file_path in files:
            file_name = os.path.basename(file_path)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            chunks = [c.strip() for c in content.split("\n\n") if c.strip()]
            for idx, chunk in enumerate(chunks):
                docs.append({
                    "id": f"{file_name}_chunk_{idx}",
                    "content": chunk,
                    "source": file_name
                })
        return docs

    def index_documents(self):
        print("Indexing documents into local ChromaDB...")
        documents = self.load_documents_from_data()
        if not documents:
            print("No policy files found to index!")
            return
        
        ids = [doc["id"] for doc in documents]
        contents = [doc["content"] for doc in documents]
        metadatas = [{"source": doc["source"]} for doc in documents]
        
        self.collection.upsert(
            ids=ids,
            documents=contents,
            metadatas=metadatas
        )
        print(f"Indexed {len(documents)} document chunks successfully.")

    def query(self, question: str, top_k: int = 3):
        search_results = self.collection.query(
            query_texts=[question],
            n_results=top_k
        )
        
        retrieved_docs = search_results["documents"][0] if search_results["documents"] else []
        retrieved_meta = search_results["metadatas"][0] if search_results["metadatas"] else []
        
        if not retrieved_docs:
            return {
                "question": question,
                "answer": "Sorry, I could not find relevant leave policy information for your query.",
                "sources": [],
                "context": "",
                "retrieved_chunks": []
            }
            
        combined_context = "\n".join(retrieved_docs)
        
        messages = [
            {"role": "system", "content": "You are a precise HR Assistant. Answer questions accurately and directly based ONLY on the provided context. Do not invent rules."},
            {"role": "user", "content": f"Context:\n{combined_context}\n\nQuestion: {question}"}
        ]
        
        gen_res = self.qa_pipeline(
            messages, 
            max_new_tokens=150, 
            do_sample=False
        )
        answer_text = gen_res[0]["generated_text"][-1]["content"].strip()
        
        sources = list(set([m["source"] for m in retrieved_meta if "source" in m]))
        
        return {
            "question": question,
            "answer": answer_text,
            "sources": sources,
            "context": combined_context,
            "retrieved_chunks": retrieved_docs
        }

if __name__ == "__main__":
    engine = LeaveRAGEngine()
    response = engine.query("How many days of annual leave do I get per year?")
    print("\n--- SAMPLE QUERY RESULT ---")
    print(f"Question: {response['question']}")
    print(f"Answer: {response['answer']}")
    print(f"Sources: {response['sources']}")
