import React, { useState, useEffect } from "react";
import {
  X,
  Bell,
  ShieldCheck,
  User,
  SunMoon,
  Download,
  Shield,
} from "lucide-react";
import CreateAccount from "./CreateAccount";
import SecurityTab from "./SecurityTab";
import OverviewTab from "./OverviewTab";
import EditAccountTab from "./EditAccountTab";
import AdminList from "./AdminList";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("overview");
  const [account, setAccount] = useState(null);

  const [quickActions] = useState([
    { icon: <Shield className="h-4 w-4" />, label: "Security", action: "security" },
    { icon: <User className="h-4 w-4" />, label: "Register New Account", action: "create" },
  ]);

  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    if (!adminId) return;

    const fetchAdmin = () => {
      fetch(`http://38.60.244.137:3000/admin/${adminId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data.length > 0) {
            setAccount(data.data[0]);
          }
        })
        .catch((err) => console.error("Failed to fetch admin data:", err));
    };

    fetchAdmin();
    const interval = setInterval(fetchAdmin, 5000);
    return () => clearInterval(interval);
  }, [adminId]);

  return (
    <div className=" dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:h-[100vh] mx-auto overflow-hidden">
      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 p-4 mb-6">
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: "overview", label: "Overview", icon: <User className="h-4 w-4" /> },
            { key: "create", label: "Register Account", icon: <User className="h-4 w-4" /> },
            { key: "edit", label: "Edit Account", icon: <User className="h-4 w-4" /> },
            { key: "managerAdminList", label: "Manager & Admin List", icon: <User className="h-4 w-4" /> },
            { key: "security", label: "Security", icon: <ShieldCheck className="h-4 w-4" /> },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === item.key
                  ? "bg-[#B476FF] text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-[#B476FF]/20 hover:text-[#B476FF]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* LEFT */}
        <div className="col-span-1 space-y-6">
          {/* Profile */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-center text-[#B476FF]">
              Profile
            </h3>
            <div className="flex flex-col items-center text-center">
              {account ? (
                <>
                  <img
                    src={
                      account.photo
                        ? `http://38.60.244.137:3000/admin-uploads/A002.jpg`
                        : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                    }
                    className="rounded-full w-20 h-20 object-cover mb-3 border-2 border-[#B476FF]"
                  />
                  <p className="font-semibold text-lg">{account.name || "Admin"}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full mt-1">
                    {account.role || "owner"}
                  </p>
                </>
              ) : (
                <p className="text-gray-400">Loading profile...</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-[#B476FF]">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(action.action)}
                  className="
                    flex items-center gap-3 w-full p-3 rounded-lg
                    text-gray-700 dark:text-gray-300 text-sm
                    hover:bg-[#B476FF]/20 hover:text-[#B476FF]
                    transition-colors
                  "
                >
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-1 md:col-span-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 p-6 shadow-sm">
          {activeTab === "overview" && <OverviewTab account={account} />}
          {activeTab === "edit" && <EditAccountTab account={account} setAccount={setAccount} />}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "create" && <CreateAccount />}
          {activeTab === "managerAdminList" && <AdminList />}
        </div>
      </div>
    </div>
  );
}
