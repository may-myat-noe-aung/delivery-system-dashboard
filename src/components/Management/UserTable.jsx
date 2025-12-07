// import React, { useState, useEffect, useRef } from "react";
// import { Download, Search, Trash2 } from "lucide-react";
// import axios from "axios";

// export default function UserTable() {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeUser, setActiveUser] = useState(null);
//   const [passcodeModal, setPasscodeModal] = useState(false);
//   const [passcode, setPasscode] = useState("");
//   const passcodeInputRef = useRef(null);

//   const [actionLoading, setActionLoading] = useState({});
//   const [alerts, setAlerts] = useState([]);

//   // Fetch API every 500ms (live)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       axios
//         .get("http://38.60.244.108:3000/users")
//         .then((res) => setUsers(res.data))
//         .catch((err) => console.error("API Error:", err));
//     }, 500);
//     return () => clearInterval(interval);
//   }, []);

//   const splitDateTime = (datetime) => {
//     if (!datetime) return ["-", "-"];
//     const [date, time] = datetime.split(" ");
//     return [date, time.slice(0, 8)];
//   };

//   const filteredUsers = users.filter((user) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       user.name?.toLowerCase().includes(term) ||
//       user.id?.toLowerCase().includes(term) ||
//       user.email?.toLowerCase().includes(term) ||
//       user.phone?.toLowerCase().includes(term) ||
//       user.status?.toLowerCase().includes(term)
//     );
//   });

//   const openDetail = (user) => {
//     setActiveUser(user);
//     setModalOpen(true);
//   };

//   const openDeletePasscode = (user) => {
//     setActiveUser(user);
//     setPasscode("");
//     setPasscodeModal(true);
//     setTimeout(() => passcodeInputRef.current?.focus(), 100);
//   };

//   const doDelete = () => {
//     if (passcode === "123456") {
//       setActionLoading((prev) => ({ ...prev, [activeUser.id]: true }));
//       axios
//         .delete(`http://38.60.244.108:3000/users/${activeUser.id}`)
//         .then((res) => {
//           setUsers((prev) => prev.filter((u) => u.id !== activeUser.id));
//           setAlerts((prev) => [
//             ...prev,
//             res.data.message || "Deleted successfully",
//           ]);
//         })
//         .catch((err) =>
//           setAlerts((prev) => [
//             ...prev,
//             err.response?.data?.message || "Delete failed",
//           ])
//         )
//         .finally(() => {
//           setActionLoading((prev) => ({ ...prev, [activeUser.id]: false }));
//           setPasscodeModal(false);
//         });
//     } else {
//       setAlerts((prev) => [...prev, "Incorrect passcode"]);
//     }
//   };

//   const getPhoto = (photo) => photo || "https://via.placeholder.com/80";
//   const formatDateShort = (date) =>
//     date ? new Date(date).toLocaleString() : "-";
//   const getMapUrl = (location) =>
//     location
//       ? `https://maps.google.com?q=${encodeURIComponent(location)}&output=embed`
//       : null;

//   const toggleStatus = (user, newStatus) => {
//     setActionLoading((prev) => ({ ...prev, [user.id]: true }));
//     axios
//       .patch(`http://38.60.244.108:3000/users/status/${user.id}`, {
//         status: newStatus,
//       })
//       .then((res) => {
//         // Update local state
//         setUsers((prev) =>
//           prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
//         );
//         // Show API message in alerts
//         setAlerts((prev) => [...prev, res.data.message || "Status updated"]);
//       })
//       .catch((err) =>
//         setAlerts((prev) => [
//           ...prev,
//           err.response?.data?.message || "Failed to update status",
//         ])
//       )
//       .finally(() => {
//         setActionLoading((prev) => ({ ...prev, [user.id]: false }));
//       });
//   };

//   return (
//     <div>
//       {/* Alerts */}
//       <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
//         {alerts.map((msg, i) => (
//           <div
//             key={i}
//             className="bg-purple-100 text-purple-700 px-4 py-2 rounded shadow"
//           >
//             {msg}
//           </div>
//         ))}
//       </div>

//       {/* Search */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="relative flex items-center w-full max-w-sm">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
//           <input
//             type="text"
//             placeholder="Search Users"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm"
//           />
//         </div>

//         <button className="flex items-center gap-1.5 px-3 py-2 text-xs bg-white shadow-sm rounded-full">
//           <Download className="h-4 w-4" /> Export
//         </button>
//       </div>

