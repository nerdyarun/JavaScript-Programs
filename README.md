# Employee Leave Policy RAG Agent (100% Local & No API Key Needed)

A complete Retrieval-Augmented Generation (RAG) agent built in Python to answer employee questions about company leave policies. 

It runs **entirely locally** on your CPU/GPU without requiring API keys for Google Gemini, OpenAI, or Anthropic.

---

## 🏗️ Project Architecture

- **Vector Database**: `ChromaDB` (local persistence)
- **Embedding Model**: `SentenceTransformers` (`all-MiniLM-L6-v2`)
- **Extractive QA Model**: `HuggingFace Transformers` (`deepset/roberta-base-squad2`)
- **Web UI**: `Streamlit`
- **CLI Interface**: Standard Python REPL

---

## 📁 Project Structure

```text
employee_leave_rag_agent/
│
├── data/                         # Policy documents (.md / .txt)
│   ├── 01_annual_leave_policy.md
│   ├── 02_sick_leave_policy.md
│   ├── 03_parental_leave_policy.md
│   └── 04_casual_unpaid_leave_policy.md
│
├── rag_engine.py                 # Core RAG indexing and query logic
├── main.py                       # Command Line Interface (CLI) app
├── app.py                        # Streamlit Web UI app
├── requirements.txt              # Project dependencies
└── README.md                     # Documentation
```

---

## 🚀 Quick Start Guide

### Step 1: Clone/Extract & Open Terminal
Unzip `employee_leave_rag_agent.zip` and navigate into the folder:

```bash
cd employee_leave_rag_agent
```

### Step 2: Create a Virtual Environment (Optional but Recommended)
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

---

## 💻 Running the Agent

### Option A: Command Line Interface (CLI)
To run in terminal mode:
```bash
python main.py
```

### Option B: Web UI (Streamlit)
To launch the interactive Web Dashboard:
```bash
streamlit run app.py
```
Then open your browser at `http://localhost:8501`.

---

## 📄 Adding Custom Policy Documents

You can add your own `.md` or `.txt` policy files into the `data/` folder. When you run the application, the `rag_engine.py` will automatically parse and index new policy sections into your local vector database.
# rag_agent_pyhton_offline
