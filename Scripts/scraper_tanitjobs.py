import os
import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import time 


# # Set the path to the CA bundle
# ca_bundle_path = r'C:\Users\wajdk\AppData\Local\Programs\Python\Python312\Lib\site-packages\certifi\cacert.pem'

# # Set the REQUESTS_CA_BUNDLE environment variable
# os.environ['REQUESTS_CA_BUNDLE'] = ca_bundle_path
# Function to scrape data from a specific page
def scrape_page(url):
    # Specify the path to the CA bundle

    response = requests.get(url, verify=False)

    # Request was successful code: 200
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')

        # Select job elements
        job_elements = soup.find_all('article', class_='media well listing-item listing-item__jobs')

        # Check if any job elements were found
        if job_elements:
            print(f"Found {len(job_elements)} job elements on {url}.")

            # Initialize lists to store data
            job_titles = []
            job_descriptions = []
            company_names = []
            job_locations = []
            job_posted_dates = []

            # Iterating through elements
            for job in job_elements:
                # Extract job title
                job_title_element = job.find('div', class_="media-heading listing-item__title")
                job_titles.append(job_title_element.text.strip() if job_title_element else "Title not found")

                # Extract job description
                job_description_element = job.find('div', class_='listing-item__desc hidden-sm hidden-xs')
                job_descriptions.append(job_description_element.text.strip() if job_description_element else "Description not found")

                # Extract company name
                company_name_element = job.find('span', class_='listing-item__info--item listing-item__info--item-company')
                company_names.append(company_name_element.text.strip() if company_name_element else "Company not found")

                # Extract job location
                job_location_element = job.find('span', class_='listing-item__info--item listing-item__info--item-location')
                job_locations.append(job_location_element.text.strip() if job_location_element else "Location not found")

                # Extract job posted date
                job_posted_date_element = job.find('div', class_='listing-item__date')
                job_posted_dates.append(job_posted_date_element.text.strip() if job_posted_date_element else "Date not found")

            # Create a DataFrame
            data = {'Job Title': job_titles, 'Description': job_descriptions, 'Company': company_names, 'Location': job_locations, 'Posted Date': job_posted_dates}
            df = pd.DataFrame(data)

            return df

        else:
            print(f"No job elements found on {url}.")

    else:
        print(f"Failed to retrieve the page {url}. Status Code: {response.status_code}")
        return None

# Main code to iterate through pages
base_url = "https://www.tanitjobs.com/jobs/?searchId=1718202132.3573&action=search&page="

# Set the range of pages you want to scrape
start_page = 1
end_page = 20  # Change this to the desired end page

# Initialize an empty DataFrame to store the results
final_df = pd.DataFrame()

for page_number in range(start_page, end_page + 1):
    page_url = f"{base_url}{page_number}"
    page_df = scrape_page(page_url)

    if page_df is not None:
        final_df = pd.concat([final_df, page_df], ignore_index=True)
    time.sleep(5)
# Display the final DataFrame
print(final_df)

# Generate a new filename based on the current date and time
current_datetime = datetime.now().strftime('%Y%m%d_%H%M%S')
new_filename = f'Tanitjob_data_all_pages_{current_datetime}.xlsx'

# Save the final DataFrame to an Excel file
final_df.to_excel(new_filename, index=False)
