import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">JobBoard</Link>

            <div className="flex gap-4 items-center">
                {user ? (
                    <>
                        <span className="text-sm">Hi, {user.name}</span>
                        {user.role === 'recruiter' && (
                            <Link to="/post-job" className="bg-white text-blue-600 px-3 py-1 rounded font-medium">
                                Post Job
                            </Link>
                        )}
                        {user.role === 'jobseeker' && (
                            <Link to="/my-applications" className="bg-white text-blue-600 px-3 py-1 rounded font-medium">
                                My Applications
                            </Link>
                        )}
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded font-medium">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;