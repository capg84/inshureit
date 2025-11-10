import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

// Customer pages
import HomePage from './pages/customer/HomePage';
import QuoteFormPage from './pages/customer/QuoteFormPage';

// Backoffice pages
import LoginPage from './pages/backoffice/LoginPage';
import DashboardPage from './pages/backoffice/DashboardPage';
import DownloadsPage from './pages/backoffice/DownloadsPage';
import ChangePasswordPage from './pages/backoffice/ChangePasswordPage';

// Admin pages
import UsersPage from './pages/admin/UsersPage';
import CreateUserPage from './pages/admin/CreateUserPage';
import EditUserPage from './pages/admin/EditUserPage';

function App() {
  return (
    <Routes>
      {/* Customer routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/quote/:type" element={<QuoteFormPage />} />

      {/* Backoffice routes */}
      <Route path="/backoffice/login" element={<LoginPage />} />
      <Route
        path="/backoffice/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/backoffice/downloads"
        element={
          <ProtectedRoute>
            <DownloadsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/backoffice/change-password"
        element={
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/backoffice/users"
        element={
          <ProtectedRoute requireAdmin>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/backoffice/users/create"
        element={
          <ProtectedRoute requireAdmin>
            <CreateUserPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/backoffice/users/:id/edit"
        element={
          <ProtectedRoute requireAdmin>
            <EditUserPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
