"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  job: yup.string().required('Job title is required'),
  resume: yup
    .mixed()
    .required('Resume file is required')
    .test('fileType', 'Only PDF files allowed', (value) => value && value.type === 'application/pdf'),
});

const UploadPage = () => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setValue('resume', file, { shouldValidate: true });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const onsubmit = async (data) => {
    try {
      const token = localStorage.getItem('token'); // cookie mathi pan lai shakie 
      const formData = new FormData();
      formData.append('job', data.job);
      formData.append('file', uploadedFile);

      const res = await axios.post("http://127.0.0.1:8000/api/upload/upload-resume/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,   
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.status === 200) {
        const data = await res.data;
        console.log("Upload successful:", data);
        alert("Resume uploaded successfully!");
        reset();
        setUploadedFile(null);
      } else {
        alert("Failed to upload resume. Please try again.");
      }
    } catch (error) {
        console.error("Upload error:", error.response?.data || error.message);
        alert(JSON.stringify(error.response?.data || error.message));
    }
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-blue-900 to-gray-800 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 border-white/20 backdrop-blur-md border shadow-lg p-8 rounded-2xl max-w-md w-full"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Upload Your Resume</h1>
        <form onSubmit={handleSubmit(onsubmit)} encType="multipart/form-data" className="flex flex-col gap-5">
          <motion.input
            {...register("job")}
            type="text"
            name="job"
            placeholder="Applying for..."
            className="text-black rounded-full p-2 bg-gray-50 border border-gray-300 w-full"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.job && <span className="text-red-500 text-sm">{errors.job.message}</span>}

          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-6 rounded-xl text-center cursor-pointer transition-all duration-300 ${isDragActive ? 'bg-blue-900/30 border-blue-400' : 'bg-gray-900/20 border-gray-400/30'
              }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the resume here ...</p>
            ) : uploadedFile ? (
              <p className="text-green-400 font-semibold">{uploadedFile.name}</p>
            ) : (
              <p>Drag and drop your PDF resume here, or click to select</p>
            )}
          </div>
          {errors.resume && <span className="text-red-500 text-sm">{errors.resume.message}</span>}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
          >
            Submit
          </motion.button>
        </form>
        <p className="text-sm text-gray-400 mt-3 text-center">Only PDF files are supported</p>
      </motion.div>
    </div>
  );
};

export default UploadPage;
