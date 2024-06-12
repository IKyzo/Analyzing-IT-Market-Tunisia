import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime

# Function to scrape data from a specific page
def scrape_page(url):
    response = requests.get(url)

    # Request was successful code: 200
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')

        # Select job elements
        job_elements = soup.find_all('div', class_='Post')

        # Check if any job elements were found
        if job_elements:
            print(f"Found {len(job_elements)} job elements on {url}.")

            # Initialize lists to store data
            job_titles = []
            job_descriptions = []
            company_names = []
            job_detail_urls = []  # New list to store job detail page URLs
            job_posted_dates = []

            # Iterating through elements
            for job in job_elements:
                job_title_element = job.find('h1').find('a')
                job_description_element = job.find('div', style='line-height:18px;font-size:12px; font-family:Verdana, Geneva, sans-serif')
                company_name_element = job.find('p', class_='PostInfo')
                job_detail_url_element = job_title_element['href']  # Get URL of job detail page
                job_posted_date_element = job.find('strong', class_='month')

                # Extract data and append to lists
                job_titles.append(job_title_element.text.strip() if job_title_element else "Title not found")
                job_descriptions.append(job_description_element.text.strip() if job_description_element else "Description not found")
                company_names.append(company_name_element.text.strip() if company_name_element else "Company not found")
                job_detail_urls.append(job_detail_url_element)
                job_posted_dates.append(job_posted_date_element.text.strip() if job_posted_date_element else "Date not found")

            # Create a DataFrame
            data = {'Job Title': job_titles, 'Description': job_descriptions, 'Company': company_names, 'Detail URL': job_detail_urls, 'Posted Date': job_posted_dates}
            df = pd.DataFrame(data)

            return df

        else:
            print(f"No job elements found on {url}.")

    else:
        print(f"Failed to retrieve the page {url}. Status Code: {response.status_code}")
        return None

# Function to scrape job detail page for location and company information
def scrape_job_detail_page(detail_url):
    response = requests.get(detail_url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find the first `CententSingleCadre` div
        content_div = soup.find('div', class_='CententSingleCadre')
        location = "Location not found"
        company_name = "Company not found"
        
        if content_div:
            paragraphs = content_div.find_all('p')
            for p in paragraphs:
                if "Ville" in p.text:
                    strong_tags = p.find_all('strong')
                    if len(strong_tags) >= 2:
                        location = strong_tags[0].text.strip()
                        company_name = strong_tags[1].text.strip()
                    break
        
        # Debug output to check the extraction
        print(f"Debug: URL={detail_url}, Location={location}, Company={company_name}")
        
        return location, company_name
    else:
        print(f"Failed to retrieve the page {detail_url}. Status Code: {response.status_code}")
        return "Location not found", "Company not found"


# Main code to iterate through pages
base_url = "https://www.tunisietravail.net/category/offres-d-emploi-et-recrutement/it/page/"

# Set the range of pages you want to scrape
start_page = 1
end_page = 2  # Change this to the desired end page

# Initialize an empty DataFrame to store the results
final_df = pd.DataFrame()

for page_number in range(start_page, end_page + 1):
    page_url = f"{base_url}{page_number}/"
    page_df = scrape_page(page_url)

    if page_df is not None:
        # Scrape job detail page for location and company information
        page_df[['Location', 'Company']] = page_df['Detail URL'].apply(lambda url: pd.Series(scrape_job_detail_page(url)))
        final_df = pd.concat([final_df, page_df], ignore_index=True)

# Display the final DataFrame
print(final_df)

# Generate a new filename based on the current date and time
current_datetime = datetime.now().strftime('%Y%m%d_%H%M%S')
new_filename = f'TunisieTravail_data_all_pages_{current_datetime}.xlsx'

# Save the final DataFrame to an Excel file
final_df.to_excel(new_filename, index=False)
