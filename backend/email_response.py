from langchain_community.chat_models import ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv
import os
import sys
import pymysql

def get_histories(email):
    try:
        # Establish connection
        connection = pymysql.connect(
            host="127.0.0.1",
            user="root",
            password="",  # Replace with your MySQL password
            database="chat-test",
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor  # Optional: Returns results as dictionaries
        )
        
        cursor = connection.cursor()
        # Execute query
        query = """
        SELECT * FROM mail_history WHERE email=%s
        ORDER BY id DESC LIMIT 5
        """
        cursor.execute(query, (email,))
        chat_histories = cursor.fetchall()
        
        return chat_histories
        
    except pymysql.MySQLError as e:
        assert("Error while connecting to MySQL:", e)
    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'connection' in locals() and connection.open:
            connection.close()
            
def get_trigger_responses():
    try:
        # Establish connection
        connection = pymysql.connect(
            host="127.0.0.1",
            user="root",
            password="",  # Replace with your MySQL password
            database="chat-test",
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor  # Optional: Returns results as dictionaries
        )
        
        cursor = connection.cursor()
        # Execute query
        query = """
        SELECT * FROM triggers
        ORDER BY id DESC LIMIT 5
        """
        cursor.execute(query)
        triggers = cursor.fetchall()
        
        return triggers
        
    except pymysql.MySQLError as e:
        assert("Error while connecting to MySQL:", e)
    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'connection' in locals() and connection.open:
            connection.close()

def get_response(query, trigger, user_name, order_id, order_status, keywords, email):
    load_dotenv()
    openai_api_key = os.getenv('OPENAI_API_KEY')
    index_path = "faiss_index"
    # trigger = data["trigger"]
    # query = data["content"]
    # user_name = data["username"]
    # order_id = data["order_id"]
    # order_content = data["order_content"]
    # keywords = data["keywords"]
    system_prompt = "Your response must end with completed sentence."
    
    if(trigger == "contact_us"):
        system_prompt = f"""
        You are a customer service assistant. You should answer the following user's question with relevant information from the provided context. 
        - Your response must end with completed sentence.
        - Don't use *.
        - After response content, provide reference URL itself without any symbol and description if possible.
        - You can response in the style like the following.
        Dear [user's name],

        We appreciate your contact and are here to assist you with your inquiry.

        [Describe your understanding about the query and provide clear and kind answer.]

        If there’s anything else we can help you with, don’t hesitate to reach out. 
        
        Best regards,
        Customer Support Team
        - The user's name is {user_name}."""
    
    elif(trigger == "status"):
        system_prompt = """You are an order-tracking chatbot specializing in assisting customers with updates related to their orders. 
        Please answer the following question with relevant information from the provided documents. Don't use *.
        The asking username is {user_name}.""" 
    
    elif(trigger == "faq"):
        system_prompt = """You are a customer support chatbot specializing in responding to frequently asked questions (FAQs). Please answer the following question with relevant information from the provided documents. Don't use *. 
        The asking username is {user_name}."""

    memory = ConversationBufferMemory()
    
    histories = get_histories(email)
    for history in histories[::-1]:
        memory.chat_memory.add_user_message(history["content"])
        memory.chat_memory.add_ai_message(history["response"])
    
    # Load the saved FAISS store from the disk.
    embeddings_model = OpenAIEmbeddings(api_key=openai_api_key)
    
    store = FAISS.load_local(index_path,  embeddings_model, allow_dangerous_deserialization=True)

    # Create an instance of a ChatGPT turbo model

    llm = ChatOpenAI(model_name="gpt-4o", temperature=0.5, openai_api_key=openai_api_key)

    # Build our Langchain chain instance.
    chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=store.as_retriever(),
        memory=memory
    )
    
    triggers = get_trigger_responses()

    # Ask the LLM a question.
    if(trigger == "contact_us"):
        result = chain({"query": system_prompt + "\nuser: "+ query})
        print(result["result"])
        return result["result"], ""
    elif(trigger == "faq"):
        result = chain({"query": system_prompt + "\nuser: "+ query})
        return result["result"], ""
    elif(trigger == "status"):
        return "Your order"+order_id+" has been "+ order_status + "."
    else:
        item = [obj for obj in triggers if obj["trigger_type"] == trigger]
        if(item):
            return item[0]["response"], item[0]["file"]
        else:
            fallback = [obj for obj in triggers if obj["trigger_type"] == "fallback"]
            if(fallback):
                return fallback[0]["response"], fallback[0]["file"]
            else:
                return "I am sorry but, I can't understand what you mean. Can you inquiry in more detail please?", ""

if __name__ == "__main__":
    query = sys.argv[1]
    trigger = sys.argv[2]
    email = sys.argv[3]
    user_name = sys.argv[4]
    order_id = sys.argv[5]
    order_status = sys.argv[6]
    keywords = sys.argv[7]
    response = get_response(query, trigger, user_name, order_id, order_status, keywords)