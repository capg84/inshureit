import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Home, Download, Users, Key } from 'lucide-react';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/authStore';

interface BackofficeLayoutProps {
  children: React.ReactNode;
}

export function BackofficeLayout({ children }: BackofficeLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout: logoutStore } = useAuthStore();

  const handleLogout = async () => {
    await authService.logout();
    logoutStore();
    navigate('/backoffice/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">InshureIt</h1>
              <p className="text-sm text-gray-600">Backoffice Portal</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-600">{user?.userType}</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <Link
              to="/backoffice/dashboard"
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                isActive('/backoffice/dashboard')
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>

            <Link
              to="/backoffice/downloads"
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                isActive('/backoffice/downloads')
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Download className="w-4 h-4" />
              Downloads
            </Link>

            {user?.userType === 'ADMIN' && (
              <Link
                to="/backoffice/users"
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  isActive('/backoffice/users')
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="w-4 h-4" />
                Manage Users
              </Link>
            )}

            <Link
              to="/backoffice/change-password"
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                isActive('/backoffice/change-password')
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Key className="w-4 h-4" />
              Change Password
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
