import streamlit as st
from rag_engine import LeaveRAGEngine

st.set_page_config(
    page_title="Employee Leave Policy Assistant",
    page_icon="🏖️",
    layout="wide"
)

st.title("🏖️ Employee Leave Policy RAG Agent")
st.caption("100% Local & Private HR Assistant — Built with SentenceTransformers & ChromaDB")

@st.cache_resource
def load_rag_engine():
    return LeaveRAGEngine()

with st.spinner("Initializing Local Vector Database & NLP Models..."):
    engine = load_rag_engine()

st.sidebar.header("📋 Policy Documents")
st.sidebar.markdown("""
This local RAG assistant indexes company leave policies:
- **Annual Leave & Vacation**
- **Sick & Medical Leave**
- **Parental & Maternity Leave**
- **Casual & Bereavement Leave**

*No external API keys (like OpenAI or Gemini) are required.*
""")

if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": "Hello! I am your HR Leave Policy Assistant. Ask me anything about annual leaves, sick days, maternity leave, or roll-over policies!"}
    ]

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("Ask a question about leave policies (e.g., 'How many days of paid sick leave do I get?')..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        with st.spinner("Searching HR policies..."):
            res = engine.query(prompt)
            
            response_text = f"**Answer:** {res['answer']}\n\n"
            response_text += f"**Confidence Score:** `{res['confidence'] * 100:.1f}%`  \n"
            response_text += f"**Sources Referenced:** `{', '.join(res['sources'])}`"
            
            st.markdown(response_text)
            
            with st.expander("🔍 View Retrieved Context Chunks"):
                for idx, chunk in enumerate(res['retrieved_chunks'], 1):
                    st.markdown(f"**Chunk {idx}:**")
                    st.info(chunk)

    st.session_state.messages.append({"role": "assistant", "content": response_text})
