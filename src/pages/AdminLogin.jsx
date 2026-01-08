import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimationLottie from '../helper/animation-lottie';
import codingAnimation from '../assets/lottie/Coding Develio.json';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (email === 'ibrahimchallal@gmail.com' && password === 'linkmeibrahim') {
        // Store authentication in localStorage
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminEmail', email);
        navigate('/adminspace/dashboard');
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Lottie Animation */}
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full max-w-md">
            <AnimationLottie animationPath={codingAnimation} />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold gradient-text mb-2">Admin Space</h1>
              <p className="text-gray-600">Sign in to access the admin dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary transition-all duration-300 outline-none text-black"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-picto-primary focus:border-picto-primary transition-all duration-300 outline-none text-black"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-picto-primary text-white py-3 rounded-lg font-semibold hover:bg-picto-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
