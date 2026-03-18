import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById, applyForJob } from '../api/api';
import { useAuth } from '../context/AuthContext';

const JobDetails = () => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [message, setMessage] = useState('');
    const [resume, setResume] = useState(null);
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await getJobById(id);
                setJob(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setApplying(true);
        try {
            const formData = new FormData();
            if (resume) formData.append('resume', resume);
            await applyForJob(id, formData);
            setMessage('Application submitted successfully!');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to apply');
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!job) return <p className="text-center mt-10">Job not found</p>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white p-8 rounded shadow">
                <h1 className="text-3xl font-bold text-blue-600">{job.title}</h1>
                <p className="text-xl text-gray-600 mt-1">{job.company}</p>

                <div className="flex gap-4 mt-4 text-sm text-gray-500">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.jobtype}</span>
                    <span>💰 {job.salary}</span>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Job Description</h2>
                    <p className="text-gray-700">{job.description}</p>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Posted By</h2>
                    <p className="text-gray-600">{job.postedby?.name} — {job.postedby?.email}</p>
                </div>

                {user?.role === 'jobseeker' && (
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-2">Upload Resume</h2>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setResume(e.target.files[0])}
                            className="mb-4"
                        />
                        {message && (
                            <p className={`text-sm mb-3 ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}
                        <button
                            onClick={handleApply}
                            disabled={applying}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            {applying ? 'Applying...' : 'Apply Now'}
                        </button>
                    </div>
                )}

                {!user && (
                    <button
                        onClick={() => navigate('/login')}
                        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Login to Apply
                    </button>
                )}
            </div>
        </div>
    );
};

export default JobDetails;