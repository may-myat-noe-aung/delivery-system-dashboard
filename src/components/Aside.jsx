import React, { useState } from "react";
import {
  LayoutDashboard,
  Store,
  Utensils,
  Truck,
  Receipt,
  BarChart2,
  Users,
  Settings,
  BookOpen,
  ChevronUp,
  ChevronDown,
  MessageSquareMore,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";

const Aside = () => {
  const location = useLocation();
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(
    location.pathname.startsWith("/delivery") ||
      location.pathname.startsWith("/orders")
  );

  const toggleDeliveryMenu = () => {
    setIsDeliveryOpen((prev) => !prev);
  };

  const navItems = [
    { label: "Dashboards", icon: LayoutDashboard, to: "/" },
    { label: "Shop", icon: Store, to: "/shop" },
    // { label: "Menu", icon: Utensils, to: "/menu" },
    // { label: "Orders Receive", icon: BookOpen, to: "/orders/received" },
    {
      label: "Delivery",
      icon: Truck,
      children: [
        { label: "Assign Delivery Man", to: "/orders/assignment" },
        { label: "Add Delivery Man", to: "/delivery/add-delivery-men" },
        { label: "Track Delivery Man", to: "/delivery/track-delivery-men" },
      ],
    },
    // { label: "Sales History", icon: Receipt, to: "/salehistory" },
    { label: "Report", icon: BarChart2, to: "/report" },
    { label: "Management", icon: Users, to: "/management" },
    // { label: "Chat", icon: MessageSquareMore, to: "/chat" },
    { label: "Setting", icon: Settings, to: "/setting" },
  ];

  return (
    <aside
      className="
        w-64 h-screen py-6 px-4
        bg-white dark:bg-gray-900
        text-gray-700 dark:text-gray-200
        shadow-md border-r
        border-gray-200 dark:border-gray-800
      "
    >
      {/* LOGO */}
      <div className="mb-8 flex items-center gap-2">
        <img
          src={logo}
          alt="Logo"
          className="size-14 rounded-full"
        />
        <h1 className="text-xl font-bold text-[#B476FF]">
          Blahhh
        </h1>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, icon: Icon, to, children }) => {
          // NORMAL LINK
          if (!children) {
            return (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `
                  flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                  ${
                    isActive
                      ? "bg-purple-100 dark:bg-purple-900/30 text-[#B476FF]"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </NavLink>
            );
          }

          // DELIVERY (WITH CHILDREN)
          return (
            <div key={label}>
              <button
                onClick={toggleDeliveryMenu}
                className={`
                  flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors
                  ${
                    isDeliveryOpen
                      ? "bg-purple-100 dark:bg-purple-900/30 text-[#B476FF]"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                </span>

                {isDeliveryOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {isDeliveryOpen && (
                <div className="pl-6 mt-1 flex flex-col gap-1">
                  {children.map(({ label: childLabel, to: childTo }) => (
                    <NavLink
                      key={childLabel}
                      to={childTo}
                      className={({ isActive }) =>
                        `
                        px-3 py-2 rounded-md text-sm transition-colors
                        ${
                          isActive
                            ? "bg-purple-100 dark:bg-purple-900/30 text-[#B476FF]"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }
                      `
                      }
                    >
                      {childLabel}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Aside;
