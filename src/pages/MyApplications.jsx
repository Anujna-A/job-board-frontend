import { useState, useEffect } from 'react';
import { getMyApplications } from '../api/api';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await getMyApplications();
                setApplications(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-8">My Applications</h1>
            {applications.length === 0 ? (
                <p className="text-center text-gray-500">You have not applied to any jobs yet</p>
            ) : (
                <div className="grid gap-4">
                    {applications.map((app) => (
                        <div key={app._id} className="bg-white p-6 rounded shadow border border-gray-200">
                            <h2 className="text-xl font-bold text-blue-600">{app.job?.title}</h2>
                            <p className="text-gray-600">{app.job?.company}</p>
                            <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                <span>📍 {app.job?.location}</span>
                                <span>💼 {app.job?.jobtype}</span>
                            </div>
                            <div className="mt-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                    app.status === 'reviewed' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                    {app.status.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyApplications;