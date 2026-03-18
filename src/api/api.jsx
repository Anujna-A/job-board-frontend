import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

export const getAllJobs = () => API.get('/jobs');
export const getJobById = (id) => API.get(`/jobs/${id}`);
export const createJob = (data) => API.post('/jobs', data);
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);

export const applyForJob = (jobId, data) => API.post(`/applications/${jobId}`, data);
export const getMyApplications = () => API.get('/applications/my');
export const getApplicationsForJob = (jobId) => API.get(`/applications/job/${jobId}`);
export const updateApplicationStatus = (id, data) => API.patch(`/applications/${id}/status`, data);