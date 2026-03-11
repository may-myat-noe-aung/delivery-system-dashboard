// // import React, { useState } from "react";
// // import {
// //   Bell,
// //   LogOut,
// //   MessageCircleMore,
// //   Search,
// //   Send,
// //   Settings,
// //   Sun,
// //   Moon,
// // } from "lucide-react";
// // import { useTheme } from "./ThemeProvider";

// // const Header = () => {
// //   const { dark, toggleTheme } = useTheme();

// //   const [search, setSearch] = useState("");
// //   const [showMessages, setShowMessages] = useState(false);
// //   const [showNotifications, setShowNotifications] = useState(false);
// //   const [showProfile, setShowProfile] = useState(false);

// //   const [activeChat, setActiveChat] = useState({
// //     group: "Customers",
// //     name: "May",
// //   });

// //   const users = {
// //     Customers: ["May", "Customer B", "Customer C"],
// //     Shopkeepers: ["Shopkeeper X", "Shopkeeper Y"],
// //     Delivery: ["Delivery Man 1", "Delivery Man 2", "Delivery Man 3"],
// //   };

// //   const [chats, setChats] = useState({
// //     May: [{ from: "May", text: "Hello Admin!", self: false }],
// //     "Customer B": [],
// //     "Customer C": [],
// //     "Shopkeeper X": [],
// //     "Shopkeeper Y": [],
// //     "Delivery Man 1": [],
// //     "Delivery Man 2": [],
// //     "Delivery Man 3": [],
// //   });

// //   const [newMessage, setNewMessage] = useState("");
// //   const [recipientSearch, setRecipientSearch] = useState("");

// //   const handleSendMessage = () => {
// //     if (!newMessage.trim()) return;
// //     setChats((prev) => ({
// //       ...prev,
// //       [activeChat.name]: [
// //         ...(prev[activeChat.name] || []),
// //         { from: "Admin", text: newMessage, self: true },
// //       ],
// //     }));
// //     setNewMessage("");
// //   };

// //   const [notifications] = useState([
// //     { id: 1, type: "Order", text: "New order #101 received 🍔" },
// //     { id: 2, type: "Payment", text: "Payment confirmed 💳" },
// //   ]);

// //   return (
// //     <>
// //       {/* HEADER */}
// //       <header
// //         className="
// //           flex items-center justify-end py-3 px-4 w-full relative rounded-full
// //           bg-white dark:bg-gray-800
// //           text-gray-800 dark:text-gray-100
// //           shadow-sm
// //         "
// //       >
// //         {/* Search */}
// //         {/* <div className="relative flex items-center w-full max-w-sm">
// //           <Search className="absolute left-3 h-4 w-4 text-gray-500 dark:text-gray-300" />
// //           <input
// //             type="text"
// //             placeholder="Search dashboard..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="
// //               pl-9 pr-3 py-2 rounded-full w-full text-sm
// //               bg-gray-100 dark:bg-gray-700
// //               text-gray-800 dark:text-gray-100
// //               placeholder-gray-500 dark:placeholder-gray-300
// //               focus:ring-0 focus:outline-none
// //             "
// //           />
// //         </div> */}

// //         {/* RIGHT */}
// //         <div className="flex items-center gap-3">
// //           {/* THEME TOGGLE */}
// //           {/* <button
// //             onClick={toggleTheme}
// //             className="
// //               p-2 rounded-full
// //               bg-gray-100 dark:bg-gray-700
// //               hover:bg-gray-200 dark:hover:bg-gray-600
// //             "
// //           >
// //             {dark ? <Sun size={16} /> : <Moon size={16} />}
// //           </button> */}

// //           {/* PROFILE */}
// //           <div className="relative">
// //             <button
// //               onClick={() => {
// //                 setShowProfile(!showProfile);
// //                 setShowMessages(false);
// //                 setShowNotifications(false);
// //               }}
// //               className="flex items-center gap-2"
// //             >
// //               <img
// //                 className="w-9 h-9 rounded-full"
// //                 src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2"
// //               />
// //               <div>
// //                 <p className="text-sm font-bold text-[#B476FF]">Su Su Khin</p>
// //                 <p className="text-xs text-[#B476FF]">Admin</p>
// //               </div>
// //             </button>

// //             {showProfile && (
// //               <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
// //                 <button className="flex gap-2 p-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700">
// //                   <Settings size={16} /> Settings
// //                 </button>
// //                 <button className="flex gap-2 p-2 w-full text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
// //                   <LogOut size={16} /> Logout
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </header>
// //     </>
// //   );
// // };

// // export default Header;

// import React, { useState } from "react";
// import {
//   LogOut,
//   Settings,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { useTheme } from "./ThemeProvider";

// const Header = () => {
//   const { dark, toggleTheme } = useTheme();

//   const [search, setSearch] = useState("");
//   const [showProfile, setShowProfile] = useState(false);

//   const [activeChat, setActiveChat] = useState({
//     group: "Customers",
//     name: "May",
//   });

//   const users = {
//     Customers: ["May", "Customer B", "Customer C"],
//     Shopkeepers: ["Shopkeeper X", "Shopkeeper Y"],
//     Delivery: ["Delivery Man 1", "Delivery Man 2", "Delivery Man 3"],
//   };

//   const [chats, setChats] = useState({
//     May: [{ from: "May", text: "Hello Admin!", self: false }],
//     "Customer B": [],
//     "Customer C": [],
//     "Shopkeeper X": [],
//     "Shopkeeper Y": [],
//     "Delivery Man 1": [],
//     "Delivery Man 2": [],
//     "Delivery Man 3": [],
//   });

