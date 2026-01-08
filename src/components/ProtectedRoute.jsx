import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated');

  if (!isAuthenticated) {
    return <Navigate to="/adminspace" replace />;
  }

  return children;
};

export default ProtectedRoute;
