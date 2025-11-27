import React from "react";
import { FaApple, FaWindows, FaKey, FaMobileAlt, FaEnvelope } from "react-icons/fa";

const SecuritySettings = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= MAIN SETTINGS ================= */}
        <div className="col-span-2 space-y-6">
          {/* Update password */}
          <div>
            <h3 className="font-semibold mb-2">Update password</h3>
            <p className="text-sm text-gray-500 mb-3">
              Set password to protect your account.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  defaultValue="*********"
                  className="w-full p-2 border rounded-lg bg-purple-100"
                />
                <p className="text-xs text-green-500 mt-1">very secure ✅</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full p-2 border rounded-lg bg-purple-100"
                />
              </div>
              <button className="px-4 py-1 bg-purple-500 text-white rounded-lg">
                Change
              </button>
            </div>
          </div>

          {/* Verify email */}
          <div>
            <h3 className="font-semibold mb-2">Verify email address</h3>
            <p className="text-sm text-gray-500 mb-3">
              Verify your email address to confirm.
            </p>
            <div className="flex gap-3 items-center">
              <input
                type="email"
                defaultValue="sawkhhin@gmail.com"
                className="flex-1 p-2 border rounded-lg bg-purple-100"
              />
              <button className="px-4 py-1 bg-purple-500 text-white rounded-lg">
                Verify
              </button>
            </div>
          </div>

          <hr />

          {/* 2FA */}
          <div>
            <h3 className="font-semibold mb-2">Enable Authentication</h3>
            <p className="text-sm text-gray-500 mb-3">
              Add a layer of authentication to enhance your account.
            </p>
            <div className="flex items-center justify-between border rounded-lg p-3 mb-3">
              <div>
                <p className="font-medium flex items-center gap-2">
                  ✨ Authenticator App <span className="text-green-500 text-xs">More secure</span>
                </p>
                <p className="text-xs text-gray-500">Google Authenticator</p>
              </div>
              <button className="px-4 py-1 bg-purple-500 text-white rounded-lg">
                Add 2FA
              </button>
            </div>
          </div>

          {/* Recovery settings */}
          <div>
            <h3 className="font-semibold mb-2">Recovery settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div>
                  <p className="font-medium flex items-center gap-2">
                    <FaMobileAlt /> Recovery phone number
                  </p>
                  <p className="text-xs text-gray-500">
                    Set up recovery phone number to send SMS recovery.
                  </p>
                </div>
                <button className="px-4 py-1 bg-purple-500 text-white rounded-lg">
                  Set Up
                </button>
              </div>

              <div className="flex items-center justify-between border rounded-lg p-3">
                <div>
                  <p className="font-medium flex items-center gap-2">
                    <FaEnvelope /> Recovery email address
                  </p>
                  <p className="text-xs text-gray-500">
                    Set up recovery email to secure your account.
                  </p>
                </div>
                <button className="px-4 py-1 bg-purple-500 text-white rounded-lg">
                  Set Up
                </button>
              </div>
            </div>
          </div>

          {/* Devices */}
          <div>
            <h3 className="font-semibold mb-2">Devices</h3>
            <p className="text-sm text-gray-500 mb-3">
              These devices are currently signed in to your account.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <FaApple className="text-gray-600" />
                  <div>
                    <p className="font-medium">Macbook Pro</p>
                    <p className="text-xs text-gray-500">Myanmar, Yangon — current session</p>
                  </div>
                </div>
                <button className="px-4 py-1 bg-red-500 text-white rounded-lg">
                  Delete
                </button>
              </div>

              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <FaWindows className="text-gray-600" />
                  <div>
                    <p className="font-medium">HP Probook</p>
                    <p className="text-xs text-gray-500">Myanmar, Mawlamyine — 1 month ago</p>
                  </div>
                </div>
                <button className="px-4 py-1 bg-red-500 text-white rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SIDE PANEL ================= */}
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3">Two-step verification</h4>
            <p className="text-sm text-gray-500 mb-3">
              We recommend to add pass blahh.
            </p>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2">
                <FaKey /> Security key
              </span>
              <span className="text-green-500 text-sm">More secure</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                🔑 Passkey
              </span>
              <span className="text-green-500 text-sm">More secure</span>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3">Deactivate account</h4>
            <p className="text-sm text-gray-500 mb-3">
              It will shut down your account and reactive signing in.
            </p>
            <button className="px-4 py-1 bg-purple-500 text-white rounded-lg">
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
