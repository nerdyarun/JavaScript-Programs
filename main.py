import sys
from rag_engine import LeaveRAGEngine

def main():
    print("=" * 60)
    print("      LOCAL EMPLOYEE LEAVE POLICY RAG AGENT (CLI)     ")
    print("=" * 60)
    print("System initializing local models & vector storage (No API Key Required)...\n")
    
    engine = LeaveRAGEngine()
    
    print("\nInitialization Complete! Ask any question about leave policies.")
    print("Type 'exit' or 'quit' to end the session.\n")
    
    while True:
        try:
            query = input("\n[Employee Question]: ").strip()
            if query.lower() in ["exit", "quit", "q"]:
                print("Exiting Leave RAG Agent. Goodbye!")
                break
                
            if not query:
                continue
                
            print("Searching policy documents and extracting answer...")
            result = engine.query(query)
            
            print("\n" + "-" * 50)
            print(f"🤖 ANSWER: {result['answer']}")
            print(f"📁 SOURCES: {', '.join(result['sources'])}")
            print("-" * 50)
            
            show_context = input("\nWould you like to view retrieved policy snippets? (y/n): ").strip().lower()
            if show_context == 'y':
                print("\n--- RETRIEVED CONTEXT ---")
                for i, chunk in enumerate(result['retrieved_chunks'], 1):
                    print(f"[{i}] {chunk}\n")
                    
        except KeyboardInterrupt:
            print("\nExiting Leave RAG Agent. Goodbye!")
            sys.exit(0)

if __name__ == "__main__":
    main()