//       {/* Table */}
//       <div className="rounded-xl shadow-sm overflow-x-auto bg-white">
//         <table className="min-w-full text-sm">
//           <thead className="bg-[#B476FF] text-white sticky top-0 z-10">
//             <tr>
//               {[
//                 "ID",
//                 "User Name",
//                 "Email",
//                 "Phone",
//                 "Status",
//                 "Date & Time",
//                 "Action",
//               ].map((col) => (
//                 <th key={col} className="p-3 text-left">
//                   {col}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {filteredUsers.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="text-center p-6 text-gray-500">
//                   No results found.
//                 </td>
//               </tr>
//             ) : (
//               filteredUsers.map((user) => (
//                 <tr
//                   key={user.id}
//                   className={`border-t ${
//                     user.status === "active"
//                       ? "bg-green-100"
//                       : user.status === "warning"
//                       ? "bg-red-100"
//                       : "bg-white"
//                   }`}
//                 >
//                   <td className="p-3">{user.id}</td>
//                   <td className="p-3 flex items-center gap-2">
//                     {user.photo ? (
//                       <img
//                         src={user.photo}
//                         alt={user.name}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-[#B476FF] flex items-center justify-center text-white font-semibold">
//                         {user.name?.charAt(0).toUpperCase() || "?"}
//                       </div>
//                     )}
//                     <div>{user.name}</div>
//                   </td>

//                   <td className="p-3">{user.email}</td>
//                   <td className="p-3">{user.phone}</td>
//                   <td className="px-4 py-2 space-x-1">
//                     <button
//                       onClick={() => toggleStatus(user, "active")}
//                       disabled={!!actionLoading[user.id]}
//                       className={`px-2 py-1 text-xs rounded ${
//                         user.status === "active"
//                           ? "bg-green-500 text-white"
//                           : "bg-green-200 text-green-800"
//                       }`}
//                     >
//                       Active
//                     </button>
//                     <button
//                       onClick={() => toggleStatus(user, "warning")}
//                       disabled={!!actionLoading[user.id]}
//                       className={`px-2 py-1 text-xs rounded ${
//                         user.status === "warning"
//                           ? "bg-red-500 text-white"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       Warning
//                     </button>
//                   </td>

//                   <td className="p-3">
//                     {splitDateTime(user.created_at)[0]} <br />
//                     {splitDateTime(user.created_at)[1]}
//                   </td>
//                   <td className="p-3 flex gap-2">
//                     <button
//                       className="px-3 py-1 rounded-full bg-[#B476FF] text-white text-xs"
//                       onClick={() => openDetail(user)}
//                     >
//                       Detail
//                     </button>
//                     <button
//                       className="px-3 py-1 rounded-full bg-red-500 text-white text-xs flex items-center gap-1"
//                       onClick={() => openDeletePasscode(user)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* USER DETAIL MODAL */}
//       {modalOpen && activeUser && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setModalOpen(false)}
//           />
//           <div className="relative bg-white rounded-2xl p-6 w-[min(800px,95%)] shadow-2xl border border-purple-200 max-h-[90vh] overflow-auto">
//             <div className="flex justify-between items-center">
//               <h3 className="text-xl font-bold bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
//                 User Details - {activeUser.id}
//               </h3>
//               <button
//                 className="text-gray-500 hover:text-black"
//                 onClick={() => setModalOpen(false)}
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="mt-4 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
//               <div className="flex flex-col items-center">
//                 {activeUser.photo ? (
//                   <img
//                     src={activeUser.photo}
//                     className="w-44 h-44 rounded-xl border shadow-md object-cover"
//                     alt={activeUser.name}
//                   />
//                 ) : (
//                   <div className="w-44 h-44 rounded-xl border shadow-md bg-[#B476FF] flex items-center justify-center text-white text-4xl font-bold">
//                     {activeUser.name
//                       ? activeUser.name
//                           .split(" ")
//                           .map((n) => n.charAt(0).toUpperCase())
//                           .join("")
//                       : "?"}
//                   </div>
//                 )}
//               </div>

//               <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm">
//                 {[
//                   ["Name", activeUser.name],
//                   ["Email", activeUser.email],
//                   ["Phone", activeUser.phone],
//                   ["Status", activeUser.status],
//                   ["Created At", formatDateShort(activeUser.created_at)],
//                   ["Location", activeUser.location || "-"],
//                 ].map(([label, value]) => (
//                   <div key={label}>
//                     <div className="font-semibold text-gray-600">{label}</div>
//                     <div className="text-gray-800">{value}</div>
//                   </div>
//                 ))}
//               </div>

