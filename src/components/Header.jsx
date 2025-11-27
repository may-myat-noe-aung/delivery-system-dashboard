// import React, { useState } from "react";
// import {
//   Bell,
//   LogOut,
//   MessageCircleMore,
//   Search,
//   Send,
//   Settings,
// } from "lucide-react";

// const Header = () => {
//   const [search, setSearch] = useState("");
//   const [showMessages, setShowMessages] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);

//   // --- Users by group ---
//   const users = {
//     Customers: ["Customer A", "Customer B", "Customer C"],
//     Shopkeepers: ["Shopkeeper X", "Shopkeeper Y"],
//     Delivery: ["Delivery Man 1", "Delivery Man 2", "Delivery Man 3"],
//   };

//   // --- Chat State ---
//   const [activeChat, setActiveChat] = useState({ group: "Customers", name: "Customer A" });
//   const [chats, setChats] = useState({
//     "Customer A": [
//       { from: "Customer A", text: "Where’s my order?", self: false },
//       { from: "Admin", text: "It’s on the way 🚴", self: true },
//     ],
//     "Customer B": [{ from: "Customer B", text: "Thanks!", self: false }],
//     "Shopkeeper X": [{ from: "Shopkeeper X", text: "Stock is low!", self: false }],
//     "Delivery Man 1": [{ from: "Delivery Man 1", text: "Delivered ✅", self: false }],
//   });

//   const [newMessage, setNewMessage] = useState("");

//   // Send Message
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

//   // Notifications
//   const notifications = [
//     { id: 1, type: "Order", text: "New order received 🍔" },
//     { id: 2, type: "Payment", text: "Payment confirmed 💳" },
//     { id: 3, type: "Delivery", text: "Rider picked up order 🚴" },
//     { id: 4, type: "System", text: "Dashboard updated 🔄" },
//   ];

//   return (
//     <header className="flex items-center justify-between py-3 px-4 shadow-sm bg-white w-full rounded-full relative">
//       {/* Search Bar */}
//       <div className="relative flex items-center w-full max-w-sm">
//         <Search className="absolute left-3 h-4 w-4 text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="pl-9 pr-3 py-2 rounded-full bg-gray-100 text-sm border-none focus:ring-0 focus:outline-none w-full shadow-sm"
//         />
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-3">
//         {/* Messages */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowMessages(!showMessages);
//               setShowNotifications(false);
//               setShowProfile(false);
//             }}
//             className="border rounded-full p-1.5 border-[#B476FF] shadow-sm relative"
//           >
//             <MessageCircleMore className="w-4 h-4 text-[#B476FF]" />
//             <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white px-1 rounded-full">
//               {Object.values(chats).reduce((acc, c) => acc + c.length, 0)}
//             </span>
//           </button>

//           {showMessages && (
//             <div className="absolute right-0 mt-2 w-[600px] h-[420px] bg-white shadow-lg rounded-lg flex z-20">
//               {/* Left: Recipient list */}
//               <div className="w-1/3 border-r p-2 overflow-y-auto">
//                 <h4 className="text-sm font-semibold mb-2">Chats</h4>
//                 {Object.keys(users).map((group) => (
//                   <div key={group} className="mb-2">
//                     <p className="text-xs font-bold text-gray-500 mb-1">{group}</p>
//                     {users[group].map((name) => (
//                       <button
//                         key={name}
//                         onClick={() => setActiveChat({ group, name })}
//                         className={`block w-full text-left px-2 py-1 rounded-md text-sm mb-1 ${
//                           activeChat.name === name
//                             ? "bg-[#B476FF] text-white"
//                             : "hover:bg-gray-100"
//                         }`}
//                       >
//                         {name}
//                       </button>
//                     ))}
//                   </div>
//                 ))}
//               </div>

