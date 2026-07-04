import React, { useState, useEffect } from "react";
import {
  Bell,
  User,
  Truck,
} from "lucide-react";

import OverviewTab from "../Setting/OverviewTab";
import DeliFeesTab from "../Setting/DeliFeesTab";
import AnnouncementTab from "../Setting/AnnouncementTab";

export default function AdminSettings3() {
  const [activeTab, setActiveTab] = useState("overview");
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Support both Owner and Manager login
  const adminId =
    localStorage.getItem("adminId") ||
    localStorage.getItem("userId");

  const role =
    localStorage.getItem("role") ||
    JSON.parse(localStorage.getItem("user") || "{}")?.role;

  useEffect(() => {
    if (!adminId) {
      setLoading(false);
      return;
    }

    const fetchAdmin = async () => {
      try {
        const res = await fetch(
          `https://api.pwezayshops.com/admin/${adminId}`
        );

        const data = await res.json();

        if (
          data.success &&
          Array.isArray(data.data) &&
          data.data.length > 0
        ) {
          setAccount(data.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch admin:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();

    const interval = setInterval(fetchAdmin, 500);

    return () => clearInterval(interval);
  }, [adminId]);

  return (
    <div className="text-gray-100 md:h-[100vh]">
      {/* Tabs */}
      <div className="bg-gray-900 rounded-2xl border border-gray-700 p-3 md:p-4 mb-6">
        <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
          {[
            {
              key: "overview",
              label: "Overview",
              icon: <User className="h-4 w-4" />,
            },
            {
              key: "deliFees",
              label: "Delivery Fees",
              icon: <Truck className="h-4 w-4" />,
            },
            {
              key: "announcement",
              label: "Announcement",
              icon: <Bell className="h-4 w-4" />,
            },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center justify-center gap-2
                px-3 py-2 md:px-5 md:py-2
                rounded-xl text-xs md:text-sm font-medium
                whitespace-nowrap transition-all duration-200
                min-w-max
                ${
                  activeTab === item.key
                    ? "bg-[#B476FF] text-black shadow-md"
                    : "text-gray-300 hover:bg-[#B476FF]/20 hover:text-[#B476FF]"
                }`}
            >
              {item.icon}
              <span className="hidden sm:inline">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Left */}
        <div className="col-span-1 space-y-6">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6">
            <h3 className="font-bold text-lg mb-4 text-center text-[#B476FF]">
              Profile
            </h3>

            <div className="flex flex-col items-center text-center">

              {loading ? (
                <p className="text-gray-400">
                  Loading profile...
                </p>
              ) : (
                <>
                  {account?.photo ? (
                    <img
                      src={`https://api.pwezayshops.com/admin-uploads/${account.photo}?t=${Date.now()}`}
                      alt={account.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#B476FF]"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div
                      className="
                        w-20 h-20 rounded-full
                        bg-gradient-to-br
                        from-[#B476FF]
                        to-purple-600
                        flex items-center justify-center
                        text-white
                        text-2xl
                        font-bold
                        border-2 border-[#B476FF]
                      "
                    >
                      {account?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "A"}
                    </div>
                  )}

                  <h2 className="mt-4 text-lg font-semibold">
                    {account?.name || "Unknown"}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    {account?.email}
                  </p>

                  <span
                    className="
                      mt-3
                      px-3 py-1
                      rounded-full
                      text-xs
                      bg-[#B476FF]/20
                      text-[#B476FF]
                      capitalize
                    "
                  >
                    {account?.role || role || "Admin"}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-1 md:col-span-3 bg-gray-900 rounded-2xl border border-gray-700 p-6">
          {activeTab === "overview" && (
            <OverviewTab account={account} />
          )}

          {activeTab === "deliFees" && <DeliFeesTab />}

          {activeTab === "announcement" && (
            <AnnouncementTab />
          )}
        </div>
      </div>
    </div>
  );
}