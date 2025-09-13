# utils/job_skills.py

JOB_SKILL_MAP = {
    "Backend Developer": ["python", "django", "sql", "rest", "docker"],
    "Frontend Developer": ["javascript", "react", "css", "html", "webpack"],
    "Data Scientist": ["python", "pandas", "numpy", "scikit-learn", "sql"],
    "DevOps Engineer": ["aws", "docker", "kubernetes", "jenkins", "linux"],
    # skills mate kak karvu padse 
}
def normalize_job_title(job_title):
    job_title = job_title.strip().lower()
    mapping = {
        "backend dev": "Backend Developer",
        "backend developer": "Backend Developer",
        "frontend dev": "Frontend Developer",
        "frontend developer": "Frontend Developer",
        "devops engineer": "DevOps Engineer", 
        "data scientist": "Data Scientist",
    }
    return mapping.get(job_title, job_title.title())  # kai pan alag hoy to sidhu mali jay for e.g. (backend dev ~ backend Developer)