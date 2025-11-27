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
    location.pathname.startsWith("/delivery")
  );

  const toggleDeliveryMenu = () => {
    setIsDeliveryOpen(!isDeliveryOpen);
  };

  const navItems = [
    { label: "Dashboards", icon: LayoutDashboard, to: "/" },
    { label: "Shop", icon: Store, to: "/shop" },
    { label: "Menu", icon: Utensils, to: "/menu" },
    { label: "Orders Receive", icon: BookOpen, to: "/orders/received" },

    // 👇 Delivery section placed here
    {
      label: "Delivery",
      icon: Truck,
      children: [
        { label: "Assign Delivery Man", to: "/orders/assignment" },
        { label: "Add delivery man", to: "/delivery/add-delivery-men" },
        { label: "Track delivery man", to: "/delivery/track-delivery-men" },
      ],
    },

    { label: "Sales History", icon: Receipt, to: "/salehistory" },
    { label: "Report", icon: BarChart2, to: "/report" },
    { label: "Management", icon: Users, to: "/management" },
    { label: "Chat", icon: MessageSquareMore, to: "/chat" },
    { label: "Setting", icon: Settings, to: "/setting" },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-md py-6 px-4">
      <div className="mb-8 flex items-center gap-2">
        <img src={logo} alt="Logo" className="size-14 rounded-full" />
        <h1 className="text-xl text-[#B476FF] font-bold">Blahhh</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, icon: Icon, to, children }) => {
          // If no children, render regular link
          if (!children) {
            return (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-purple-100 text-[#B476FF]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon className="w-5 h-5" /> {label}
              </NavLink>
            );
          }

          // If has children (like delivery)
          return (
            <div key={label}>
              <button
                onClick={toggleDeliveryMenu}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                  isDeliveryOpen
                    ? "bg-purple-100 text-[#B476FF]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  {label}
                </span>
                {isDeliveryOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {isDeliveryOpen && (
                <div className="pl-5 mt-2 flex flex-col gap-2">
                  {children.map(({ label: childLabel, to: childTo }) => (
                    <NavLink
                      key={childLabel}
                      to={childTo}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-2 rounded-md text-sm transition-colors ${
                          isActive
                            ? "bg-purple-100 text-[#B476FF]"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
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
