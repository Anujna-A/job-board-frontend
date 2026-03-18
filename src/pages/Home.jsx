import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllJobs } from '../api/api';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getAllJobs();
                setJobs(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading jobs...</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Available Jobs</h1>
            {jobs.length === 0 ? (
                <p className="text-center text-gray-500">No jobs available</p>
            ) : (
                <div className="grid gap-4">
                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            onClick={() => navigate(`/jobs/${job._id}`)}
                            className="bg-white p-6 rounded shadow hover:shadow-md cursor-pointer border border-gray-200"
                        >
                            <h2 className="text-xl font-bold text-blue-600">{job.title}</h2>
                            <p className="text-gray-600">{job.company}</p>
                            <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                <span>📍 {job.location}</span>
                                <span>💼 {job.jobtype}</span>
                                <span>💰 {job.salary}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;