//               <div className="col-span-3 mt-4">
//                 {activeUser.location && (
//                   <div className="col-span-2">
//                     <div className="font-semibold text-gray-600">
//                       Location Map
//                     </div>
//                     <iframe
//                       src={getMapUrl(activeUser.location)}
//                       className="w-full h-56 rounded-lg border mt-1"
//                       loading="lazy"
//                     ></iframe>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* PASSCODE MODAL */}
//       {passcodeModal && (
//         <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setPasscodeModal(false)}
//           />
//           <div className="relative bg-white rounded-xl p-6 w-[330px] shadow-2xl border border-purple-200">
//             <h3 className="text-lg font-bold text-center bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent mb-4">
//               Enter Passcode
//             </h3>
//             <input
//               ref={passcodeInputRef}
//               type="password"
//               className="border rounded-lg w-full px-3 py-2 mb-4 focus:ring-2 focus:ring-[#B476FF]"
//               placeholder="Passcode"
//               value={passcode}
//               onChange={(e) => setPasscode(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && doDelete()}
//             />
//             <div className="flex justify-between gap-2">
//               <button
//                 onClick={() => setPasscodeModal(false)}
//                 className="px-4 py-1.5 border rounded-lg hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={doDelete}
//                 className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { Download, Search, Trash2 } from "lucide-react";
// import axios from "axios";

// export default function UserTable() {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeUser, setActiveUser] = useState(null);
//   const [passcodeModal, setPasscodeModal] = useState(false);
//   const [passcode, setPasscode] = useState("");
//   const passcodeInputRef = useRef(null);

//   const [actionLoading, setActionLoading] = useState({});
//   const [alerts, setAlerts] = useState([]);

//   // ---------------- PAGINATION STATES ----------------
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Fetch API every 500ms (live)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       axios
//         .get("http://38.60.244.108:3000/users")
//         .then((res) => setUsers(res.data))
//         .catch((err) => console.error("API Error:", err));
//     }, 500);
//     return () => clearInterval(interval);
//   }, []);

//   const splitDateTime = (datetime) => {
//     if (!datetime) return ["-", "-"];
//     const [date, time] = datetime.split(" ");
//     return [date, time.slice(0, 8)];
//   };

//   const filteredUsers = users.filter((user) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       user.name?.toLowerCase().includes(term) ||
//       user.id?.toLowerCase().includes(term) ||
//       user.email?.toLowerCase().includes(term) ||
//       user.phone?.toLowerCase().includes(term) ||
//       user.status?.toLowerCase().includes(term)
//     );
//   });

//   // ---------------- PAGINATION LOGIC ----------------
//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedUsers = filteredUsers.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   // reset page when searching
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm]);

//   const openDetail = (user) => {
//     setActiveUser(user);
//     setModalOpen(true);
//   };

//   const openDeletePasscode = (user) => {
//     setActiveUser(user);
//     setPasscode("");
//     setPasscodeModal(true);
//     setTimeout(() => passcodeInputRef.current?.focus(), 100);
//   };

//   const doDelete = () => {
//     if (passcode === "123456") {
//       setActionLoading((prev) => ({ ...prev, [activeUser.id]: true }));
//       axios
//         .delete(`http://38.60.244.108:3000/users/${activeUser.id}`)
//         .then((res) => {
//           setUsers((prev) => prev.filter((u) => u.id !== activeUser.id));
//           setAlerts((prev) => [
//             ...prev,
//             res.data.message || "Deleted successfully",
//           ]);
//         })
//         .catch((err) =>
//           setAlerts((prev) => [
//             ...prev,
//             err.response?.data?.message || "Delete failed",
//           ])
//         )
//         .finally(() => {
//           setActionLoading((prev) => ({ ...prev, [activeUser.id]: false }));
//           setPasscodeModal(false);
//         });
//     } else {
//       setAlerts((prev) => [...prev, "Incorrect passcode"]);
//     }
//   };

//   const getPhoto = (photo) => photo || "https://via.placeholder.com/80";
//   const formatDateShort = (date) =>
//     date ? new Date(date).toLocaleString() : "-";
//   const getMapUrl = (location) =>
//     location
//       ? `https://maps.google.com?q=${encodeURIComponent(location)}&output=embed`
//       : null;

