// import React, { useState, useEffect } from "react";
// import {
//   X,
//   Bell,
//   ShieldCheck,
//   User,
//   SunMoon,
//   Download,
//   Shield,
//   Truck,
// } from "lucide-react";
// import CreateAccount from "./CreateAccount";
// import SecurityTab from "./SecurityTab";
// import OverviewTab from "./OverviewTab";
// import EditAccountTab from "./EditAccountTab";
// import ManagerSellerList from "./ManagerSellerList";
// import DeliFeesTab from "./DeliFeesTab";
// import AnnouncementTab from "./AnnouncementTab";

// export default function AdminSettings() {
//   const token = localStorage.getItem("adminToken");

//   const [activeTab, setActiveTab] = useState("overview");
//   const [account, setAccount] = useState(null);

//   const [quickActions] = useState([
//     {
//       icon: <Shield className="h-4 w-4" />,
//       label: "Security",
//       action: "security",
//     },
//     {
//       icon: <User className="h-4 w-4" />,
//       label: "Register New Account",
//       action: "create",
//     },
//   ]);

//   const adminId = localStorage.getItem("adminId");

//   useEffect(() => {
//     if (!adminId) return;

//     // Fetch function
//     const fetchAdmin = () => {
//       fetch(`https://api.pwezayshops.com/admin/${adminId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success && data.data.length > 0) {
//             setAccount(data.data[0]);
//           }
//         })
//         .catch((err) => console.error("Failed to fetch admin data:", err));
//     };

//     // First fetch immediately
//     fetchAdmin();

//     // Live update every 500ms
//     const interval = setInterval(fetchAdmin, 500);

//     // Cleanup when component unmount
//     return () => clearInterval(interval);
//   }, [adminId]);

//   return (
//     <div className=" text-gray-100  md:h-[100vh]  mx-auto  overflow-hidden">
//       {/* Horizontal Tabs */}
//       <div className="bg-gray-900 rounded-2xl border border-gray-700 p-4 mb-6">
//         <div className="flex space-x-2 overflow-x-auto">
//           {[
//             {
//               key: "overview",
//               label: "Overview",
//               icon: <User className="h-4 w-4" />,
//             },
//             {
//               key: "edit",
//               label: "Edit Account",
//               icon: <User className="h-4 w-4" />,
//             },
//             {
//               key: "security",
//               label: "Security",
//               icon: <ShieldCheck className="h-4 w-4" />,
//             },
//             {
//               key: "create",
//               label: "Register Account",
//               icon: <User className="h-4 w-4" />,
//             },
//             {
//               key: "managerSellerList",
//               label: "Manager & Seller List",
//               icon: <User className="h-4 w-4" />,
//             },
//             {
//               key: "deliFees",
//               label: "Delivery Fees",
//               icon: <Truck className="h-4 w-4" />,
//             },
//             {
//               key: "announcement",
//               label: "Announcement",
//               icon: <Bell className="h-4 w-4" />,
//             },
//           ].map((item) => (
//             <button
//               key={item.key}
//               onClick={() => setActiveTab(item.key)}
//               className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-2 rounded-xl text-sm md:text-sm font-medium transition-colors whitespace-nowrap ${
//                 activeTab === item.key
//                   ? "bg-[#B476FF] text-black"
//                   : "text-gray-300 hover:bg-[#B476FF]/20 hover:text-[#B476FF]"
//               }`}
//             >
//               {item.icon}
//               {item.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* Left Column */}
//         <div className="col-span-1 space-y-6">
//           {/* Profile Card */}
//           <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6">
//             <h3 className="font-bold text-lg mb-4 text-center text-[#B476FF]">
//               Profile
//             </h3>
//             <div className="flex flex-col items-center text-center">
//               {account?.photo ? (
//                 <img
//                   src={`https://api.pwezayshops.com/admin-uploads/${account.photo}`}
//                   alt="Profile"
//                   className="rounded-full w-20 h-20 object-cover mb-3 border-2 border-[#B476FF]"
//                 />
//               ) : (
//                 <div className="w-20 h-20 rounded-full mb-3 border-2 border-[#B476FF] bg-gradient-to-br from-[#B476FF] to-purple-600 flex items-center justify-center text-white font-bold text-md shadow-md">
//                   {account?.name?.charAt(0)?.toUpperCase() || "DA"}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6">
//             <h3 className="font-bold text-lg mb-4 text-[#B476FF]">
//               Quick Actions
//             </h3>
//             <div className="space-y-2">
//               {quickActions.map((action, index) => (
//                 <button
//                   key={index}
//                   onClick={() => action.action && setActiveTab(action.action)}
//                   className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-[#B476FF]/20 hover:text-[#B476FF] transition-colors text-gray-300 text-sm"
//                 >
//                   {action.icon}
//                   <span>{action.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="col-span-1 md:col-span-3 bg-gray-900 rounded-2xl border border-gray-700 p-6">
//           {activeTab === "overview" && <OverviewTab account={account} />}
//           {activeTab === "edit" && (
//             <EditAccountTab account={account} setAccount={setAccount} />
//           )}

//           {/* ✅ Clean — No Props Passed */}
//           {activeTab === "security" && <SecurityTab />}