//               {/* Right: Chat window */}
//               <div className="w-2/3 flex flex-col">
//                 <div className="flex-1 p-3 overflow-y-auto space-y-2">
//                   {chats[activeChat.name]?.map((msg, i) => (
//                     <div
//                       key={i}
//                       className={`flex ${
//                         msg.self ? "justify-end" : "justify-start"
//                       }`}
//                     >
//                       <div
//                         className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${
//                           msg.self
//                             ? "bg-[#B476FF] text-white"
//                             : "bg-gray-200 text-gray-800"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Input Box */}
//                 <div className="p-2 border-t flex gap-2">
//                   <input
//                     type="text"
//                     placeholder={`Message ${activeChat.name}...`}
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     className="flex-1 border rounded-md px-3 py-2 text-sm"
//                   />
//                   <button
//                     onClick={handleSendMessage}
//                     className="bg-[#B476FF] text-white px-3 rounded-md"
//                   >
//                     <Send className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Notifications */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowNotifications(!showNotifications);
//               setShowMessages(false);
//               setShowProfile(false);
//             }}
//             className="border rounded-full p-1.5 border-[#B476FF] shadow-sm relative"
//           >
//             <Bell className="w-4 h-4 text-[#B476FF]" />
//             <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white px-1 rounded-full">
//               {notifications.length}
//             </span>
//           </button>
//           {showNotifications && (
//             <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-2 z-20">
//               <h4 className="text-sm font-semibold text-gray-700 mb-2">
//                 Notifications
//               </h4>
//               <div className="max-h-48 overflow-y-auto">
//                 {notifications.map((note) => (
//                   <div
//                     key={note.id}
//                     className="p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
//                   >
//                     <span className="text-xs font-semibold text-[#B476FF]">
//                       {note.type}:
//                     </span>
//                     <p className="text-xs text-gray-700">{note.text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Divider */}
//         <div className="w-[2px] h-8 bg-[#B476FF]"></div>

//         {/* Profile */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowProfile(!showProfile);
//               setShowMessages(false);
//               setShowNotifications(false);
//             }}
//             className="flex items-center"
//           >
//             <img
//               className="w-9 h-9 rounded-full"
//               src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//               alt="profile"
//             />
//             <div className="ml-2 text-left">
//               <p className="text-sm font-bold text-[#B476FF]">Su Su Khin</p>
//               <p className="text-xs font-semibold text-[#B476FF]">Admin</p>
//             </div>
//           </button>
//           {showProfile && (
//             <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-20">
//               <button className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-md">
//                 <Settings className="w-4 h-4 text-gray-600" /> Settings
//               </button>
//               <button className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-md text-red-600">
//                 <LogOut className="w-4 h-4" /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import React, { useState } from "react";
// import {
//   Bell,
//   LogOut,
//   MessageCircleMore,
//   Search,
//   Send,
//   Settings,
// } from "lucide-react";

// const Header = () => {
//   const [search, setSearch] = useState("");
//   const [showMessages, setShowMessages] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);

//   // --- Users by group ---
//   const users = {
//     Customers: ["May", "Customer B", "Customer C"],
//     Shopkeepers: ["Shopkeeper X", "Shopkeeper Y"],
//     Delivery: ["Delivery Man 1", "Delivery Man 2", "Delivery Man 3"],
//   };

//   // --- Chat State ---
//   const [activeChat, setActiveChat] = useState({ group: "Customers", name: "May" });
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

//   // --- Send Message ---
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

//   // --- Notifications ---
//   const notifications = [
//     { id: 1, type: "Order", text: "New order received 🍔" },
//     { id: 2, type: "Payment", text: "Payment confirmed 💳" },
//     { id: 3, type: "Delivery", text: "Rider picked up order 🚴" },
//     { id: 4, type: "System", text: "Dashboard updated 🔄" },
//   ];

//   return (
//     <header className="flex items-center justify-between py-3 px-4 shadow-sm bg-white w-full rounded-full relative">
//       {/* Search Bar */}
//       <div className="relative flex items-center w-full max-w-sm">
//         <Search className="absolute left-3 h-4 w-4 text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search dashboard..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="pl-9 pr-3 py-2 rounded-full bg-gray-100 text-sm border-none focus:ring-0 focus:outline-none w-full shadow-sm"
//         />
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-3">
//         {/* Messages */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowMessages(!showMessages);
//               setShowNotifications(false);
//               setShowProfile(false);
//             }}
//             className="border rounded-full p-1.5 border-[#B476FF] shadow-sm relative"
//           >
//             <MessageCircleMore className="w-4 h-4 text-[#B476FF]" />
//             <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white px-1 rounded-full">
//               {Object.values(chats).reduce((acc, c) => acc + c.length, 0)}
//             </span>
//           </button>

//           {showMessages && (
//             <div className="absolute right-0 mt-2 w-[600px] h-[420px] bg-white shadow-lg rounded-lg flex z-20">
//               {/* Left: Recipient list */}
//               <div className="w-1/3 border-r p-2 flex flex-col">
//                 <input
//                   type="text"
//                   placeholder="Search recipient..."
//                   value={recipientSearch}
//                   onChange={(e) => setRecipientSearch(e.target.value)}
//                   className="border rounded-md px-2 py-1 text-xs mb-2"
//                 />