//   const toggleStatus = (user, newStatus) => {
//     setActionLoading((prev) => ({ ...prev, [user.id]: true }));
//     axios
//       .patch(`http://38.60.244.108:3000/users/status/${user.id}`, {
//         status: newStatus,
//       })
//       .then((res) => {
//         setUsers((prev) =>
//           prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
//         );
//         setAlerts((prev) => [...prev, res.data.message || "Status updated"]);
//       })
//       .catch((err) =>
//         setAlerts((prev) => [
//           ...prev,
//           err.response?.data?.message || "Failed to update status",
//         ])
//       )
//       .finally(() => {
//         setActionLoading((prev) => ({ ...prev, [user.id]: false }));
//       });
//   };

//   return (
//     <div>
//       {/* Alerts */}
//       <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
//         {alerts.map((msg, i) => (
//           <div
//             key={i}
//             className="bg-purple-100 text-purple-700 px-4 py-2 rounded shadow"
//           >
//             {msg}
//           </div>
//         ))}
//       </div>

//       {/* Search */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="relative flex items-center w-full max-w-sm">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
//           <input
//             type="text"
//             placeholder="Search Users"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm"
//           />
//         </div>

//         <button className="flex items-center gap-1.5 px-3 py-2 text-xs bg-white shadow-sm rounded-full">
//           <Download className="h-4 w-4" /> Export
//         </button>
//       </div>

//       {/* Table */}
//       <div className="rounded-xl shadow-sm overflow-x-auto bg-white">
//         <table className="min-w-full text-sm">
//           <thead className="bg-[#B476FF] text-white sticky top-0 z-10">
//             <tr>
//               {[
//                 "ID",
//                 "User Name",
//                 "Email",
//                 "Phone",
//                 "Status",
//                 "Date & Time",
//                 "Action",
//               ].map((col) => (
//                 <th key={col} className="p-3 text-left">
//                   {col}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedUsers.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="text-center p-6 text-gray-500">
//                   No results found.
//                 </td>
//               </tr>
//             ) : (
//               paginatedUsers.map((user) => (
//                 <tr
//                   key={user.id}
//                   className={`border-t ${
//                     user.status === "active"
//                       ? "bg-green-100"
//                       : user.status === "warning"
//                       ? "bg-red-100"
//                       : "bg-white"
//                   }`}
//                 >
//                   <td className="p-3">{user.id}</td>
//                   <td className="p-3 flex items-center gap-2">
//                     {user.photo ? (
//                       <img
//                         src={user.photo}
//                         alt={user.name}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-[#B476FF] flex items-center justify-center text-white font-semibold">
//                         {user.name?.charAt(0).toUpperCase() || "?"}
//                       </div>
//                     )}
//                     <div>{user.name}</div>
//                   </td>

//                   <td className="p-3">{user.email}</td>
//                   <td className="p-3">{user.phone}</td>
//                   <td className="px-4 py-2 space-x-1">
//                     <button
//                       onClick={() => toggleStatus(user, "active")}
//                       disabled={!!actionLoading[user.id]}
//                       className={`px-2 py-1 text-xs rounded ${
//                         user.status === "active"
//                           ? "bg-green-500 text-white"
//                           : "bg-green-200 text-green-800"
//                       }`}
//                     >
//                       Active
//                     </button>
//                     <button
//                       onClick={() => toggleStatus(user, "warning")}
//                       disabled={!!actionLoading[user.id]}
//                       className={`px-2 py-1 text-xs rounded ${
//                         user.status === "warning"
//                           ? "bg-red-500 text-white"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       Warning
//                     </button>
//                   </td>

//                   <td className="p-3">
//                     {splitDateTime(user.created_at)[0]} <br />
//                     {splitDateTime(user.created_at)[1]}
//                   </td>
//                   <td className="p-3 flex gap-2">
//                     <button
//                       className="px-3 py-1 rounded-full bg-[#B476FF] text-white text-xs"
//                       onClick={() => openDetail(user)}
//                     >
//                       Detail
//                     </button>
//                     <button
//                       className="px-3 py-1 rounded-full bg-red-500 text-white text-xs flex items-center gap-1"
//                       onClick={() => openDeletePasscode(user)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ---------------- PAGINATION UI ---------------- */}
//       <div className="flex justify-end items-center gap-2 mt-4">
//         {/* Prev */}
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((p) => p - 1)}
//           className={`px-3 py-1 rounded-lg shadow-sm border  ${
//             currentPage === 1
//               ? "opacity-40 cursor-not-allowed"
//               : "hover:bg-gray-100"
//           }`}
//         >
//           Prev
//         </button>