//           {activeTab === "create" && <CreateAccount />}
//           {activeTab === "managerSellerList" && <ManagerSellerList />}
//           {activeTab === "deliFees" && <DeliFeesTab />}
//           {activeTab === "announcement" && <AnnouncementTab />}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  X,
  Bell,
  ShieldCheck,
  User,
  SunMoon,
  Download,
  Shield,
  Truck,
} from "lucide-react";
import CreateAccount from "./CreateAccount";
import SecurityTab from "./SecurityTab";
import OverviewTab from "./OverviewTab";
import EditAccountTab from "./EditAccountTab";
import ManagerSellerList from "./ManagerSellerList";
import DeliFeesTab from "./DeliFeesTab";
import AnnouncementTab from "./AnnouncementTab";

export default function AdminSettings() {
  const token = localStorage.getItem("adminToken");

  const [activeTab, setActiveTab] = useState("overview");
  const [account, setAccount] = useState(null);

  const [quickActions] = useState([
    {
      icon: <Shield className="h-4 w-4" />,
      label: "Security",
      action: "security",
    },
    {
      icon: <User className="h-4 w-4" />,
      label: "Register New Account",
      action: "create",
    },
  ]);

  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    if (!adminId) return;

    // Fetch function
    const fetchAdmin = () => {
      fetch(`https://api.pwezayshops.com/admin/${adminId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data.length > 0) {
            setAccount(data.data[0]);
          }
        })
        .catch((err) => console.error("Failed to fetch admin data:", err));
    };

    // First fetch immediately
    fetchAdmin();

    // Live update every 500ms
    const interval = setInterval(fetchAdmin, 500);

    // Cleanup when component unmount
    return () => clearInterval(interval);
  }, [adminId]);

  return (
    <div className=" text-gray-100  md:h-[100vh] ">
  {/* Horizontal Tabs */}
<div className="bg-gray-900 rounded-2xl border border-gray-700 p-3 md:p-4 mb-6">
  
  <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
    
    {[
      { key: "overview", label: "Overview", icon: <User className="h-4 w-4" /> },
      { key: "edit", label: "Edit Account", icon: <User className="h-4 w-4" /> },
      { key: "security", label: "Security", icon: <ShieldCheck className="h-4 w-4" /> },
      { key: "create", label: "Register Account", icon: <User className="h-4 w-4" /> },
      { key: "managerSellerList", label: "Manager & Seller List", icon: <User className="h-4 w-4" /> },
      { key: "deliFees", label: "Delivery Fees", icon: <Truck className="h-4 w-4" /> },
      { key: "announcement", label: "Announcement", icon: <Bell className="h-4 w-4" /> },
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
        <span className="hidden sm:inline">{item.label}</span>
      </button>
    ))}
  </div>
</div>
      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6">
            <h3 className="font-bold text-lg mb-4 text-center text-[#B476FF]">
              Profile
            </h3>
            <div className="flex flex-col items-center text-center">
              {/* {account?.photo ? (
                <img
                  src={`https://api.pwezayshops.com/admin-uploads/${account.photo}`}
                  alt="Profile"
                  className="rounded-full w-20 h-20 object-cover mb-3 border-2 border-[#B476FF]"
                />
              ) : (
                <div className="w-20 h-20 rounded-full mb-3 border-2 border-[#B476FF] bg-gradient-to-br from-[#B476FF] to-purple-600 flex items-center justify-center text-white font-bold text-md shadow-md">
                  {account?.name?.charAt(0)?.toUpperCase() || "DA"}
                </div>
              )} */}
              {account?.photo ? (
  <img
    src={`https://api.pwezayshops.com/admin-uploads/${account.photo}?t=${Date.now()}`}
    alt="Profile"
    className="rounded-full w-20 h-20 object-cover mb-3 border-2 border-[#B476FF]"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = "https://via.placeholder.com/100";
    }}
  />
) : (
  <div className="w-20 h-20 rounded-full mb-3 border-2 border-[#B476FF] bg-gradient-to-br from-[#B476FF] to-purple-600 flex items-center justify-center text-white font-bold text-md shadow-md">
    {account?.name?.charAt(0)?.toUpperCase() || "DA"}
  </div>
)}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6">
            <h3 className="font-bold text-lg mb-4 text-[#B476FF]">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => action.action && setActiveTab(action.action)}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-[#B476FF]/20 hover:text-[#B476FF] transition-colors text-gray-300 text-sm"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1 md:col-span-3 bg-gray-900 rounded-2xl border border-gray-700 p-6">
          {activeTab === "overview" && <OverviewTab account={account} />}
          {activeTab === "edit" && (
            <EditAccountTab account={account} setAccount={setAccount} />
          )}

          {/* ✅ Clean — No Props Passed */}
          {activeTab === "security" && <SecurityTab />}

          {activeTab === "create" && <CreateAccount />}
          {activeTab === "managerSellerList" && <ManagerSellerList />}
          {activeTab === "deliFees" && <DeliFeesTab />}
          {activeTab === "announcement" && <AnnouncementTab />}
        </div>
      </div>
    </div>
  );
}
