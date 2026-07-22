import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useLocation } from "react-router-dom";
import SystemNotificationFetcher from "../SystemNotificationFetcher";
import SystemNotificationFetcherForShopmanager from "../SystemNotificationFetcherForShopmanager";
import SystemNotificationFetcherForDelimanager from "../SystemNotificationFetcherForDelimanager";
import { apiFetch } from "../api";

const Header = () => {
const role = localStorage.getItem("role");
const location = useLocation();

  const [account, setAccount] = useState(null);

  // Support both Owner and Manager
  const adminId =
    localStorage.getItem("adminId") ||
    localStorage.getItem("userId")

useEffect(() => {
  if (!adminId) return;

  const fetchAdmin = async () => {
    try {
      const res = await apiFetch(
        `https://api.pwezayshops.com/admin/${adminId}`
      );

      if (!res) return;

      const data = await res.json();

      if (
        data.success &&
        Array.isArray(data.data) &&
        data.data.length > 0
      ) {
        setAccount(data.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchAdmin();

  const interval = setInterval(fetchAdmin, 500);

  return () => clearInterval(interval);
}, [adminId]);

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/") return "Dashboard";
    if (path.startsWith("/shop")) return "Shop";
    if (path.startsWith("/report")) return "Report";
    if (path.startsWith("/management")) return "Management";
    if (path.startsWith("/shop-management")) return "Management";
    if (path.startsWith("/setting")) return "Settings";
    if (path.startsWith("/delivery/assignment"))
      return "Assign Delivery";
    if (path.startsWith("/delivery/add-delivery-men"))
      return "Add Delivery Man";
    if (path.startsWith("/delivery/track-delivery-men"))
      return "Track Delivery Man";

    return "Dashboard";
  };

  return (
    <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold ">
          {getPageTitle()}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

      {/* Notification */}

{/* Notification */}

{role === "owner" || role === "manager" ? (
  <SystemNotificationFetcher />
) : role === "shopmanager" ? (
  <SystemNotificationFetcherForShopmanager />
) : role === "delimanager" ? (
  <SystemNotificationFetcherForDelimanager />
) : null}

        <div className="w-px h-6 bg-[#B476FF]" />

        {/* Profile */}
        <div className="flex items-center gap-3">

          {account?.photo ? (
            <img
              src={`https://api.pwezayshops.com/admin-uploads/${account.photo}?t=${Date.now()}`}
              alt={account.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#B476FF]"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold">
              {account?.name
                ? account.name.charAt(0).toUpperCase()
                : <User className="w-5 h-5" />}
            </div>
          )}

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-white">
              {account?.name || "Loading..."}
            </p>

            <p className="text-xs text-gray-400 capitalize">
              {account?.role || "-"}
            </p>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;