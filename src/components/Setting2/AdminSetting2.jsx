import React, { useState, useEffect } from "react";
import OverviewTab from "./OverviewTab";

export default function AdminSetting2() {
  const [account, setAccount] = useState(null);

  // Read from LoginPage
  const adminId = localStorage.getItem("userId");

  useEffect(() => {
    if (!adminId) {
      console.log("No userId found in localStorage");
      return;
    }

    const fetchAdmin = async () => {
      try {
        const res = await fetch(
          `https://api.pwezayshops.com/admin/${adminId}`
        );

        const data = await res.json();

        console.log("Admin API:", data);

        if (data.success && data.data.length > 0) {
          setAccount(data.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      }
    };

    // Fetch immediately
    fetchAdmin();

    // Live update every second
    const interval = setInterval(fetchAdmin, 1000);

    return () => clearInterval(interval);
  }, [adminId]);

  return (
    <div className=" text-neutral-100 p-6  mx-auto max-w-7xl flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 rounded-2xl border border-neutral-800 p-8 shadow-md w-full">

        {/* LEFT */}
        <div className="col-span-1 flex flex-col items-center">
          <div className="w-full rounded-2xl border border-neutral-800 p-6 flex flex-col items-center">

            <h3 className="font-bold text-lg mb-4 text-[#B476FF]">
              Profile
            </h3>

            {account ? (
              <>
                {account.photo ? (
                  <img
                    src={`https://api.pwezayshops.com/admin-uploads/${account.photo}?t=${Date.now()}`}
                    alt={account.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#B476FF]"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#B476FF] to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-[#B476FF]">
                    {account.name
                      ? account.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()
                      : "NA"}
                  </div>
                )}

                <h2 className="mt-4 text-xl font-semibold">
                  {account.name}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {account.email}
                </p>

                <span className="mt-3 px-3 py-1 rounded-full bg-[#B476FF]/20 text-[#B476FF] text-sm">
                  {account.role}
                </span>
              </>
            ) : (
              <p className="text-gray-400">Loading profile...</p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-1 md:col-span-3 rounded-2xl border border-neutral-800 p-6 overflow-auto">
          <OverviewTab account={account} />
        </div>
      </div>
    </div>
  );
}