//         {/* Page Numbers */}
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <button
//             key={page}
//             onClick={() => setCurrentPage(page)}
//             className={`px-3 py-1 rounded-lg  border ${
//               currentPage === page
//                 ? "bg-[#B476FF] text-white"
//                 : "hover:bg-gray-100"
//             }`}
//           >
//             {page}
//           </button>
//         ))}

//         {/* Next */}
//         <button
//           disabled={currentPage === totalPages || totalPages === 0}
//           onClick={() => setCurrentPage((p) => p + 1)}
//           className={`px-3 py-1 rounded-lg shadow-sm border  ${
//             currentPage === totalPages || totalPages === 0
//               ? "opacity-40 cursor-not-allowed"
//               : "hover:bg-gray-100"
//           }`}
//         >
//           Next
//         </button>
//       </div>

//        {/* USER DETAIL MODAL */}
//       {modalOpen && activeUser && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setModalOpen(false)}
//           />
//           <div className="relative bg-white rounded-2xl p-6 w-[min(800px,95%)] shadow-2xl border border-purple-200 max-h-[90vh] overflow-auto">
//             <div className="flex justify-between items-center">
//               <h3 className="text-xl font-bold bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
//                 User Details - {activeUser.id}
//               </h3>
//               <button
//                 className="text-gray-500 hover:text-black"
//                 onClick={() => setModalOpen(false)}
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="mt-4 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
//               <div className="flex flex-col items-center">
//                 {activeUser.photo ? (
//                   <img
//                     src={activeUser.photo}
//                     className="w-44 h-44 rounded-xl border shadow-md object-cover"
//                     alt={activeUser.name}
//                   />
//                 ) : (
//                   <div className="w-44 h-44 rounded-xl border shadow-md bg-[#B476FF] flex items-center justify-center text-white text-4xl font-bold">
//                     {activeUser.name
//                       ? activeUser.name
//                           .split(" ")
//                           .map((n) => n.charAt(0).toUpperCase())
//                           .join("")
//                       : "?"}
//                   </div>
//                 )}
//               </div>

//               <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm">
//                 {[
//                   ["Name", activeUser.name],
//                   ["Email", activeUser.email],
//                   ["Phone", activeUser.phone],
//                   ["Status", activeUser.status],
//                   ["Created At", formatDateShort(activeUser.created_at)],
//                   ["Location", activeUser.location || "-"],
//                 ].map(([label, value]) => (
//                   <div key={label}>
//                     <div className="font-semibold text-gray-600">{label}</div>
//                     <div className="text-gray-800">{value}</div>
//                   </div>
//                 ))}
//               </div>

