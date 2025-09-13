from rest_framework.views import APIView 
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import ResumeUploadSerializer
from .utils.parser import parse_resume, score_skills
from .utils.job_skills import JOB_SKILL_MAP, normalize_job_title

class ResumeUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ResumeUploadSerializer(data=request.data)
        if serializer.is_valid():
            # Save file and job
            resume = serializer.save(user=request.user)

            # Parse resume file
            pdf_path = resume.file.path
            parsed_data = parse_resume(pdf_path)

            # Get job title + required skills
            job = normalize_job_title(request.data.get("job", ""))
            required_skills = JOB_SKILL_MAP.get(job, [])

            # Score the resume
            scoring_result = score_skills(parsed_data["skills"], required_skills)

            # Save extracted fields to the resume model (if you've added them to model)
            resume.name = parsed_data.get("name", "")
            resume.email = parsed_data.get("email", "")
            resume.phone = parsed_data.get("phone", "")
            resume.skills = parsed_data.get("skills", [])
            resume.save()

            return Response({
                "message": "Resume uploaded and parsed",
                "job": job,
                "parsed": parsed_data,
                "required_skills": required_skills,
                "score": scoring_result["score"],
                "matched": scoring_result["matched_skills"],
                "missing": scoring_result["missing_skills"],
                "file_url": resume.file.url
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
