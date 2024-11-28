import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import sys
from email_response import get_response
import pymysql
from dotenv import load_dotenv
from email.mime.base import MIMEBase
from email import encoders
import os
import re

def get_triggers(trigger):
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
        SELECT email_bots.email, email_bots.password 
        FROM email_triggers 
        LEFT JOIN email_bots ON email_bots.id = email_triggers.email_id 
        WHERE email_triggers.trigger_type=%s LIMIT 1
        """
        cursor.execute(query, (trigger,))
        email_triggers = cursor.fetchall()
        
        return email_triggers
        
    except pymysql.MySQLError as e:
        assert("Error while connecting to MySQL:", e)
    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'connection' in locals() and connection.open:
            connection.close()

def send_email(content, email, trigger, file_path):
    # Define email server and port
    sender_email = ""
    sender_password = ""
    email_trigger = get_triggers(trigger)
    fallback_trigger = get_triggers("fallback")
    if(len(email_trigger)):
        sender_email = email_trigger[0]["email"]
        sender_password = email_trigger[0]["password"]
    else:
        if(len(fallback_trigger)):
            sender_email = fallback_trigger[0]["email"]
            sender_password = fallback_trigger[0]["password"]
        else:
            sender_email = ""
    load_dotenv()
    server_address = os.getenv('SERVER_ADDRESS')
    # sender_email = "dev@sdrive.ai"
    # sender_password = "M5XmNE7Qg9E79yV>"
    
    if(sender_email):
        smtp_server = "smtp.gmail.com"
        smtp_port = 587

        receiver_email = email

        # Create the email headers
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = "Email from sdrive"

        # Add email body
        body = content
        url_pattern = r"http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+"

        # Replace URLs with HTML links
        body = re.sub(url_pattern, r'<a href="\g<0>">Click here</a>', body)
        message.attach(MIMEText(body, "html"))

        if(file_path):
            with open(file_path, "rb") as file:
                part = MIMEBase("application", "octet-stream")
                part.set_payload(file.read())
                
            encoders.encode_base64(part)
            part.add_header(
                "Content-Disposition",
                f"attachment; filename={file_path.split('/')[-1]}"
            )
            message.attach(part)

        try:
            # Connect to Gmail's SMTP server
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()  # Secure the connection
                server.login(sender_email, sender_password)
                server.sendmail(sender_email, receiver_email, message.as_string())

        except Exception as e:
            assert(e)

if __name__ == "__main__":
    query = sys.argv[1]
    trigger = sys.argv[2]
    email = sys.argv[3]
    user_name = sys.argv[4]
    order_id = sys.argv[5]
    order_status = sys.argv[6]
    keywords = sys.argv[7]
    response, image_url = get_response(query, trigger, user_name, order_id, order_status, keywords, email)
    print(response)
    send_email(response, email, trigger, image_url)