//               <div className="col-span-3 mt-4">
//                 {activeUser.location && (
//                   <div className="col-span-2">
//                     <div className="font-semibold text-gray-600">
//                       Location Map
//                     </div>
//                     <iframe
//                       src={getMapUrl(activeUser.location)}
//                       className="w-full h-56 rounded-lg border mt-1"
//                       loading="lazy"
//                     ></iframe>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* PASSCODE MODAL */}
//       {passcodeModal && (
//         <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setPasscodeModal(false)}
//           />
//           <div className="relative bg-white rounded-xl p-6 w-[330px] shadow-2xl border border-purple-200">
//             <h3 className="text-lg font-bold text-center bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent mb-4">
//               Enter Passcode
//             </h3>
//             <input
//               ref={passcodeInputRef}
//               type="password"
//               className="border rounded-lg w-full px-3 py-2 mb-4 focus:ring-2 focus:ring-[#B476FF]"
//               placeholder="Passcode"
//               value={passcode}
//               onChange={(e) => setPasscode(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && doDelete()}
//             />
//             <div className="flex justify-between gap-2">
//               <button
//                 onClick={() => setPasscodeModal(false)}
//                 className="px-4 py-1.5 border rounded-lg hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={doDelete}
//                 className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { Download, Search, Trash2 } from "lucide-react";
import axios from "axios";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const passcodeInputRef = useRef(null);

  const [actionLoading, setActionLoading] = useState({});
  const [alerts, setAlerts] = useState([]);

  // ---------------- PAGINATION STATES ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch API every 500ms (live)
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://38.60.244.108:3000/users")
        .then((res) => setUsers(res.data))
        .catch((err) => console.error("API Error:", err));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const splitDateTime = (datetime) => {
    if (!datetime) return ["-", "-"];
    const [date, time] = datetime.split(" ");
    return [date, time.slice(0, 8)];
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(term) ||
      user.id?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.phone?.toLowerCase().includes(term) ||
      user.status?.toLowerCase().includes(term)
    );
  });

  // ---------------- PAGINATION LOGIC ----------------
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const openDetail = (user) => {
    setActiveUser(user);
    setModalOpen(true);
  };

  const openDeletePasscode = (user) => {
    setActiveUser(user);
    setPasscode("");
    setPasscodeModal(true);
    setTimeout(() => passcodeInputRef.current?.focus(), 100);
  };

  const doDelete = () => {
    if (passcode === "123456") {
      setActionLoading((prev) => ({ ...prev, [activeUser.id]: true }));
      axios
        .delete(`http://38.60.244.108:3000/users/${activeUser.id}`)
        .then((res) => {
          setUsers((prev) => prev.filter((u) => u.id !== activeUser.id));
          setAlerts((prev) => [
            ...prev,
            res.data.message || "Deleted successfully",
          ]);
        })
        .catch((err) =>
          setAlerts((prev) => [
            ...prev,
            err.response?.data?.message || "Delete failed",
          ])
        )
        .finally(() => {
          setActionLoading((prev) => ({ ...prev, [activeUser.id]: false }));
          setPasscodeModal(false);
        });
    } else {
      setAlerts((prev) => [...prev, "Incorrect passcode"]);
    }
  };

  const getPhoto = (photo) => photo || "https://via.placeholder.com/80";
  const formatDateShort = (date) =>
    date ? new Date(date).toLocaleString() : "-";
  const getMapUrl = (location) =>
    location
      ? `https://maps.google.com?q=${encodeURIComponent(location)}&output=embed`
      : null;

  const toggleStatus = (user, newStatus) => {
    setActionLoading((prev) => ({ ...prev, [user.id]: true }));
    axios
      .patch(`http://38.60.244.108:3000/users/status/${user.id}`, {
        status: newStatus,
      })
      .then((res) => {
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
        );
        setAlerts((prev) => [...prev, res.data.message || "Status updated"]);
      })
      .catch((err) =>
        setAlerts((prev) => [
          ...prev,
          err.response?.data?.message || "Failed to update status",
        ])
      )
      .finally(() => {
        setActionLoading((prev) => ({ ...prev, [user.id]: false }));
      });
  };

  return (
    <div className="pt-4 ">
      {/* Alerts */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {alerts.map((msg, i) => (
          <div
            key={i}
            className="bg-purple-100 text-purple-700 px-4 py-2 rounded shadow text-sm md:text-base"
          >
            {msg}
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <div className="relative flex items-center w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
          <input
            type="text"
            placeholder="Search Users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm"
          />
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 text-xs bg-white shadow-sm rounded-full">
          <Download className="h-4 w-4" /> Export
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl shadow-sm overflow-x-auto bg-white">
        <table className="min-w-full text-sm md:text-base">
          <thead className="bg-[#B476FF] text-white sticky top-0 z-10 ">
            <tr>
              {[
                "ID",
                "User Name",
                "Email",
                "Phone",
                "Status",
                "Date & Time",
                "Action",
              ].map((col) => (
                <th
                  key={col}
                  className="p-2 md:p-3 text-center text-xs md:text-sm"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center p-4 md:p-6 text-gray-500 text-xs md:text-sm"
                >
                  No results found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className={`border-t ${
                    user.status === "active"
                      ? "bg-green-100"
                      : user.status === "warning"
                      ? "bg-red-100"
                      : "bg-white"
                  }`}
                >
                  <td className="p-1 text-center md:p-3">{user.id}</td>
                  <td className="p-1 text-center md:p-3">
                    <div className="p-1 text-center md:p-3 flex items-center gap-2">
                      {user.photo ? (
                        <img
                          src={user.photo}
                          alt={user.name}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#B476FF] flex items-center justify-center text-white font-semibold text-xs md:text-sm">
                          {user.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                      )}
                    <div className="text-xs md:text-sm">{user.name}</div>
                    </div>
                  </td>

                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">
                    {user.email}
                  </td>
                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">
                    {user.phone}
                  </td>
                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">
                    <div className="flex items-center justify-center gap-2 md:flex-col 2xl:flex-row">
                      <button
                        onClick={() => toggleStatus(user, "active")}
                        disabled={!!actionLoading[user.id]}
                        className={`w-[80px] py-1 text-xs md:text-sm rounded ${
                          user.status === "active"
                            ? "bg-green-500 text-white"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => toggleStatus(user, "warning")}
                        disabled={!!actionLoading[user.id]}
                        className={`w-[80px] py-1 text-xs md:text-sm rounded ${
                          user.status === "warning"
                            ? "bg-red-500 text-white"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        Warning
                      </button>
                    </div>
                  </td>

                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">
                    {splitDateTime(user.created_at)[0]} <br />
                    {splitDateTime(user.created_at)[1]}
                  </td>
                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">
                    <div className="flex items-center justify-center gap-2 md:flex-col 2xl:flex-row">
                      <button
                        className="w-[80px] py-1 rounded bg-[#B476FF] text-white text-xs sm:text-sm"
                        onClick={() => openDetail(user)}
                      >
                        Detail
                      </button>
                      <button
                        className="w-[80px] py-1 rounded bg-red-500 text-white text-xs sm:text-sm flex items-center gap-1 justify-center"
                        onClick={() => openDeletePasscode(user)}
                      >
                        {/* <Trash2 className="h-3 w-3 md:h-4 md:w-4" /> */}
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------- PAGINATION UI ---------------- */}
      <div className="flex flex-col md:flex-row justify-end items-center gap-2 mt-4">
        <div className="flex gap-2">
          {/* Prev */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-3 py-1 rounded-lg shadow-sm border text-xs md:text-sm ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-lg border text-xs md:text-sm ${
                currentPage === page
                  ? "bg-[#B476FF] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-3 py-1 rounded-lg shadow-sm border text-xs md:text-sm ${
              currentPage === totalPages || totalPages === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* USER DETAIL MODAL */}
      {modalOpen && activeUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-2 md:p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl p-4 md:p-6 w-full max-w-[800px] shadow-2xl border border-purple-200 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
                User Details - {activeUser.id}
              </h3>
              <button
                className="text-gray-500 hover:text-black"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
              <div className="flex flex-col items-center">
                {activeUser.photo ? (
                  <img
                    src={activeUser.photo}
                    className="w-36 h-36 md:w-44 md:h-44 rounded-xl border shadow-md object-cover"
                    alt={activeUser.name}
                  />
                ) : (
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-xl border shadow-md bg-[#B476FF] flex items-center justify-center text-white text-3xl md:text-4xl font-bold">
                    {activeUser.name
                      ? activeUser.name
                          .split(" ")
                          .map((n) => n.charAt(0).toUpperCase())
                          .join("")
                      : "?"}
                  </div>
                )}
              </div>

              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                {[
                  ["Name", activeUser.name],
                  ["Email", activeUser.email],
                  ["Phone", activeUser.phone],
                  ["Status", activeUser.status],
                  ["Created At", formatDateShort(activeUser.created_at)],
                  ["Location", activeUser.location || "-"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="font-semibold text-gray-600">{label}</div>
                    <div className="text-gray-800">{value}</div>
                  </div>
                ))}
              </div>

              <div className="col-span-3 mt-4">
                {activeUser.location && (
                  <div className="col-span-2">
                    <div className="font-semibold text-gray-600">
                      Location Map
                    </div>
                    <iframe
                      src={getMapUrl(activeUser.location)}
                      className="w-full h-56 rounded-lg border mt-1"
                      loading="lazy"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PASSCODE MODAL */}
      {passcodeModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm p-2">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setPasscodeModal(false)}
          />
          <div className="relative bg-white rounded-xl p-4 md:p-6 w-full max-w-[330px] shadow-2xl border border-purple-200">
            <h3 className="text-lg font-bold text-center bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent mb-4">
              Enter Passcode
            </h3>
            <input
              ref={passcodeInputRef}
              type="password"
              className="border rounded-lg w-full px-3 py-2 mb-4 focus:ring-2 focus:ring-[#B476FF]"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doDelete()}
            />
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <button
                onClick={() => setPasscodeModal(false)}
                className="px-4 py-1.5 border rounded-lg hover:bg-gray-100 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={doDelete}
                className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90 w-full sm:w-auto"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
