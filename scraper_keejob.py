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

        # Selectors for both featured and regular jobs
        job_elements_featured = soup.find_all('div', class_='block_white_a post clearfix premium-job-block')
        job_elements_regular = soup.find_all('div', class_='block_white_a post clearfix silver-job-block')

        # Combine both types of job elements
        job_elements = job_elements_featured + job_elements_regular

        # Check if any job elements were found
        if job_elements:
            print(f"Found {len(job_elements)} job elements on {url}.")

            # Initialize lists to store data
            job_titles = []
            job_descriptions = []
            company_names = []
            job_locations = []
            tags = []  # New column for tags

            # Iterating through elements
            for job in job_elements:
                job_title_element = job.find('a', {'style': 'color: #005593;'})
                job_description_element = job.find('p', {'style': 'margin-bottom:3px'})
                company_name_element = job.find('div', class_='span12 no-margin-left').find('a', href=lambda value: value and value.startswith('/offres-emploi/companies/'))
                job_location_element = job.find('i', class_='fa fa-map-marker')

                # Debug: Print the company name element HTML
                print("Company Name Element HTML:", company_name_element)

                # Extract and print job title
                job_title = job_title_element.text.strip() if job_title_element else "Title not found"
                print("Job Title:", job_title)

                # Extract and print job description
                job_description = job_description_element.text.strip() if job_description_element else "Description not found"
                print("Description:", job_description)

                # Extract and print company name
                if company_name_element:
                    company_name_b_element = company_name_element.find('b')
                    company_name = company_name_b_element.text.strip() if company_name_b_element else company_name_element.text.strip()
                else:
                    company_name = "Company not found"
                print("Company Name:", company_name)

                # Extract and print job location
                job_location = job_location_element.next_sibling.strip() if job_location_element and job_location_element.next_sibling else "Location not found"
                print("Job Location:", job_location)

                # Determine the tag (featured or available)
                tag = "featured" if job in job_elements_featured else "available"

                # Append data to lists
                job_titles.append(job_title)
                job_descriptions.append(job_description)
                company_names.append(company_name)
                job_locations.append(job_location)
                tags.append(tag)

            # Create a DataFrame
            data = {'Job Title': job_titles, 'Description': job_descriptions, 'Company': company_names, 'Location': job_locations, 'Tags': tags}
            df = pd.DataFrame(data)

            return df

        else:
            print(f"No job elements found on {url}.")

    else:
        print(f"Failed to retrieve the page {url}. Status Code: {response.status_code}")
        return None

# Main code to iterate through pages
base_url = "https://www.keejob.com/offres-emploi/?keywords=sousse&page="

# Set the range of pages you want to scrape
start_page = 1
end_page = 6 # Change this to the desired end page

# Initialize an empty DataFrame to store the results
final_df = pd.DataFrame()

for page_number in range(start_page, end_page + 1):
    page_url = f"{base_url}{page_number}"
    page_df = scrape_page(page_url)

    if page_df is not None:
        final_df = pd.concat([final_df, page_df], ignore_index=True)

# Display the final DataFrame
print(final_df)

# Generate a new filename based on the current date and time
current_datetime = datetime.now().strftime('%Y%m%d_%H%M%S')
new_filename = f'Keejob_data_all_pages_{current_datetime}.xlsx'

# Save the final DataFrame to an Excel file
final_df.to_excel(new_filename, index=False)
