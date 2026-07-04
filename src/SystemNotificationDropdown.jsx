import React, { useEffect, useRef, useState } from "react";
import { Bell, ShoppingCart, Truck } from "lucide-react";

export default function SystemNotificationDropdown({ notifications = [] }) {
  const [open, setOpen] = useState(false);
  const [localNoti, setLocalNoti] = useState([]);
  const notiRef = useRef(null);

  // =============================
  // LIVE SYNC FROM LOCALSTORAGE
  // =============================
  useEffect(() => {
    const sync = () => {
      try {
        const saved =
          JSON.parse(localStorage.getItem("systemNoti")) || notifications || [];

        setLocalNoti(saved);
      } catch (e) {
        setLocalNoti([]);
      }
    };

    sync();

    const interval = setInterval(sync, 1000); // live update
    return () => clearInterval(interval);
  }, [notifications]);

  // =============================
  // CLOSE ON OUTSIDE CLICK
  // =============================
  useEffect(() => {
    const handleClick = (e) => {
      if (notiRef.current && !notiRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // =============================
  // CLEAR ALL NOTIFICATIONS
  // =============================
  const clearAll = () => {
    setLocalNoti([]);
    localStorage.removeItem("systemNoti");
  };

  // =============================
  // TYPE STYLES
  // =============================
  const typeConfig = {
    user: {
      icon: <Bell size={18} className="text-blue-400" />,
      textColor: "text-blue-300",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      gradient: "from-blue-500/20 to-transparent",
      iconBg: "bg-blue-500/10",
      iconBorder: "border-blue-500/30",
    },

    "shop-pending": {
      icon: <ShoppingCart size={18} className="text-yellow-400" />,
      textColor: "text-yellow-300",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      gradient: "from-yellow-500/20 to-transparent",
      iconBg: "bg-yellow-500/10",
      iconBorder: "border-yellow-500/30",
    },

    "shop-approved": {
      icon: <ShoppingCart size={18} className="text-green-400" />,
      textColor: "text-green-300",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      gradient: "from-green-500/20 to-transparent",
      iconBg: "bg-green-500/10",
      iconBorder: "border-green-500/30",
    },

    deliveryman: {
      icon: <Truck size={18} className="text-purple-400" />,
      textColor: "text-purple-300",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      gradient: "from-purple-500/20 to-transparent",
      iconBg: "bg-purple-500/10",
      iconBorder: "border-purple-500/30",
    },
  };

  return (
    <div className="relative" ref={notiRef}>
      {/* =============================
          BELL BUTTON
      ============================= */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative rounded-2xl bg-neutral-900 border border-neutral-800 p-2 hover:bg-neutral-800 transition"
      >
        <Bell className="h-5 w-5 text-neutral-100" />

        {localNoti.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1 rounded-full text-white animate-pulse">
            {localNoti.length}
          </span>
        )}
      </button>

      {/* =============================
          DROPDOWN
      ============================= */}
      {open && (
        <div className="absolute right-0 mt-2 w-[400px] max-h-[420px] overflow-hidden rounded-2xl bg-[#0f172a] border border-neutral-800 shadow-2xl z-50">

          {/* HEADER */}
          <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
            <span className="font-semibold text-neutral-200">
              System Notifications
            </span>

            <button
              onClick={clearAll}
              className="text-sm text-red-400 hover:text-red-300 transition"
            >
              Clear all
            </button>
          </div>

          {/* EMPTY STATE */}
          {localNoti.length === 0 && (
            <div className="p-6 text-center text-neutral-500 text-sm">
              No notifications
            </div>
          )}

          {/* LIST */}
          <div className="max-h-[360px] overflow-y-auto p-4">
            <ul>
              {localNoti.map((noti, i) => {
                const config =
                  typeConfig[noti.type] || {
                    icon: <Bell size={16} className="text-neutral-400" />,
                    textColor: "text-neutral-300",
                    bg: "bg-neutral-800/20",
                    border: "border-neutral-700",
                    gradient: "from-neutral-800/20 to-transparent",
                    iconBg: "bg-neutral-800/30",
                    iconBorder: "border-neutral-700",
                  };

                return (
                  <li
                    key={noti.id || i}
                    className={`relative px-4 py-2 mb-2 rounded-xl border transition-all group overflow-hidden
                    ${config.bg}
                    ${config.border}
                    hover:scale-[1.01]`}
                  >
                    {/* gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${config.gradient}
                      opacity-0 group-hover:opacity-100 transition`}
                    />

                    {/* content */}
                    <div className="relative flex gap-3 items-center">

                      {/* icon */}
                      <div
                        className={`size-9 rounded-md border flex items-center justify-center
                        ${config.iconBg}
                        ${config.iconBorder}`}
                      >
                        {config.icon}
                      </div>

                      {/* text */}
                      <div className="flex-1">
                        <div
                          className={`text-sm font-medium whitespace-pre-line ${config.textColor}`}
                        >
                          {noti.message}
                        </div>

                        <div className="flex justify-between mt-2 text-[11px] text-neutral-500">
                          <span>{noti.time}</span>
                          <span className="uppercase tracking-wide">
                            {noti.type}
                          </span>
                        </div>
                      </div>

                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}