//                 <div className="overflow-y-auto flex-1">
//                   {Object.keys(users).map((group) => (
//                     <div key={group} className="mb-2">
//                       <p className="text-xs font-bold text-gray-500 mb-1">{group}</p>
//                       {users[group]
//                         .filter((name) =>
//                           name.toLowerCase().includes(recipientSearch.toLowerCase())
//                         )
//                         .map((name) => (
//                           <button
//                             key={name}
//                             onClick={() => setActiveChat({ group, name })}
//                             className={`block w-full text-left px-2 py-1 rounded-md text-sm mb-1 ${
//                               activeChat.name === name
//                                 ? "bg-[#B476FF] text-white"
//                                 : "hover:bg-gray-100"
//                             }`}
//                           >
//                             {name}
//                           </button>
//                         ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Right: Chat window */}
//               <div className="w-2/3 flex flex-col">
//                 <div className="flex-1 p-3 overflow-y-auto space-y-2">
//                   {chats[activeChat.name]?.map((msg, i) => (
//                     <div
//                       key={i}
//                       className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
//                     >
//                       <div
//                         className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${
//                           msg.self
//                             ? "bg-[#B476FF] text-white"
//                             : "bg-gray-200 text-gray-800"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Input Box */}
//                 <div className="p-2 border-t flex gap-2">
//                   <input
//                     type="text"
//                     placeholder={`Message ${activeChat.name}...`}
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     className="flex-1 border rounded-md px-3 py-2 text-sm"
//                   />
//                   <button
//                     onClick={handleSendMessage}
//                     className="bg-[#B476FF] text-white px-3 rounded-md"
//                   >
//                     <Send className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Notifications */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowNotifications(!showNotifications);
//               setShowMessages(false);
//               setShowProfile(false);
//             }}
//             className="border rounded-full p-1.5 border-[#B476FF] shadow-sm relative"
//           >
//             <Bell className="w-4 h-4 text-[#B476FF]" />
//             <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white px-1 rounded-full">
//               {notifications.length}
//             </span>
//           </button>
//           {showNotifications && (
//             <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-2 z-20">
//               <h4 className="text-sm font-semibold text-gray-700 mb-2">
//                 Notifications
//               </h4>
//               <div className="max-h-48 overflow-y-auto">
//                 {notifications.map((note) => (
//                   <div
//                     key={note.id}
//                     className="p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
//                   >
//                     <span className="text-xs font-semibold text-[#B476FF]">
//                       {note.type}:
//                     </span>
//                     <p className="text-xs text-gray-700">{note.text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Divider */}
//         <div className="w-[2px] h-8 bg-[#B476FF]"></div>

//         {/* Profile */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowProfile(!showProfile);
//               setShowMessages(false);
//               setShowNotifications(false);
//             }}
//             className="flex items-center"
//           >
//             <img
//               className="w-9 h-9 rounded-full"
//               src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//               alt="profile"
//             />
//             <div className="ml-2 text-left">
//               <p className="text-sm font-bold text-[#B476FF]">Su Su Khin</p>
//               <p className="text-xs font-semibold text-[#B476FF]">Admin</p>
//             </div>
//           </button>
//           {showProfile && (
//             <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-20">
//               <button className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-md">
//                 <Settings className="w-4 h-4 text-gray-600" /> Settings
//               </button>
//               <button className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-md text-red-600">
//                 <LogOut className="w-4 h-4" /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
// import React, { useState, useEffect } from "react";
// import {
//   Bell,
//   LogOut,
//   MessageCircleMore,
//   Search,
//   Send,
//   Settings,
// } from "lucide-react";

// const Header = ({ orders, onNotificationClick }) => {
//   const [search, setSearch] = useState("");
//   const [showMessages, setShowMessages] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);

//   // --- Users by group ---
//   const users = {
//     Customers: ["May", "Customer B", "Customer C"],
//     Shopkeepers: ["Shopkeeper X", "Shopkeeper Y"],
//     Delivery: ["Delivery Man 1", "Delivery Man 2", "Delivery Man 3"],
//   };

//   // --- Chat State ---
//   const [activeChat, setActiveChat] = useState({ group: "Customers", name: "May" });
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

