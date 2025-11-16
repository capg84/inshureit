import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackofficeLayout } from '../../components/BackofficeLayout';
import { userService, CreateUserData } from '../../services/user.service';

export default function CreateUserPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tempPassword, setTempPassword] = useState('');

  const [formData, setFormData] = useState<CreateUserData>({
    email: '',
    firstName: '',
    lastName: '',
    userType: 'BACKOFFICE',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await userService.createUser(formData);

      if (response.success && response.data) {
        setTempPassword(response.data.temporaryPassword);
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to create user');
      setLoading(false);
    }
  };

  if (tempPassword) {
    return (
      <BackofficeLayout>
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">User Created Successfully!</h2>
              <p className="text-gray-600">
                {formData.firstName} {formData.lastName} has been added to the system.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-yellow-900 mb-2">Important - Temporary Password</h4>
              <p className="text-sm text-yellow-700 mb-3">
                Please provide the following temporary password to the new user:
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Email:</p>
                <p className="font-mono text-gray-900 mb-4">{formData.email}</p>
                <p className="text-sm text-gray-600 mb-2">Temporary Password:</p>
                <p className="text-lg font-mono font-bold text-gray-900">{tempPassword}</p>
              </div>
              <p className="text-sm text-yellow-700 mt-3">
                The user will be required to change this password upon first login.
              </p>
            </div>

            <div className="flex gap-3">
              <Link to="/backoffice/users" className="btn-primary flex-1 text-center">
                Back to Users
              </Link>
              <button
                onClick={() => {
                  setTempPassword('');
                  setFormData({
                    email: '',
                    firstName: '',
                    lastName: '',
                    userType: 'BACKOFFICE',
                  });
                }}
                className="btn-outline flex-1"
              >
                Create Another User
              </button>
            </div>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New User</h2>
          <p className="text-gray-600">Add a new backoffice or admin user to the system</p>
        </div>

        <div className="card">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

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
                  placeholder="John"
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
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="label">Email Address *</label>
              <input
                type="email"
                className="input"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john.doe@example.com"
              />
              <p className="text-xs text-gray-500 mt-1">This will be used as the username for login</p>
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
              <p className="text-xs text-gray-500 mt-1">
                {formData.userType === 'ADMIN'
                  ? 'Admin users can manage other users in addition to backoffice access'
                  : 'Backoffice users can download quotes and manage data'}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Note</h4>
              <p className="text-sm text-blue-700">
                A temporary password will be generated for this user. They will be required to change it upon
                first login.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Link to="/backoffice/users" className="btn-secondary flex-1 text-center">
                Cancel
              </Link>
              <button type="submit" className="btn-primary flex-1" disabled={loading}>
                {loading ? 'Creating User...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </BackofficeLayout>
  );
}
