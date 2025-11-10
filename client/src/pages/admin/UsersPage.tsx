import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BackofficeLayout } from '../../components/BackofficeLayout';
import { userService } from '../../services/user.service';
import { User } from '../../services/auth.service';
import { UserPlus, Edit, Ban, Key, Search } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [tempPassword, setTempPassword] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers();
      if (response.success && response.data) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async () => {
    if (!selectedUser) return;

    try {
      await userService.deactivateUser(selectedUser.id);
      setShowDeactivateModal(false);
      setSelectedUser(null);
      await loadUsers();
    } catch (error) {
      console.error('Failed to deactivate user:', error);
    }
  };

  const handleResetPassword = async () => {
    if (!selectedUser) return;

    try {
      const response = await userService.resetPassword(selectedUser.id);
      if (response.success && response.data) {
        setTempPassword(response.data.temporaryPassword);
      }
    } catch (error) {
      console.error('Failed to reset password:', error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BackofficeLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Manage Users</h2>
            <p className="text-gray-600">Create, update, and manage backoffice users</p>
          </div>

          <Link to="/backoffice/users/create" className="btn-primary flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add New User
          </Link>
        </div>

        <div className="card">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                className="input pl-10"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-gray-600 mt-4">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`badge ${
                            user.userType === 'ADMIN' ? 'badge-success' : 'badge-info'
                          }`}
                        >
                          {user.userType}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`badge ${
                            user.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/backoffice/users/${user.id}/edit`}
                            className="text-primary hover:text-primary-600 p-1"
                            title="Edit user"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowResetPasswordModal(true);
                              setTempPassword('');
                            }}
                            className="text-blue-600 hover:text-blue-700 p-1"
                            title="Reset password"
                          >
                            <Key className="w-4 h-4" />
                          </button>
                          {user.status === 'ACTIVE' && (
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowDeactivateModal(true);
                              }}
                              className="text-red-600 hover:text-red-700 p-1"
                              title="Deactivate user"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Deactivate Modal */}
      {showDeactivateModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Deactivate User</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to deactivate {selectedUser.firstName} {selectedUser.lastName}? This
              will immediately log them out from all sessions.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeactivateModal(false);
                  setSelectedUser(null);
                }}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button onClick={handleDeactivate} className="btn-danger flex-1">
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetPasswordModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reset Password</h3>

            {tempPassword ? (
              <div>
                <p className="text-gray-600 mb-4">
                  Password has been reset successfully. Please provide this temporary password to the user:
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-2">Temporary Password:</p>
                  <p className="text-lg font-mono font-bold text-gray-900">{tempPassword}</p>
                </div>
                <p className="text-sm text-yellow-700 mb-6">
                  The user will be forced to change this password upon next login.
                </p>
                <button
                  onClick={() => {
                    setShowResetPasswordModal(false);
                    setSelectedUser(null);
                    setTempPassword('');
                  }}
                  className="btn-primary w-full"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to reset the password for {selectedUser.firstName}{' '}
                  {selectedUser.lastName}? This will immediately log them out from all sessions.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowResetPasswordModal(false);
                      setSelectedUser(null);
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button onClick={handleResetPassword} className="btn-primary flex-1">
                    Reset Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </BackofficeLayout>
  );
}