//   // --- Notifications state ---
//   const [notifications, setNotifications] = useState([]);

//   // Example: simulate dynamic order notifications
//   useEffect(() => {
//     // This could come from WebSocket or API polling
//     const timer = setTimeout(() => {
//       const newNote = {
//         id: Date.now(),
//         type: "Order",
//         text: `Order #${Math.floor(Math.random() * 1000)} status updated`,
//         orderId: Math.floor(Math.random() * 1000),
//       };
//       setNotifications((prev) => [newNote, ...prev]);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [notifications]);

//   // --- Send Message ---
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

//   // --- Map order status to color ---
//   const statusColor = {
//     pending: "bg-gray-200 text-gray-800",
//     confirmed: "bg-blue-200 text-blue-800",
//     preparing: "bg-yellow-200 text-yellow-800",
//     ready: "bg-purple-200 text-purple-800",
//     delivering: "bg-orange-200 text-orange-800",
//     delivered: "bg-green-200 text-green-800",
//     cancelled: "bg-red-200 text-red-800",
//   };

//   return (
//     <header className="flex items-center justify-between py-3 px-4 shadow-sm bg-white w-full rounded-full relative">
//       {/* Search Bar */}
//       <div className="relative flex items-center w-full max-w-sm">
//         <Search className="absolute left-3 h-4 w-4 text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search dashboard..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="pl-9 pr-3 py-2 rounded-full bg-gray-100 text-sm border-none focus:ring-0 focus:outline-none w-full shadow-sm"
//         />
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-3">
//         {/* Messages */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowMessages(!showMessages);
//               setShowNotifications(false);
//               setShowProfile(false);
//             }}
//             className="border rounded-full p-1.5 border-[#B476FF] shadow-sm relative"
//           >
//             <MessageCircleMore className="w-4 h-4 text-[#B476FF]" />
//             <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white px-1 rounded-full">
//               {Object.values(chats).reduce((acc, c) => acc + c.length, 0)}
//             </span>
//           </button>

//           {showMessages && (
//             <div className="absolute right-0 mt-2 w-[600px] h-[420px] bg-white shadow-lg rounded-lg flex z-20">
//               {/* Left: Recipient list */}
//               <div className="w-1/3 border-r p-2 flex flex-col">
//                 <input
//                   type="text"
//                   placeholder="Search recipient..."
//                   value={recipientSearch}
//                   onChange={(e) => setRecipientSearch(e.target.value)}
//                   className="border rounded-md px-2 py-1 text-xs mb-2"
//                 />

//                 <div className="overflow-y-auto flex-1">
//                   {Object.keys(users).map((group) => (
//                     <div key={group} className="mb-2">
//                       <p className="text-xs font-bold text-gray-500 mb-1">{group}</p>
//                       {users[group]
//                         .filter((name) =>
//                           name.toLowerCase().includes(recipientSearch.toLowerCase())
//                         )
//                         .map((name) => (
//                           <button
//                             key={name}
//                             onClick={() => setActiveChat({ group, name })}
//                             className={`block w-full text-left px-2 py-1 rounded-md text-sm mb-1 ${
//                               activeChat.name === name
//                                 ? "bg-[#B476FF] text-white"
//                                 : "hover:bg-gray-100"
//                             }`}
//                           >
//                             {name}
//                           </button>
//                         ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Right: Chat window */}
//               <div className="w-2/3 flex flex-col">
//                 <div className="flex-1 p-3 overflow-y-auto space-y-2">
//                   {chats[activeChat.name]?.map((msg, i) => (
//                     <div
//                       key={i}
//                       className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
//                     >
//                       <div
//                         className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${
//                           msg.self
//                             ? "bg-[#B476FF] text-white"
//                             : "bg-gray-200 text-gray-800"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Input Box */}
//                 <div className="p-2 border-t flex gap-2">
//                   <input
//                     type="text"
//                     placeholder={`Message ${activeChat.name}...`}
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     className="flex-1 border rounded-md px-3 py-2 text-sm"
//                   />
//                   <button
//                     onClick={handleSendMessage}
//                     className="bg-[#B476FF] text-white px-3 rounded-md"
//                   >
//                     <Send className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Notifications */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowNotifications(!showNotifications);
//               setShowMessages(false);
//               setShowProfile(false);
//             }}
//             className="border rounded-full p-1.5 border-[#B476FF] shadow-sm relative"
//           >
//             <Bell className="w-4 h-4 text-[#B476FF]" />
//             <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white px-1 rounded-full">
//               {notifications.length}
//             </span>
//           </button>

