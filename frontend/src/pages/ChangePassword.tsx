import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';
import { PasswordInput } from '../components/dashboard/PasswordInput';
import { useState } from 'react';
import { Info } from 'lucide-react';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowSuccess(false);
    setShowError(false);
    setErrorMessage('');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(false);
    setShowError(false);
    setErrorMessage('');

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setShowError(true);
      setErrorMessage('All fields are required');
      return;
    }

    if (newPassword.length < 8) {
      setShowError(true);
      setErrorMessage('New password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setShowError(true);
      setErrorMessage('New password and confirm password do not match');
      return;
    }

    // Simulate password check (in real app, this would call backend)
    if (currentPassword !== 'admin123') {
      setShowError(true);
      setErrorMessage('Incorrect current password');
      return;
    }

    // Success
    setShowSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activePage="change-password" />
      <div className="flex-1 flex flex-col">
        <TopBar title="Change Password" />
        <main className="flex-1 overflow-auto p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Change Password</h2>
            <p className="text-gray-600">Update your admin account password securely</p>
          </div>

          {/* Centered Card Container */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              {/* Success Message */}
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg">
                  <p className="text-green-700 font-medium">
                    Password updated successfully
                  </p>
                </div>
              )}

              {/* Error Message */}
              {showError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg">
                  <p className="text-red-700 font-medium">{errorMessage}</p>
                </div>
              )}

              {/* Password Card */}
              <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-8">
                <form onSubmit={handleUpdatePassword}>
                  <div className="space-y-5">
                    {/* Current Password */}
                    <PasswordInput
                      id="current-password"
                      label="Current Password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={setCurrentPassword}
                    />

                    {/* New Password */}
                    <PasswordInput
                      id="new-password"
                      label="New Password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={setNewPassword}
                      helperText="Minimum 8 characters required"
                    />

                    {/* Confirm Password */}
                    <PasswordInput
                      id="confirm-password"
                      label="Confirm Password"
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              {/* Security Info Box */}
              <div className="mt-6 bg-gray-50 border border-gray-300 rounded-lg p-4 flex gap-3">
                <Info size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  For security, choose a strong password with letters, numbers, and symbols.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
