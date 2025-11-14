import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ScrollToTop } from './components/ScrollToTop';

// Customer pages
import HomePage from './pages/customer/HomePage';
import QuoteFormPage from './pages/customer/QuoteFormPage';
import AboutPage from './pages/customer/AboutPage';
import ContactPage from './pages/customer/ContactPage';
import CareersPage from './pages/customer/CareersPage';
import PrivacyPolicyPage from './pages/customer/PrivacyPolicyPage';
import TermsPage from './pages/customer/TermsPage';
import CookiePolicyPage from './pages/customer/CookiePolicyPage';
import HelpPage from './pages/customer/HelpPage';

// Backoffice pages
import LoginPage from './pages/backoffice/LoginPage';
import DashboardPage from './pages/backoffice/DashboardPage';
import DownloadsPage from './pages/backoffice/DownloadsPage';
import ChangePasswordPage from './pages/backoffice/ChangePasswordPage';

// Admin pages
import UsersPage from './pages/admin/UsersPage';
import CreateUserPage from './pages/admin/CreateUserPage';
import EditUserPage from './pages/admin/EditUserPage';
import ContactMessagesPage from './pages/admin/ContactMessagesPage';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Customer routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/quote/:type" element={<QuoteFormPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/cookie-policy" element={<CookiePolicyPage />} />
      <Route path="/help" element={<HelpPage />} />

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
      <Route
        path="/backoffice/contact-messages"
        element={
          <ProtectedRoute requireAdmin>
            <ContactMessagesPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