//           {showNotifications && (
//             <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-2 z-20">
//               <h4 className="text-sm font-semibold text-gray-700 mb-2">
//                 Notifications
//               </h4>
//               <div className="max-h-48 overflow-y-auto">
//                 {notifications.map((note) => (
//                   <button
//                     key={note.id}
//                     onClick={() => onNotificationClick(note.orderId)}
//                     className="w-full text-left p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
//                   >
//                     <span className="text-xs font-semibold text-[#B476FF]">
//                       {note.type}:
//                     </span>
//                     <p className="text-xs text-gray-700">{note.text}</p>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Divider */}
//         <div className="w-[2px] h-8 bg-[#B476FF]"></div>

//         {/* Profile */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowProfile(!showProfile);
//               setShowMessages(false);
//               setShowNotifications(false);
//             }}
//             className="flex items-center"
//           >
//             <img
//               className="w-9 h-9 rounded-full"
//               src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//               alt="profile"
//             />
//             <div className="ml-2 text-left">
//               <p className="text-sm font-bold text-[#B476FF]">Su Su Khin</p>
//               <p className="text-xs font-semibold text-[#B476FF]">Admin</p>
//             </div>
//           </button>
//           {showProfile && (
//             <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-20">
//               <button className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-md">
//                 <Settings className="w-4 h-4 text-gray-600" /> Settings
//               </button>
//               <button className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-md text-red-600">
//                 <LogOut className="w-4 h-4" /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from "react";
import {
  Bell,
  LogOut,
  MessageCircleMore,
  Search,
  Send,
  Settings,
} from "lucide-react";

