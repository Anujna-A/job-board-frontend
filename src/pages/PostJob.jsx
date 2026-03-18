import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../api/api';

const PostJob = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        company: '',
        location: '',
        salary: '',
        jobtype: 'full-time'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createJob(form);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-white p-8 rounded shadow">
                <h1 className="text-2xl font-bold text-blue-600 mb-6">Post a New Job</h1>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Salary</label>
                        <input
                            type="text"
                            name="salary"
                            value={form.salary}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Job Type</label>
                        <select
                            name="jobtype"
                            value={form.jobtype}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="remote">Remote</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded h-32"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700"
                    >
                        {loading ? 'Posting...' : 'Post Job'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;