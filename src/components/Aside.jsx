import React, { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Store,
  Truck,
  BarChart2,
  Users,
  Settings,
  ChevronUp,
  ChevronDown,
  MapPin,
  UserPlus,
  Plus,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/pwyzay.jpg";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../AlertContext";

const Aside = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showAlert, confirm } = useAlert();

  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });

  const role = localStorage.getItem("role");

  const handleLogout = async () => {
    const ok = await confirm("Are you sure you want to logout?");
    if (!ok) return;

    localStorage.clear();
    showAlert("Logged out successfully!", "success");
    navigate("/login");
  };

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const isDeliveryRoute =
    location.pathname.startsWith("/delivery") ||
    location.pathname.startsWith("/orders");

  const [isDeliveryOpen, setIsDeliveryOpen] = useState(isDeliveryRoute);
  const [showCollapsedDeliveryMenu, setShowCollapsedDeliveryMenu] =
    useState(false);

  const deliveryMenuRef = useRef(null);

  const closeCollapsedMenu = () => {
    setShowCollapsedDeliveryMenu(false);
  };

  useEffect(() => {
    setIsDeliveryOpen(isDeliveryRoute);
  }, [location.pathname]);

  // ✅ FIX 1: reset collapsed popup on route or collapse change
  useEffect(() => {
    setShowCollapsedDeliveryMenu(false);
  }, [location.pathname, collapsed]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        deliveryMenuRef.current &&
        !deliveryMenuRef.current.contains(e.target)
      ) {
        setShowCollapsedDeliveryMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      to: "/",
      roles: ["owner"],
    },
    {
      label: "Shop",
      icon: Store,
      to: "/shop",
      roles: ["owner", "manager", "shopmanager"],
    },
    {
      label: "Delivery",
      icon: Truck,
      roles: ["owner", "manager", "delimanager"],
      children: [
        {
          label: "Assign Delivery",
          to: "/delivery/assignment",
          icon: MapPin,
        },
        {
          label: "Add Delivery",
          to: "/delivery/add-delivery-men",
          icon: UserPlus,
        },
        {
          label: "Track Delivery",
          to: "/delivery/track-delivery-men",
          icon: Plus,
        },
      ],
    },
    {
      label: "Report",
      icon: BarChart2,
      to: "/report",
      roles: ["owner"],
    },
    {
      label: "Management",
      icon: Users,
      to: "/management",
      roles: ["owner","manager"],
    },
    {
      label: "Management",
      icon: Users,
      to: "/shop-management",
      roles: ["shopmanager"],
    },
    {
      label: "Settings",
      icon: Settings,
      to: "/setting",
      roles: ["owner"],
    },
      {
      label: "Settings",
      icon: Settings,
      to: "/settingForManager",
      roles: ["manager","shopmanager","delimanager"],
    },
    //   {
    //   label: "Settings",
    //   icon: Settings,
    //   to: "/settingForDelimanager",
    //   roles: ["delimanager"],
    // },
  ];

  return (
    <aside
      className={`
      h-screen text-gray-300 flex flex-col shadow-xl
      transition-all duration-300
      ${collapsed ? "w-20" : "w-64 2xl:w-72 border-r border-gray-800"}
    `}
    >
      {/* LOGO + TOGGLE */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800/40">
        {!collapsed ? (
          <div className="flex flex-row gap-4 items-center justify-center text-center">
            <img src={logo} alt="logo" className="rounded-full w-10 h-10" />
            <h1 className="text-xl font-bold bg-[#B476FF] bg-clip-text text-transparent">
              Pwe Zay
            </h1>
          </div>
        ) : (
          <img src={logo} alt="logo" className="w-9 h-9 rounded-xl mx-auto" />
        )}

        <button
          onClick={() => {
            setCollapsed(!collapsed);
            setShowCollapsedDeliveryMenu(false);
          }}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {navItems
          .filter((item) => !item.roles || item.roles.includes(role))
          .map(({ label, icon: Icon, to, children }) => {
            if (!children) {
              return (
                <NavLink
                  key={to || label}
                  to={to}
                  onClick={closeCollapsedMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-xl transition-colors relative group
                    ${
                      isActive
                        ? "bg-purple-600/20 text-[#B476FF]"
                        : "text-gray-400 hover:bg-gray-800/60 hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />

                  {!collapsed && (
                    <span className="text-sm font-medium">{label}</span>
                  )}

                  {collapsed && (
                    <span className="absolute left-full ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                      {label}
                    </span>
                  )}
                </NavLink>
              );
            }

            return (
              <div
                key={label}
                className="space-y-1 relative"
                ref={deliveryMenuRef}
              >
                <button
                  onClick={() => {
                    if (collapsed) {
                      setShowCollapsedDeliveryMenu(!showCollapsedDeliveryMenu);
                    } else {
                      setIsDeliveryOpen(!isDeliveryOpen);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors
                  ${
                    isDeliveryRoute
                      ? "bg-purple-600/20 text-[#B476FF]"
                      : "text-gray-400 hover:bg-gray-800/60 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {!collapsed && (
                      <span className="text-sm font-medium">{label}</span>
                    )}
                  </div>

                  {!collapsed &&
                    (isDeliveryOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>

                {/* expanded */}
                {!collapsed && (
                  <div
                    className={`ml-6 pl-3 border-l border-purple-500/10 flex flex-col gap-1 overflow-hidden transition-all duration-200 ${
                      isDeliveryOpen ? "max-h-40 mt-2" : "max-h-0"
                    }`}
                  >
                    {children.map(({ label, to, icon: ChildIcon }) => (
                      <NavLink
                        key={label}
                        to={to}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
                          ${
                            isActive
                              ? "text-purple-400 bg-purple-500/10"
                              : "text-gray-500 hover:text-white hover:bg-gray-800/60"
                          }`
                        }
                      >
                        <ChildIcon className="w-4 h-4" />
                        {label}
                      </NavLink>
                    ))}
                  </div>
                )}

                {/* collapsed popup */}
                {collapsed && showCollapsedDeliveryMenu && (
                  <div className="absolute left-20 top-0 w-64 rounded-xl bg-gray-900 border border-gray-700 shadow-2xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700 font-semibold text-white">
                      Delivery
                    </div>

                    {children.map(({ label, to, icon: ChildIcon }) => (
                      <NavLink
                        key={label}
                        to={to}
                        onClick={() => setShowCollapsedDeliveryMenu(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 transition-colors
                          ${
                            isActive
                              ? "bg-purple-600/20 text-[#B476FF]"
                              : "text-gray-300 hover:bg-gray-800"
                          }`
                        }
                      >
                        <ChildIcon className="w-5 h-5" />
                        <span>{label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </nav>

      {/* LOGOUT */}
      <div className="p-3 border-t border-gray-800/40">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-3 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Aside;