const Header = () => {
  const [search, setSearch] = useState("");
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // --- Users by group ---
  const users = {
    Customers: ["May", "Customer B", "Customer C"],
    Shopkeepers: ["Shopkeeper X", "Shopkeeper Y"],
    Delivery: ["Delivery Man 1", "Delivery Man 2", "Delivery Man 3"],
  };

  

  // --- Chat State ---
  const [activeChat, setActiveChat] = useState({ group: "Customers", name: "May" });
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

  // --- Send Message ---
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
  

  // --- Notifications ---
  const [notifications, setNotifications] = useState([
    { id: 1, type: "Order", text: "New order #101 received 🍔", orderId: 101, status: "pending" },
    { id: 2, type: "Order", text: "New order #102 received 🍕", orderId: 102, status: "pending" },
    { id: 3, type: "Payment", text: "Payment confirmed 💳", orderId: null },
    { id: 4, type: "Delivery", text: "Rider picked up order 🚴", orderId: 101, status: "delivering" },
  ]);

  // --- Handle notification click ---
  const handleNotificationClick = (note) => {
    if (note.orderId) {
      setCurrentOrder(note); // store order info
      setShowOrderModal(true); // show modal
    }
    setShowNotifications(false);
  };

  // --- Order Actions ---
  const handleOrderAction = (action) => {
    if (!currentOrder) return;
    // Update order status locally (simulate API)
    setNotifications((prev) =>
      prev.map((n) =>
        n.orderId === currentOrder.orderId
          ? { ...n, status: action, text: `Order #${n.orderId} ${action}` }
          : n
      )
    );
    setShowOrderModal(false);
  };

  return (
    <>
      <header className="flex items-center justify-between py-3 px-4 shadow-sm bg-white w-full rounded-full relative">
        {/* Search */}
        <div className="relative flex items-center w-full max-w-sm">
          <Search className="absolute left-3 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search dashboard..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 rounded-full bg-gray-100 text-sm border-none focus:ring-0 focus:outline-none w-full shadow-sm"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Messages */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
                setShowProfile(false);
              }}
              className="border rounded-full p-1.5 border-[#B476FF] shadow-sm relative"
            >
              <MessageCircleMore className="w-4 h-4 text-[#B476FF]" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white px-1 rounded-full">
                {Object.values(chats).reduce((acc, c) => acc + c.length, 0)}
              </span>
            </button>

            {showMessages && (
              <div className="absolute right-0 mt-2 w-[600px] h-[420px] bg-white shadow-lg rounded-lg flex z-20">
                {/* Left: Recipient list */}
                <div className="w-1/3 border-r p-2 flex flex-col">
                  <input
                    type="text"
                    placeholder="Search recipient..."
                    value={recipientSearch}
                    onChange={(e) => setRecipientSearch(e.target.value)}
                    className="border rounded-md px-2 py-1 text-xs mb-2"
                  />
                  <div className="overflow-y-auto flex-1">
                    {Object.keys(users).map((group) => (
                      <div key={group} className="mb-2">
                        <p className="text-xs font-bold text-gray-500 mb-1">{group}</p>
                        {users[group]
                          .filter((name) =>
                            name.toLowerCase().includes(recipientSearch.toLowerCase())
                          )
                          .map((name) => (
                            <button
                              key={name}
                              onClick={() => setActiveChat({ group, name })}
                              className={`block w-full text-left px-2 py-1 rounded-md text-sm mb-1 ${
                                activeChat.name === name
                                  ? "bg-[#B476FF] text-white"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              {name}
                            </button>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Chat window */}
                <div className="w-2/3 flex flex-col">
                  <div className="flex-1 p-3 overflow-y-auto space-y-2">
                    {chats[activeChat.name]?.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${
                            msg.self
                              ? "bg-[#B476FF] text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 border-t flex gap-2">
                    <input
                      type="text"
                      placeholder={`Message ${activeChat.name}...`}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 border rounded-md px-3 py-2 text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-[#B476FF] text-white px-3 rounded-md"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
<div className="relative">
  <button
    onClick={() => {
      setShowNotifications(!showNotifications);
      setShowMessages(false);
      setShowProfile(false);
    }}
    className="border rounded-full p-1.5 border-[#B476FF] shadow-sm relative"
  >
    <Bell className="w-4 h-4 text-[#B476FF]" />
    <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white px-1 rounded-full">
      {notifications.length}
    </span>
  </button>

  {showNotifications && (
    <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg p-3 z-20">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">
        Notifications
      </h4>
      <div className="max-h-96 overflow-y-auto space-y-2">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="border rounded-lg p-2 hover:bg-gray-50 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <div className="text-xs font-semibold text-[#B476FF]">
                {note.type}:
              </div>
              <p className="text-xs text-gray-700">{note.text}</p>
            </div>

            {note.type === "Order" && note.status === "pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleOrderAction(note.orderId, "confirmed")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleOrderAction(note.orderId, "rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-xs"
                >
                  Reject
                </button>
              </div>
            )}

            {note.status === "confirmed" && note.type === "Order" && (
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-xs">Assign Delivery:</span>
                <div className="flex gap-2 flex-wrap">
                  {users.Delivery.map((dm) => (
                    <button
                      key={dm}
                      onClick={() =>
                        handleOrderAction(note.orderId, "delivering", dm)
                      }
                      className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs"
                    >
                      {dm}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )}
</div>


          {/* Divider */}
          <div className="w-[2px] h-8 bg-[#B476FF]"></div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowMessages(false);
                setShowNotifications(false);
              }}
              className="flex items-center"
            >
              <img
                className="w-9 h-9 rounded-full"
                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="profile"
              />
              <div className="ml-2 text-left">
                <p className="text-sm font-bold text-[#B476FF]">Su Su Khin</p>
                <p className="text-xs font-semibold text-[#B476FF]">Admin</p>
              </div>
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-20">
                <button className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-md">
                  <Settings className="w-4 h-4 text-gray-600" /> Settings
                </button>
                <button className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 rounded-md text-red-600">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- Order Modal --- */}
      {showOrderModal && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-5 w-96 shadow-lg relative">
            <h3 className="font-semibold text-lg mb-4">
              Order #{currentOrder.orderId} Details
            </h3>
            <p className="mb-4">Status: {currentOrder.status}</p>

            <div className="flex gap-2">
              {currentOrder.status === "pending" && (
                <button
                  onClick={() => handleOrderAction("confirmed")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Confirm
                </button>
              )}
              {currentOrder.status === "confirmed" && (
                <button
                  onClick={() => handleOrderAction("ready")}
                  className="bg-purple-500 text-white px-3 py-1 rounded-md"
                >
                  Mark Ready
                </button>
              )}
              {currentOrder.status === "ready" && (
                <button
                  onClick={() => handleOrderAction("delivering")}
                  className="bg-orange-500 text-white px-3 py-1 rounded-md"
                >
                  Assign Delivery
                </button>
              )}
              <button
                onClick={() => setShowOrderModal(false)}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

