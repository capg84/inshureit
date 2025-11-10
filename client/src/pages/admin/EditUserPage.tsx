import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BackofficeLayout } from '../../components/BackofficeLayout';
import { userService, UpdateUserData } from '../../services/user.service';
import { User } from '../../services/auth.service';

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<UpdateUserData>({
    firstName: '',
    lastName: '',
    userType: 'BACKOFFICE',
  });

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    if (!id) return;

    try {
      const response = await userService.getUser(parseInt(id));
      if (response.success && response.data) {
        setUser(response.data);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          userType: response.data.userType,
        });
      }
    } catch (error) {
      setError('Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setError('');
    setSubmitting(true);

    try {
      const response = await userService.updateUser(parseInt(id), formData);

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/backoffice/users');
        }, 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to update user');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <BackofficeLayout>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-gray-600 mt-4">Loading user...</p>
        </div>
      </BackofficeLayout>
    );
  }

  if (!user) {
    return (
      <BackofficeLayout>
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-800 mb-4">User not found</p>
            <Link to="/backoffice/users" className="btn-primary inline-block">
              Back to Users
            </Link>
          </div>
        </div>
      </BackofficeLayout>
    );
  }

  if (success) {
    return (
      <BackofficeLayout>
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">User Updated Successfully!</h3>
            <p className="text-green-700">Redirecting...</p>
          </div>
        </div>
      </BackofficeLayout>
    );
  }

  return (
    <BackofficeLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/backoffice/users" className="text-sm text-primary hover:text-primary-600 mb-2 inline-block">
            ← Back to Users
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Edit User</h2>
          <p className="text-gray-600">
            Update details for {user.firstName} {user.lastName}
          </p>
        </div>

        <div className="card">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Email (cannot be changed):</p>
            <p className="font-medium text-gray-900">{user.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">First Name *</label>
                <input
                  type="text"
                  className="input"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Last Name *</label>
                <input
                  type="text"
                  className="input"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label">User Type *</label>
              <select
                className="input"
                required
                value={formData.userType}
                onChange={(e) =>
                  setFormData({ ...formData, userType: e.target.value as 'BACKOFFICE' | 'ADMIN' })
                }
              >
                <option value="BACKOFFICE">Backoffice User</option>
                <option value="ADMIN">Admin User</option>
              </select>
              {user.userType === 'ADMIN' && formData.userType === 'BACKOFFICE' && (
                <p className="text-xs text-yellow-700 mt-1">
                  Warning: Changing user type from Admin to Backoffice will log them out immediately
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Link to="/backoffice/users" className="btn-secondary flex-1 text-center">
                Cancel
              </Link>
              <button type="submit" className="btn-primary flex-1" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </BackofficeLayout>
  );
}
