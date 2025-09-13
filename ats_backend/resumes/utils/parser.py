import spacy
import fitz  # pdf ni library (PyMuPDF)
import re

nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

def extract_email(text):
    match = re.search(r'[\w\.-]+@[\w\.-]+', text)
    return match.group(0) if match else None

def extract_phone(text):
    match = re.search(r'(\+?\d{1,3}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}', text)
    return match.group(0) if match else None

def extract_name(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    # fallback
    lines = text.split("\n")
    return lines[0].strip() if lines else None

def extract_skills(text, skill_set=None):
    if skill_set is None:
        skill_set = ['python', 'django', 'flask', 'react', 'sql', 'aws', 'docker', 'git', 'node', 'rest']
    
    found = []
    text_lower = text.lower()
    for skill in skill_set:
        if skill.lower() in text_lower:
            found.append(skill)
    return list(set(found))

def score_skills(resume_skills, required_skills):
    """
    Compare resume skills against job required skills.
    Return match percentage and matched/missing skill lists.
    """
    resume_skills_set = set([skill.lower() for skill in resume_skills])
    required_skills_set = set([skill.lower() for skill in required_skills])

    matched = resume_skills_set.intersection(required_skills_set)
    missing = required_skills_set - resume_skills_set

    score = (len(matched) / len(required_skills_set)) * 100 if required_skills_set else 0

    return {
        "score": round(score, 2),
        "matched_skills": list(matched),
        "missing_skills": list(missing)
    }


def parse_resume(pdf_path):
    text = extract_text_from_pdf(pdf_path)
    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text)
    }
