import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../store/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password });

      if (response.success && response.data) {
        setUser(response.data.user);

        // Redirect based on password change requirement
        if (response.data.user.mustChangePassword) {
          navigate('/backoffice/change-password', {
            state: { firstLogin: true }
          });
        } else {
          navigate('/backoffice/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">InshureIt</h1>
          <p className="text-gray-600">Backoffice Login</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className="input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="label">Password</label>
                <Link
                  to="/backoffice/forgot-password"
                  className="text-xs text-primary hover:text-primary-600 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                className="input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-primary hover:text-primary-600 transition-colors"
            >
              ← Back to Homepage
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Default credentials for testing:</p>
          <p className="font-mono">admin@inshureit.com / Admin@123</p>
        </div>
      </div>
    </div>
  );
}
