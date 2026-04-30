// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   Store,
//   Truck,
//   BarChart2,
//   Users,
//   Settings,
//   ChevronUp,
//   ChevronDown,
// } from "lucide-react";
// import { NavLink, useLocation } from "react-router-dom";
// import logo from "../assets/images/logo/logo.png";

// const Aside = () => {
//   const location = useLocation();

//   const [isDeliveryOpen, setIsDeliveryOpen] = useState(
//     location.pathname.startsWith("/delivery") ||
//       location.pathname.startsWith("/orders")
//   );

//   const toggleDeliveryMenu = () => {
//     setIsDeliveryOpen((prev) => !prev);
//   };

//   const navItems = [
//     { label: "Dashboards", icon: LayoutDashboard, to: "/" },
//     { label: "Shop", icon: Store, to: "/shop" },
//     {
//       label: "Delivery",
//       icon: Truck,
//       children: [
//         { label: "Assign Delivery Man", to: "/orders/assignment" },
//         { label: "Add Delivery Man", to: "/delivery/add-delivery-men" },
//         // { label: "Track Delivery Man", to: "/delivery/track-delivery-men" },
//       ],
//     },
//     { label: "Report", icon: BarChart2, to: "/report" },
//     { label: "Management", icon: Users, to: "/management" },
//     { label: "Setting", icon: Settings, to: "/setting" },
//   ];

//   return (
//     <aside className="w-64 h-screen py-6 px-4 bg-gray-900 text-gray-200 shadow-md border-r border-gray-800">
//       {/* LOGO */}
//       <div className="mb-8 flex items-center gap-2">
//         <img src={logo} alt="Logo" className="w-14 h-14 rounded-full" />
//         <h1 className="text-xl font-bold text-[#B476FF]">Blahhh</h1>
//       </div>

//       {/* NAV */}
//       <nav className="flex flex-col gap-1">
//         {navItems.map(({ label, icon: Icon, to, children }) => {
//           // NORMAL LINK
//           if (!children) {
//             return (
//               <NavLink
//                 key={label}
//                 to={to}
//                 className={({ isActive }) =>
//                   `
//                   flex items-center gap-2 px-3 py-2 rounded-md transition
//                   ${
//                     isActive
//                       ? "bg-purple-900/40 text-[#B476FF]"
//                       : "hover:bg-gray-800 text-gray-300"
//                   }
//                 `
//                 }
//               >
//                 <Icon className="w-5 h-5" />
//                 <span className="text-sm font-medium">{label}</span>
//               </NavLink>
//             );
//           }

//           // DELIVERY (WITH CHILDREN)
//           return (
//             <div key={label}>
//               <button
//                 onClick={toggleDeliveryMenu}
//                 className={`
//                   flex items-center justify-between w-full px-3 py-2 rounded-md transition
//                   ${
//                     isDeliveryOpen
//                       ? "bg-purple-900/40 text-[#B476FF]"
//                       : "hover:bg-gray-800 text-gray-300"
//                   }
//                 `}
//               >
//                 <span className="flex items-center gap-2">
//                   <Icon className="w-5 h-5" />
//                   <span className="text-sm font-medium">{label}</span>
//                 </span>

//                 {isDeliveryOpen ? (
//                   <ChevronUp className="w-4 h-4" />
//                 ) : (
//                   <ChevronDown className="w-4 h-4" />
//                 )}
//               </button>

//               {isDeliveryOpen && (
//                 <div className="pl-6 mt-1 flex flex-col gap-1">
//                   {children.map(({ label: childLabel, to: childTo }) => (
//                     <NavLink
//                       key={childLabel}
//                       to={childTo}
//                       className={({ isActive }) =>
//                         `
//                         px-3 py-2 rounded-md text-sm transition
//                         ${
//                           isActive
//                             ? "bg-purple-900/40 text-[#B476FF]"
//                             : "hover:bg-gray-800 text-gray-400"
//                         }
//                       `
//                       }
//                     >
//                       {childLabel}
//                     </NavLink>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

// export default Aside;
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Store,
  Truck,
  BarChart2,
  Users,
  Settings,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";

const Aside = () => {
  const location = useLocation();

  const isDeliveryRoute =
    location.pathname.startsWith("/delivery") ||
    location.pathname.startsWith("/orders");

  const [isDeliveryOpen, setIsDeliveryOpen] = useState(isDeliveryRoute);

  useEffect(() => {
    setIsDeliveryOpen(isDeliveryRoute);
  }, [location.pathname]);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/" },
    { label: "Shop", icon: Store, to: "/shop" },
    {
      label: "Delivery",
      icon: Truck,
      children: [
        { label: "Assign Delivery", to: "/orders/assignment" },
        { label: "Add Delivery Man", to: "/delivery/add-delivery-men" },
        { label: "Track Delivery Man", to: "/delivery/track-delivery-men" },

      ],
    },
    { label: "Report", icon: BarChart2, to: "/report" },
    { label: "Management", icon: Users, to: "/management" },
    { label: "Settings", icon: Settings, to: "/setting" },
  ];

  return (
    <aside className="w-80 h-screen bg-gray-750 text-gray-300 border-r border-gray-800 flex flex-col">
      
      {/* LOGO */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-800">
        <img
          src={logo}
          alt="logo"
          className="w-11 h-11 rounded-full object-cover"
        />
        <h1 className="text-lg font-bold text-purple-400 tracking-wide">
          Blahhh
        </h1>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">

        {navItems.map(({ label, icon: Icon, to, children }) => {

          // NORMAL LINK
          if (!children) {
            return (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `
                  group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-purple-900/30 text-purple-400"
                      : "hover:bg-gray-800 text-gray-400"
                  }
                `
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>

                {/* ACTIVE INDICATOR */}
                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-purple-500 opacity-0 group-[.active]:opacity-100" />
              </NavLink>
            );
          }

          // DROPDOWN (DELIVERY)
          return (
            <div key={label} className="space-y-1">

              <button
                onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                  transition-all duration-200
                  ${
                    isDeliveryOpen
                      ? "bg-purple-900/30 text-purple-400"
                      : "hover:bg-gray-800 text-gray-400"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                </div>

                {isDeliveryOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* SUB MENU */}
              <div
                className={`
                  ml-6 pl-3 border-l border-gray-800 flex flex-col gap-1
                  transition-all duration-300 overflow-hidden
                  ${isDeliveryOpen ? "max-h-40 mt-1" : "max-h-0"}
                `}
              >
                {children.map(({ label: childLabel, to: childTo }) => (
                  <NavLink
                    key={childLabel}
                    to={childTo}
                    className={({ isActive }) =>
                      `
                      text-sm px-3 py-2 rounded-md transition
                      ${
                        isActive
                          ? "text-purple-400 bg-purple-900/20"
                          : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                      }
                    `
                    }
                  >
                    {childLabel}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Aside;