//   const [newMessage, setNewMessage] = useState("");
//   const [recipientSearch, setRecipientSearch] = useState("");

//   const handleSendMessage = () => {
//     if (!newMessage.trim()) return;
//     setChats((prev) => ({
//       ...prev,
//       [activeChat.name]: [
//         ...(prev[activeChat.name] || []),
//         { from: "Admin", text: newMessage, self: true },
//       ],
//     }));
//     setNewMessage("");
//   };

//   const [notifications] = useState([
//     { id: 1, type: "Order", text: "New order #101 received 🍔" },
//     { id: 2, type: "Payment", text: "Payment confirmed 💳" },
//   ]);

//     const handleLogout = () => {
//     // token မသုံးဘူးဆို clear လုပ်စရာမလို
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* HEADER */}
//       <header
//         className="
//           flex items-center justify-between py-3 px-4 w-full relative rounded-full
//           bg-white dark:bg-gray-800
//           text-gray-800 dark:text-gray-100
//           shadow-sm
//         "
//       >
//         {/* Search (optional) */}
//         {/* <div className="relative flex items-center w-full max-w-sm">
//           <Search className="absolute left-3 h-4 w-4 text-gray-500 dark:text-gray-300" />
//           <input
//             type="text"
//             placeholder="Search dashboard..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="
//               pl-9 pr-3 py-2 rounded-full w-full text-sm
//               bg-gray-100 dark:bg-gray-700
//               text-gray-800 dark:text-gray-100
//               placeholder-gray-500 dark:placeholder-gray-300
//               focus:ring-0 focus:outline-none
//             "
//           />
//         </div> */}

//         {/* RIGHT */}
//         <div className="flex items-center gap-3">
//           {/* THEME TOGGLE (optional) */}
//           {/* <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
//           >
//             {dark ? <Sun size={16} /> : <Moon size={16} />}
//           </button> */}

//           {/* LOGOUT BUTTON */}

//           {/* PROFILE */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 setShowProfile(!showProfile);
//               }}
//               className="flex items-center gap-2"
//             >
//               <img
//                 className="w-9 h-9 rounded-full"
//                 src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2"
//               />
//               <div>
//                 <p className="text-sm font-bold text-[#B476FF]">Su Su Khin</p>
//                 <p className="text-xs text-[#B476FF]">Admin</p>
//               </div>
//             </button>

//             {showProfile && (
//               <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
//                 <button className="flex gap-2 p-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700">
//                   <Settings size={16} /> Settings
//                 </button>
//               </div>
//             )}
//           </div>

//         </div>

//                <button
//             onClick={() => {
//             onClick={handleLogout}

//             }}
//             className="flex items-center gap-1 p-2 rounded-full text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             <LogOut size={16} /> Logout
//           </button>
//       </header>
//     </>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { LogOut, Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const [activeChat, setActiveChat] = useState({
    group: "Customers",
    name: "May",
  });

  const users = {
    Customers: ["May", "Customer B", "Customer C"],
    Shopkeepers: ["Shopkeeper X", "Shopkeeper Y"],
    Delivery: ["Delivery Man 1", "Delivery Man 2", "Delivery Man 3"],
  };

  const [chats, setChats] = useState({
    May: [{ from: "May", text: "Hello Admin!", self: false }],
    "Customer B": [],
    "Customer C": [],
    "Shopkeeper X": [],
    "Shopkeeper Y": [],
    "Delivery Man 1": [],
    "Delivery Man 2": [],
    "Delivery Man 3": [],
  });

  const [newMessage, setNewMessage] = useState("");
  const [recipientSearch, setRecipientSearch] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setChats((prev) => ({
      ...prev,
      [activeChat.name]: [
        ...(prev[activeChat.name] || []),
        { from: "Admin", text: newMessage, self: true },
      ],
    }));
    setNewMessage("");
  };

  const [notifications] = useState([
    { id: 1, type: "Order", text: "New order #101 received 🍔" },
    { id: 2, type: "Payment", text: "Payment confirmed 💳" },
  ]);

  const handleLogout = () => {
    // Clear tokens or user data here if needed
    navigate("/login");
  };

  return (
    <>
      {/* HEADER */}
      <header
        className="
          flex items-center justify-between py-3 px-4 w-full relative rounded-full
          bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-100
          shadow-sm
        "
      >
        {/* Search (optional) */}
        {/* <div className="relative flex items-center w-full max-w-sm">
          <Search className="absolute left-3 h-4 w-4 text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search dashboard..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              pl-9 pr-3 py-2 rounded-full w-full text-sm
              bg-gray-100 dark:bg-gray-700
              text-gray-800 dark:text-gray-100
              placeholder-gray-500 dark:placeholder-gray-300
              focus:ring-0 focus:outline-none
            "
          />
        </div> */}

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* THEME TOGGLE (optional) */}
          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button> */}

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2"
            >
              <img
                className="w-9 h-9 rounded-full"
                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2"
                alt="profile"
              />
              <div>
                <p className="text-sm font-bold text-[#B476FF]">Su Su Khin</p>
                <p className="text-xs text-[#B476FF]">Admin</p>
              </div>
            </button>

            {/* {showProfile && ( */}

            {/* )} */}
          </div>

          <div className="absolute right-0  w-44 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 flex flex-col gap-1">
            {/* <button className="flex gap-2 p-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings size={16} /> Settings
                </button> */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 w-full text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
