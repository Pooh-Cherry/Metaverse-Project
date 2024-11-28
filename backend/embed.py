from langchain.document_loaders import (
    Docx2txtLoader, TextLoader, UnstructuredPowerPointLoader,
    PyPDFLoader, UnstructuredExcelLoader, CSVLoader, WebBaseLoader
)
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
import os
from dotenv import load_dotenv
import sys
import validators

from langchain.document_loaders.base import BaseLoader
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
from driver import CustomWebDriver
from langchain.schema import Document

class SeleniumWebLoader(BaseLoader):
    def __init__(self, url, driver):
        """
        :param url: URL to load content from.
        """
        self.url = url
        self.driver = driver

    def load_all_content(self, scroll_pause_time=4, max_scroll_attempts=20):
        """
        Scrolls the page to load all content.
        :param driver: The Selenium WebDriver instance.
        :param scroll_pause_time: Pause time between scrolls (in seconds).
        :param max_scroll_attempts: Maximum scroll attempts to prevent infinite loop.
        """
        last_height = self.driver.execute_script("return document.body.scrollHeight")
        scroll_attempts = 0

        while scroll_attempts < max_scroll_attempts:
            # Scroll to the bottom of the page
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

            # Wait to allow content to load
            time.sleep(scroll_pause_time)

            # Calculate new scroll height after scrolling
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            
            if new_height == last_height:
                # Break the loop if no new content is loaded
                break
            else:
                last_height = new_height
                scroll_attempts += 1

        print("Scrolling complete or maximum scroll attempts reached.")
    
    def load(self):
        documents = []
        # Set up the Selenium WebDriver
        
        self.driver.get(self.url)
        time.sleep(1)  # Wait for page to load

        self.load_all_content()
        
        # Fetch the entire page content
        body = self.driver.find_element(By.TAG_NAME, "body")
        page_content=  body.text
        
        links = body.find_elements(By.TAG_NAME, "a")

        # Loop through each link and extract both the text and href attribute
        for link in links:
            text = link.text  # Get the text of the link
            href = link.get_attribute("href")  # Get the href attribute of the link
            page_content = page_content + f"Link Text: {text}, URL: {href}"
        
        documents.append(Document(page_content=page_content, metadata={"url": self.url}))
        
        self.driver.quit()
        
        return documents

load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')
index_path = "faiss_index"

loaders = {
    '.doc': Docx2txtLoader,
    '.docx': Docx2txtLoader,
    '.txt': TextLoader,
    '.ppt': UnstructuredPowerPointLoader,
    '.pptx': UnstructuredPowerPointLoader,
    '.pdf': PyPDFLoader,
    '.xls': UnstructuredExcelLoader,
    '.xlsx': UnstructuredExcelLoader,
    '.csv': CSVLoader
}

def is_valid_url(url):
    return validators.url(url)

def process_file(path, embedding_type):
    if(embedding_type == "file"):
        ext = os.path.splitext(path)[1]
        loader_class = loaders.get(ext)
        if loader_class:
            loader = loader_class(path)
            documents = loader.load()
            embeddings_model = OpenAIEmbeddings(api_key=openai_api_key)
            if os.path.exists(index_path):
                vectorstore = FAISS.load_local(index_path, embeddings_model, allow_dangerous_deserialization=True)
                vectorstore.add_documents(documents)
            else:
                vectorstore = FAISS.from_documents(documents, embeddings_model)
            vectorstore.save_local(index_path)  # Save the new index
            print("done")
        else:
            raise ValueError(f"Unsupported file type: {ext}")
    elif(embedding_type == "url"):
        if(is_valid_url(path)):
            driver = CustomWebDriver(is_eager=True)
            loader = SeleniumWebLoader(path, driver)
            documents = loader.load()
            embeddings_model = OpenAIEmbeddings(api_key=openai_api_key) 
            if os.path.exists(index_path):
                vectorstore = FAISS.load_local(index_path, embeddings_model, allow_dangerous_deserialization=True)
                vectorstore.add_documents(documents)
            else:
                vectorstore = FAISS.from_documents(documents, embeddings_model)
            vectorstore.save_local(index_path)  # Save the new index
            print("done")
    elif(embedding_type == "content"):
        documents = []
        documents.append(Document(page_content=path, metadata={"url": "#content"}))
        embeddings_model = OpenAIEmbeddings(api_key=openai_api_key) 
        if os.path.exists(index_path):
            vectorstore = FAISS.load_local(index_path, embeddings_model, allow_dangerous_deserialization=True)
            vectorstore.add_documents(documents)
        else:
            vectorstore = FAISS.from_documents(documents, embeddings_model)
        vectorstore.save_local(index_path)  # Save the new index
        print("done")
    
if __name__ == "__main__":
    path = sys.argv[1]
    embedding_type = sys.argv[2]
    process_file(path, embedding_type)