import validators
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
from driver import CustomWebDriver
import sys
from urllib.parse import urljoin
import json

def is_valid_url(url):
    return validators.url(url)

def get_links(path):
    if(is_valid_url(path)):
        driver = CustomWebDriver(is_eager=True)
        max_scroll_attempts=20
        last_height = driver.execute_script("return document.body.scrollHeight")
        scroll_attempts = 0
        
        driver.get(path)

        while scroll_attempts < max_scroll_attempts:
            # Scroll to the bottom of the page
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

            # Wait to allow content to load
            time.sleep(4)

            # Calculate new scroll height after scrolling
            new_height = driver.execute_script("return document.body.scrollHeight")
            
            if new_height == last_height:
                # Break the loop if no new content is loaded
                break
            else:
                last_height = new_height
                scroll_attempts += 1
        
        all_links = driver.find_elements("tag name", "a")
        urls = []
        # Process each link based on its type
        for link in all_links:
            href = link.get_attribute("href")
            if href:
                # Case 1: Absolute URL (starts with http or https)
                if href.startswith("http://") or href.startswith("https://"):
                    complete_url = href  # Already a complete URL

                # Case 2: Protocol-relative URL (starts with //)
                elif href.startswith("//"):
                    complete_url = "https:" + href  # Assuming https; change if needed

                # Case 3: Relative URL (doesn't start with http://, https://, or //)
                else:
                    complete_url = urljoin(path, href)  # Convert to absolute URL using base_url

                if(is_valid_url(complete_url) and len(complete_url) < 120):
                    urls.append(complete_url)
        
        url_no_duplicates = []
        [url_no_duplicates.append(item) for item in urls if item not in url_no_duplicates]

        # Close the WebDriver
        driver.quit()
        return url_no_duplicates
        
    
if __name__ == "__main__":
    path = sys.argv[1]
    urls = get_links(path)
    print(json.dumps(urls, indent=4))