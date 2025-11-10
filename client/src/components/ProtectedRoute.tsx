import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/auth.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !authService.getToken()) {
    return <Navigate to="/backoffice/login" replace />;
  }

  if (requireAdmin && !authService.isAdmin()) {
    return <Navigate to="/backoffice/dashboard" replace />;
  }

  return <>{children}</>;
}
