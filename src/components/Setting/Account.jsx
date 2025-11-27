import { useState } from "react";
import Preference from "./Preference";
import Notification from "./Notification";
import ContactForm from "./ContactForm";
import PrinterSettings from "./PrinterSettings";
import SecuritySettings from "./SecuritySettings";

export default function Account() {
  const [profilePic, setProfilePic] = useState(null);
  const [activeTab, setActiveTab] = useState("account"); // default tab

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className=" flex justify-center items-start">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-8">
        {/* Tabs */}
        <div className="border-b mb-6 flex space-x-8 text-gray-600 text-sm">
          {["account", "preference", "notification", "contact", "printer", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-purple-500 text-purple-500 font-medium"
                  : "hover:text-purple-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "account" && (
          <>
            {/* Profile Picture */}
            <div className="flex items-center gap-6 mb-8">
              <img
                src={profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiYqVSD7SbnMqIdAaaYxXEuSgzd_hs9bVwyQ&s"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div className="flex gap-4">
                <label className="px-5 py-2 rounded-full bg-purple-400 text-white cursor-pointer">
                  Upload New Photo
                  <input type="file" className="hidden" onChange={handleUpload} />
                </label>
                <button className="px-5 py-2 rounded-full bg-gray-300 text-gray-800">
                  Remove Profile Picture
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Su Su Khin"
                  className="w-full rounded-md bg-purple-200 px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Email address</label>
                <input
                  type="email"
                  defaultValue="susukhin@gmail.com"
                  className="w-full rounded-md bg-purple-200 px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">User Name</label>
                <input
                  type="text"
                  defaultValue="susukhin123"
                  className="w-full rounded-md bg-purple-200 px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                <div className="flex">
                  <span className="px-4 py-2 rounded-l-md bg-purple-200">+95</span>
                  <input
                    type="text"
                    defaultValue="987654321"
                    className="w-full rounded-r-md bg-purple-200 px-4 py-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Your ID</label>
                <input
                  type="text"
                  defaultValue="123456789"
                  className="w-full rounded-md bg-purple-200 px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Address</label>
                <input
                  type="text"
                  defaultValue="Mandalay, Myanmar"
                  className="w-full rounded-md bg-purple-200 px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="w-full rounded-md bg-purple-200 px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Add</label>
                <button className="w-full px-4 py-2 rounded-md bg-purple-400 text-white">
                  Add Account +
                </button>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm text-gray-500 mb-1">Your Bio</label>
              <textarea
                placeholder="Description..."
                className="w-full rounded-md border px-4 py-3 outline-none"
                rows={4}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button className="px-6 py-2 rounded-full bg-purple-400 text-white">
                Update Profile
              </button>
              <button className="px-6 py-2 rounded-full bg-gray-300 text-gray-800">Cancel</button>
            </div>
          </>
        )}

        {activeTab === "preference" && (
          <div className="text-gray-600"><Preference /></div>
        )}
        {activeTab === "notification" && (
          <div className="text-gray-600"><Notification /></div>
        )}
        {activeTab === "contact" && (
          <div className="text-gray-600"><ContactForm /></div>
        )}
        {activeTab === "printer" && (
          <div className="text-gray-600"><PrinterSettings/></div>
        )}
        {activeTab === "security" && (
          <div className="text-gray-600"><SecuritySettings/></div>
        )}
      </div>
    </div>
  );
}
