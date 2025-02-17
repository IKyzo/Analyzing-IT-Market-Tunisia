import pandas as pd
import re
from datetime import datetime

# List of IT-related keywords in English, French, and tech-specific terms
english_keywords = [
    'IT', 'Information Technology', 'Developer', 'Software', 'Engineer', 'Programmer', 
    'Technology', 'Data', 'Analyst', 'Systems', 'Network', 'Security', 'Web', 'Mobile', 
    'Cloud', 'Machine Learning', 'AI', 'Artificial Intelligence', 'DevOps', 'Backend', 
    'Frontend', 'Full Stack', 'Database', 'Business Intelligence', 'Project Manager', 
    'Technical Lead', 'Cybersecurity', 'Big Data', 'Internet of Things', 'Technical Support', 
    'System Administrator', 'Network Administrator', 'Quality Assurance', 'IT Consultant', 
    'Software Architect', 'Tech Support', 'Help Desk', 'IT Manager', 'Product Manager',
    'UX Designer', 'UI Designer', 'Web Designer'
]

french_keywords = [
    'Informatique', 'Technologie de l\'information', 'Développeur', 'Logiciel', 'Ingénieur', 
    'Programmeur', 'Technologie', 'Données', 'Analyste', 'Systèmes', 'Réseau', 'Sécurité', 
    'Web', 'Mobile', 'Cloud', 'Apprentissage Automatique', 'IA', 'Intelligence Artificielle', 
    'DevOps', 'Backend', 'Frontend', 'Full Stack', 'Base de Données', 'Intelligence d\'Affaires', 
    'Chef de Projet', 'Responsable Technique', 'Cybersécurité', 'Big Data', 'Internet des Objets', 
    'Support Technique', 'Administrateur Système', 'Administrateur Réseau', 'Assurance Qualité', 
    'Consultant Informatique', 'Architecte Logiciel', 'Support Tech', 'Service d\'Assistance', 
    'Responsable IT', 'Chef de Produit', 'Designer UX', 'Designer UI', 'Designer Web'
]

tech_keywords = [
    'Python', 'Java', 'JavaScript', 'C++', 'C#', 'Ruby', 'PHP', 'HTML', 'CSS', 'SQL', 
    'NoSQL', 'React', 'Angular', 'Vue', 'Node.js', 'Django', 'Flask', 'Spring', 'Hibernate', 
    'SaaS', 'PaaS', 'IaaS', 'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 
    'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Blockchain', 'IoT', 'R', 'MATLAB', 'Swift', 
    'Kotlin', 'TypeScript', 'GraphQL', 'REST', 'SOAP', 'JSON', 'XML', 'Git', 'CI/CD', 
    'Jenkins', 'Ansible', 'Terraform', 'Linux', 'Unix', 'Windows Server', 'MySQL', 
    'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'GraphDB'
]

# Combine all keywords into a single list
all_keywords = english_keywords + french_keywords + tech_keywords

# Escape special characters in keywords and add word boundaries
escaped_keywords = [rf'\b{re.escape(keyword)}\b' for keyword in all_keywords]

# Convert the combined keywords list to a string to use with pandas filtering
keywords_pattern = '|'.join(escaped_keywords)

# Load the data from Excel file
input_file = './TunisieTravail_data_all_pages_20240612_143147.xlsx'  # Replace with your actual file path
data = pd.read_excel(input_file)

# Check for NaN values and replace them with empty strings
data['Job Title'] = data['Job Title'].fillna('')

# Filter the DataFrame based on the keywords in the job title
it_jobs = data[data['Job Title'].str.contains(keywords_pattern, case=False, na=False)]

# Add current date and time to the output file name
current_datetime = datetime.now().strftime("%Y%m%d_%H%M%S")
output_file = f'filtered_it_jobs_tunisietravail_{current_datetime}.xlsx'  # Output file name includes current date and time

# Save the filtered data to a new Excel file
it_jobs.to_excel(output_file, index=False)

print(f"Filtered IT jobs saved to {output_file}")
