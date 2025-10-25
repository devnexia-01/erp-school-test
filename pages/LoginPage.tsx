import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
            <GraduationCap className="w-16 h-16 mx-auto text-brand-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 mt-2">School ERP Login</h1>
            <p className="text-gray-500">Sign in to access your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                placeholder="••••••••"
                required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-brand-blue-600 rounded-md shadow-sm hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
            <h4 className="font-semibold mb-2">Demo Credentials:</h4>
            <ul className="list-disc list-inside space-y-1">
                <li><strong className="font-mono">Admin:</strong> admin@school.com / admin123</li>
                <li><strong className="font-mono">Faculty:</strong> faculty@school.com / faculty123</li>
                <li><strong className="font-mono">Student:</strong> student@school.com / student123</li>
                <li><strong className="font-mono">Parent:</strong> parent@school.com / parent123</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
