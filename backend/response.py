from langchain_community.chat_models import ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv
import os
import sys

def get_response(query):
    load_dotenv()
    openai_api_key = os.getenv('OPENAI_API_KEY')
    index_path = "faiss_index"
    system_prompt = "You are a helpful assistant knowledgeable about various topics. Please answer the following question with relevant information from the provided documents."

    # Load the saved FAISS store from the disk.
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    embeddings_model = OpenAIEmbeddings(api_key=openai_api_key)
    store = FAISS.load_local(index_path,  embeddings_model, allow_dangerous_deserialization=True)

    # Create an instance of a ChatGPT turbo model

    llm = ChatOpenAI(model_name="gpt-4o", temperature=0, openai_api_key=openai_api_key)

    # Build our Langchain chain instance.
    chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=store.as_retriever(),
        memory=memory
    )

    # Ask the LLM a question.
    result = chain({"query": system_prompt + query})
    print(result["result"])

if __name__ == "__main__":
    query = sys.argv[1]
    get_response(query)