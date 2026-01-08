import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProjectManager from '../components/admin/ProjectManager';
import { getProjects } from '../services/projectsService';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/adminspace');
    }
    // Load project count
    const projects = getProjects();
    setProjectCount(projects.length);
  }, [navigate]);

  useEffect(() => {
    // Update project count when projects change
    const handleUpdate = () => {
      const projects = getProjects();
      setProjectCount(projects.length);
    };
    window.addEventListener('projectsUpdated', handleUpdate);
    return () => window.removeEventListener('projectsUpdated', handleUpdate);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminEmail');
    navigate('/adminspace');
  };

  const adminEmail = localStorage.getItem('adminEmail') || 'Admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {adminEmail}</p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/home"
                className="px-6 py-2 bg-picto-primary text-white rounded-lg font-semibold hover:bg-picto-primary-dark transition-all duration-300 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faHome} />
                Return to Home
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-picto-primary">{projectCount}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Messages</h3>
            <p className="text-3xl font-bold text-picto-primary">0</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Visitors</h3>
            <p className="text-3xl font-bold text-picto-primary">-</p>
          </div>
        </div>

        {/* Project Management */}
        <ProjectManager />
      </div>
    </div>
  );
};

export default AdminDashboard;
