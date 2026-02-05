// import React, { useEffect, useMemo, useState, useRef } from "react";
// import axios from "axios";
// import { Search } from "lucide-react";

// function formatDateShort(dtString) {
//   if (!dtString) return "-";
//   const d = new Date(dtString.replace(" ", "T"));
//   if (isNaN(d)) return dtString;
//   return d.toLocaleString();
// }

// export default function PendingShopsFull() {
//   // --- STATES ---
//   const [shops, setShops] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [query, setQuery] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   const [page, setPage] = useState(1);
//   const pageSize = 5;

//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeShop, setActiveShop] = useState(null);

//   const [actionLoading, setActionLoading] = useState({});
//   const [passcodeModal, setPasscodeModal] = useState(false);
//   const [passcode, setPasscode] = useState("");
//   const [actionType, setActionType] = useState(null);
//   const [actionId, setActionId] = useState(null);

//   const passcodeInputRef = useRef(null);

//   // --- FETCH PENDING SHOPS ---
//   useEffect(() => {
//     fetchPendingShops();
//     const interval = setInterval(fetchPendingShops, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchPendingShops = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://38.60.244.108:3000/shops-pending");
//       setShops(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       window.apiAlert("Fetch Error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- NEW: Extract coordinates from "Lag x, Log y"
//   const getCoordinates = (loc) => {
//     if (!loc) return null;
//     const match = loc.match(/Lag\s*([0-9.\-]+),\s*Log\s*([0-9.\-]+)/i);
//     if (!match) return null;
//     return { lat: match[1], lng: match[2] };
//   };

//   const getMapUrl = (loc) => {
//     const c = getCoordinates(loc);
//     if (!c) return null;
//     return `https://maps.google.com/maps?q=${c.lat},${c.lng}&z=15&output=embed`;
//   };

//   // --- FILTERED & PAGINATION ---
//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     const from = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
//     const to = dateTo ? new Date(dateTo + "T23:59:59") : null;

//     return shops.filter((s) => {
//       if (s.permission !== "pending") return false;

//       if (from || to) {
//         const created = new Date(s.created_at.replace(" ", "T"));
//         if (from && created < from) return false;
//         if (to && created > to) return false;
//       }

//       if (!q) return true;

//       const text =
//         `${s.id} ${s.shopkeeper_name} ${s.shop_name} ${s.email}`.toLowerCase();
//       return text.includes(q);
//     });
//   }, [shops, query, dateFrom, dateTo]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
//   const paginated = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [filtered, page]);

//   const windowPagination = () => {
//     const pages = [];
//     const windowSize = 5;
//     let start = Math.max(1, page - 2);
//     let end = Math.min(totalPages, start + windowSize - 1);
//     if (end - start < windowSize - 1) {
//       start = Math.max(1, end - windowSize + 1);
//     }
//     for (let i = start; i <= end; i++) pages.push(i);
//     return pages;
//   };

//   // --- PASSCODE MODAL HANDLERS ---
//   const openPasscode = (id, type) => {
//     setActionId(id);
//     setActionType(type);
//     setPasscode("");
//     setPasscodeModal(true);
//   };

//   useEffect(() => {
//     if (passcodeModal && passcodeInputRef.current) {
//       passcodeInputRef.current.focus();
//     }
//   }, [passcodeModal]);

//   const handlePasscodeKey = (e) => {
//     if (e.key === "Enter") {
//       doAction();
//     }
//   };

//   // --- ACCEPT / REJECT ACTION ---
//   const doAction = async () => {
//     if (passcode !== "123456") {
//       window.apiAlert("Incorrect Passcode");
//       return;
//     }

//     setPasscodeModal(false);
//     setModalOpen(false);
//     setActiveShop(null);

//     const url = `http://38.60.244.108:3000/shops/${actionType}/${actionId}`;
//     setActionLoading((p) => ({ ...p, [actionId]: true }));

//     try {
//       const res = await axios.patch(url);

//       setShops((prev) => prev.filter((s) => s.id !== actionId));

//       const message =
//         res?.data?.message ||
//         (actionType === "approve"
//           ? "Successfully Accepted!"
//           : "Successfully Rejected!");

//       window.apiAlert(message);
//     } catch (err) {
//       window.apiAlert("Action Failed");
//     } finally {
//       setActionLoading((p) => ({ ...p, [actionId]: false }));
//     }
//   };

//   return (
//     <div className="mt-4 border border-gray-200 rounded-2xl p-4 mb-6">
//       <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
//         Confirm Shops
//       </h2>

//       {/* Filters */}
//       <div className="flex items-center justify-between mb-4">
//         {/* <input
//           className="border rounded-xl px-4 py-2 w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B476FF] placeholder:text-gray-400"
//           placeholder="🔍 Search shops..."
//           value={query}
//           onChange={(e) => {
//             setQuery(e.target.value);
//             setPage(1);
//           }}
//         /> */}

//         <div className="relative flex items-center w-full max-w-sm">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
//           <input
//             type="text"
//             placeholder="Search Shops..."
//             value={query}
//             onChange={(e) => {
//               setQuery(e.target.value);
//               setPage(1);
//             }}
//             className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm"
//           />
//         </div>
//         <div className="flex items-center justify-center gap-4">
//           <input
//             type="date"
//             className="border rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B476FF]"
//             value={dateFrom}
//             onChange={(e) => {
//               setDateFrom(e.target.value);
//               setPage(1);
//             }}
//           />
//           <input
//             type="date"
//             className="border rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B476FF]"
//             value={dateTo}
//             onChange={(e) => {
//               setDateTo(e.target.value);
//               setPage(1);
//             }}
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg shadow-sm border border-purple-100 bg-white">
//         <table className="w-full text-sm">
//           <thead className="bg-gradient-to-r from-[#B476FF] to-purple-600 text-white">
//             <tr>
//               {[
//                 "ID",
//                 "Photo",
//                 "Shopkeeper",
//                 "Shop",
//                 "Email",
//                 "Phone",
//                 "Items",
//                 "Address",
//                 "Created",
//                 "Actions",
//               ].map((h) => (
//                 <th key={h} className="p-3 font-semibold">
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="11" className="p-6 text-center">
//                   Loading...
//                 </td>
//               </tr>
//             ) : paginated.length === 0 ? (
//               <tr>
//                 <td colSpan="11" className="p-6 text-center">
//                   No pending shops.
//                 </td>
//               </tr>
//             ) : (
//               paginated.map((s) => (
//                 <tr
//                   key={s.id}
//                   className="border-b hover:bg-purple-50 transition"
//                 >
//                   <td
//                     className="p-3 text-[#B476FF] underline cursor-pointer font-semibold"
//                     onClick={() => {
//                       setActiveShop(s);
//                       setModalOpen(true);
//                     }}
//                   >
//                     {s.id}
//                   </td>

//                   {/* Updated Photo */}
//                   <td className="p-3 text-center">
//                     {s.photo ? (
//                       <img
//                         src={`http://38.60.244.108:3000/shop-uploads/${s.photo}`}
//                         alt={s.shop_name}
//                         className="size-10 object-cover rounded-full mx-auto"
//                       />
//                     ) : (
//                       <div className="size-10 rounded-full bg-[#B476FF] flex items-center justify-center text-white font-semibold mx-auto">
//                         {s.shop_name?.charAt(0).toUpperCase() || "?"}
//                       </div>
//                     )}
//                   </td>

//                   <td className="p-3 text-center">{s.shopkeeper_name}</td>
//                   <td className="p-3 text-center">{s.shop_name}</td>
//                   <td className="p-3 text-center">{s.email}</td>
//                   <td className="p-3 text-center">{s.phone}</td>
//                   <td className="p-3 text-center">{s.items}</td>
//                   <td className="p-3 text-center">{s.address}</td>
//                   <td className="p-3 text-center">
//                     {formatDateShort(s.created_at)}
//                   </td>

//                   <td className="p-3 text-center flex gap-2 justify-center">
//                     <button
//                       onClick={() => openPasscode(s.id, "reject")}
//                       disabled={!!actionLoading[s.id]}
//                       className="px-4 py-1.5 text-white rounded-xl shadow bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 disabled:opacity-40"
//                     >
//                       {actionLoading[s.id] ? "..." : "Reject"}
//                     </button>
//                     <button
//                       onClick={() => openPasscode(s.id, "approve")}
//                       disabled={!!actionLoading[s.id]}
//                       className="px-4 py-1.5 text-white rounded-xl shadow bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 disabled:opacity-40"
//                     >
//                       {actionLoading[s.id] ? "..." : "Accept"}
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex gap-2 justify-end mt-5">
//         <button
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//           className="px-3 py-1 border rounded-lg shadow-sm hover:bg-purple-100 disabled:opacity-50"
//         >
//           Prev
//         </button>
//         {windowPagination().map((p) => (
//           <button
//             key={p}
//             onClick={() => setPage(p)}
//             className={`px-3 py-1 border rounded-lg shadow-sm ${
//               p === page ? "bg-[#B476FF] text-white" : "hover:bg-purple-100"
//             }`}
//           >
//             {p}
//           </button>
//         ))}
//         <button
//           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//           disabled={page === totalPages}
//           className="px-3 py-1 border rounded-lg shadow-sm hover:bg-purple-100 disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>

//       {/* PASSCODE MODAL */}
//       {passcodeModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
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
//               onKeyDown={handlePasscodeKey}
//             />
//             <div className="flex justify-between gap-2">
//               <button
//                 onClick={() => setPasscodeModal(false)}
//                 className="px-4 py-1.5 border rounded-lg hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={doAction}
//                 className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* SHOP DETAIL MODAL */}
//       {modalOpen && activeShop && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setModalOpen(false)}
//           />
//           <div className="relative bg-white rounded-2xl p-6 w-[min(800px,95%)] shadow-2xl border border-purple-200 max-h-[90vh] overflow-auto">
//             <div className="flex justify-between items-center">
//               <h3 className="text-xl font-bold bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
//                 Shop Details - {activeShop.id}
//               </h3>
//               <button
//                 className="text-gray-500 hover:text-black"
//                 onClick={() => setModalOpen(false)}
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="mt-4 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
//               {/* Updated Modal Photo */}
//               <div className="flex flex-col items-center">
//                 {activeShop.photo ? (
//                   <img
//                     src={`http://38.60.244.108:3000/shop-uploads/${activeShop.photo}`}
//                     alt={activeShop.shop_name}
//                     className="w-44 h-44 object-cover rounded-xl border shadow-md"
//                   />
//                 ) : (
//                   <div className="w-44 h-44 rounded-xl border shadow-md bg-[#B476FF] flex items-center justify-center text-white text-4xl font-bold">
//                     {activeShop.shop_name?.charAt(0).toUpperCase() || "?"}
//                   </div>
//                 )}
//               </div>

//               <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm">
//                 {[
//                   ["Shopkeeper", activeShop.shopkeeper_name],
//                   ["Email", activeShop.email],
//                   ["Phone", activeShop.phone],
//                   ["Items", activeShop.items],
//                   ["Status", activeShop.status],
//                   ["Permission", activeShop.permission],
//                   ["Created At", formatDateShort(activeShop.created_at)],
//                   ["Address", activeShop.address],
//                 ].map(([label, value]) => (
//                   <div key={label}>
//                     <div className="font-semibold text-gray-600">{label}</div>
//                     <div className="text-gray-800">{value}</div>
//                   </div>
//                 ))}
//               </div>

//               {/* Location Map */}
//               <div className="col-span-3">
//                 <div className="font-semibold text-gray-600">Location Map</div>
//                 {getMapUrl(activeShop.location) ? (
//                   <iframe
//                     src={getMapUrl(activeShop.location)}
//                     className="w-full h-56 rounded-lg border mt-1"
//                     loading="lazy"
//                   ></iframe>
//                 ) : (
//                   <div className="text-gray-800">-</div>
//                 )}
//               </div>
//             </div>

//             <div className="mt-6 flex gap-2 justify-end">
//               <button
//                 onClick={() => openPasscode(activeShop.id, "reject")}
//                 disabled={!!actionLoading[activeShop.id]}
//                 className="px-4 py-2 text-white rounded-xl shadow bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 disabled:opacity-40"
//               >
//                 {actionLoading[activeShop.id] ? "..." : "Reject"}
//               </button>
//               <button
//                 onClick={() => openPasscode(activeShop.id, "approve")}
//                 disabled={!!actionLoading[activeShop.id]}
//                 className="px-4 py-2 text-white rounded-xl shadow bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 disabled:opacity-40"
//               >
//                 {actionLoading[activeShop.id] ? "..." : "Accept"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useMemo, useState, useRef } from "react";
// import axios from "axios";
// import { Search } from "lucide-react";

// function formatDateShort(dtString) {
//   if (!dtString) return "-";
//   const d = new Date(dtString.replace(" ", "T"));
//   if (isNaN(d)) return dtString;
//   return d.toLocaleString();
// }

// const splitDateTime = (datetime) => {
//   if (!datetime) return ["-", "-"];
//   const [date, time] = datetime.split(" ");
//   return [date, time.slice(0, 8)];
// };

// export default function PendingShopsFull() {
//   // --- STATES ---
//   const [shops, setShops] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [query, setQuery] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   const [page, setPage] = useState(1);
//   const pageSize = 5;

//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeShop, setActiveShop] = useState(null);

//   const [actionLoading, setActionLoading] = useState({});
//   const [passcodeModal, setPasscodeModal] = useState(false);
//   const [passcode, setPasscode] = useState("");
//   const [actionType, setActionType] = useState(null);
//   const [actionId, setActionId] = useState(null);

//   const passcodeInputRef = useRef(null);

//   // FETCH SHOPS
//   useEffect(() => {
//     fetchPendingShops();
//     const interval = setInterval(fetchPendingShops, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchPendingShops = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://38.60.244.108:3000/shops-pending");
//       setShops(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       window.apiAlert("Fetch Error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // FILTER AND PAGINATION
//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     const from = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
//     const to = dateTo ? new Date(dateTo + "T23:59:59") : null;

//     return shops.filter((s) => {
//       if (s.permission !== "pending") return false;

//       if (from || to) {
//         const created = new Date(s.created_at.replace(" ", "T"));
//         if (from && created < from) return false;
//         if (to && created > to) return false;
//       }

//       if (!q) return true;

//       const text =
//         `${s.id} ${s.shopkeeper_name} ${s.shop_name} ${s.email}`.toLowerCase();
//       return text.includes(q);
//     });
//   }, [shops, query, dateFrom, dateTo]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

//   const paginated = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [filtered, page]);

//   const windowPagination = () => {
//     const pages = [];
//     const windowSize = 5;
//     let start = Math.max(1, page - 2);
//     let end = Math.min(totalPages, start + windowSize - 1);
//     if (end - start < windowSize - 1) {
//       start = Math.max(1, end - windowSize + 1);
//     }
//     for (let i = start; i <= end; i++) pages.push(i);
//     return pages;
//   };

//   // PASSCODE FLOW
//   const openPasscode = (id, type) => {
//     setActionId(id);
//     setActionType(type);
//     setPasscode("");
//     setPasscodeModal(true);
//       setModalOpen(false);     // <-- close detail popup
//   setActiveShop(null);
//   };

//   useEffect(() => {
//     if (passcodeModal && passcodeInputRef.current) {
//       passcodeInputRef.current.focus();
//     }
//   }, [passcodeModal]);

//   const handlePasscodeKey = (e) => {
//     if (e.key === "Enter") doAction();
//   };

//   const doAction = async () => {
//     if (passcode !== "123456") {
//       window.apiAlert("Incorrect Passcode");
//       return;
//     }

//     setPasscodeModal(false);
//     setModalOpen(false);
//     setActiveShop(null);

//     const url = `http://38.60.244.108:3000/shops/${actionType}/${actionId}`;
//     setActionLoading((p) => ({ ...p, [actionId]: true }));

//     try {
//       const res = await axios.patch(url);

//       setShops((prev) => prev.filter((s) => s.id !== actionId));

//       const message =
//         res?.data?.message ||
//         (actionType === "approve"
//           ? "Successfully Accepted!"
//           : "Successfully Rejected!");

//       window.apiAlert(message);
//     } catch (err) {
//       window.apiAlert("Action Failed");
//     } finally {
//       setActionLoading((p) => ({ ...p, [actionId]: false }));
//     }
//   };

//   return (
//     <div className="mt-4 border border-gray-200 rounded-2xl p-4 mb-6">
//       <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
//         Confirm Shops
//       </h2>

//       {/* SEARCH + DATE FILTER */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="relative flex items-center w-full max-w-sm">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
//           <input
//             type="text"
//             placeholder="Search Shops..."
//             value={query}
//             onChange={(e) => {
//               setQuery(e.target.value);
//               setPage(1);
//             }}
//             className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm"
//           />
//         </div>

//         <div className="flex items-center justify-center gap-4">
//           <input
//             type="date"
//             className="border rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B476FF]"
//             value={dateFrom}
//             onChange={(e) => {
//               setDateFrom(e.target.value);
//               setPage(1);
//             }}
//           />
//           <input
//             type="date"
//             className="border rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B476FF]"
//             value={dateTo}
//             onChange={(e) => {
//               setDateTo(e.target.value);
//               setPage(1);
//             }}
//           />
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto rounded-lg shadow-sm border border-purple-100 bg-white">
//         <table className="w-full text-sm">
//           <thead className="bg-gradient-to-r bg-[#B476FF] text-white">
//             <tr>
//               {[
//                 "ID",
//                 "Shopkeeper Name",
//                 "Shop Name",
//                 "Email",
//                 "Phone",
//                 "Items",
//                 "Address",
//                 "	Date & Time",
//                 "Actions",
//               ].map((h) => (
//                 <th key={h} className="p-3 font-semibold">
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {paginated.length === 0 ? (
//               <tr>
//                 <td colSpan="11" className="p-6 text-center">
//                   No pending shops.
//                 </td>
//               </tr>
//             ) : (
//               paginated.map((s) => (
//                 <tr
//                   key={s.id}
//                   className="border-b hover:bg-purple-50 transition"
//                 >
//                   <td className="p-3 ">
//                     {s.id}
//                   </td>

//                   {/* PHOTO */}
//                   <td
//                     className="p-3 flex items-center gap-2 cursor-pointer "
//                     onClick={() => {
//                       setActiveShop(s);
//                       setModalOpen(true);
//                     }}
//                   >
//                     {s.photo ? (
//                       <img
//                         src={`http://38.60.244.108:3000/shop-uploads/${s.photo}`}
//                         alt={s.shop_name}
//                         className="size-10 object-cover rounded-full "
//                       />
//                     ) : (
//                       <div className="size-10 rounded-full bg-[#B476FF] flex items-center justify-center text-white font-semibold mx-auto">
//                         {s.shop_name?.charAt(0).toUpperCase() || "?"}
//                       </div>
//                     )}

//                     <div className="text-[#B476FF]  font-semibold underline">{s.shopkeeper_name}</div>
//                   </td>

//                   <td className="p-3 text-center">{s.shop_name}</td>
//                   <td className="p-3 text-center">{s.email}</td>
//                   <td className="p-3 text-center">{s.phone}</td>
//                   <td className="p-3 text-center">{s.items}</td>
//                   <td className="p-3 text-center">{s.address}</td>
//                   <td className="p-3 text-center">
//                     {splitDateTime(s.created_at)[0]} <br />
//                     {splitDateTime(s.created_at)[1]}
//                   </td>

//                   <td className="p-3 text-center">
//                     <div className=" flex gap-2 justify-center items-center">
//                       <button
//                         onClick={() => openPasscode(s.id, "reject")}
//                         disabled={!!actionLoading[s.id]}
//                         className="px-4 py-1.5 text-white rounded-xl shadow bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 disabled:opacity-40"
//                       >
//                         {actionLoading[s.id] ? "..." : "Reject"}
//                       </button>
//                       <button
//                         onClick={() => openPasscode(s.id, "approve")}
//                         disabled={!!actionLoading[s.id]}
//                         className="px-4 py-1.5 text-white rounded-xl shadow bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 disabled:opacity-40"
//                       >
//                         {actionLoading[s.id] ? "..." : "Accept"}
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex gap-2 justify-end mt-5">
//         <button
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//           className="px-3 py-1 border rounded-lg shadow-sm hover:bg-purple-100 disabled:opacity-50"
//         >
//           Prev
//         </button>

//         {windowPagination().map((p) => (
//           <button
//             key={p}
//             onClick={() => setPage(p)}
//             className={`px-3 py-1 border rounded-lg shadow-sm ${
//               p === page ? "bg-[#B476FF] text-white" : "hover:bg-purple-100"
//             }`}
//           >
//             {p}
//           </button>
//         ))}

//         <button
//           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//           disabled={page === totalPages}
//           className="px-3 py-1 border rounded-lg shadow-sm hover:bg-purple-100 disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>

//       {/* PASSCODE MODAL (unchanged) */}
//       {passcodeModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
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
//               onKeyDown={handlePasscodeKey}
//             />
//             <div className="flex justify-between gap-2">
//               <button
//                 onClick={() => setPasscodeModal(false)}
//                 className="px-4 py-1.5 border rounded-lg hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={doAction}
//                 className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* SHOP DETAILS MODAL (unchanged) */}
//       {modalOpen && activeShop && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setModalOpen(false)}
//           />
//           <div className="relative bg-white rounded-2xl p-6 w-[min(800px,95%)] shadow-2xl border border-purple-200 max-h-[90vh] overflow-auto">
//             <div className="flex justify-between items-center">
//               <h3 className="text-xl font-bold bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
//                 Shop Details - {activeShop.id}
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
//                 {activeShop.photo ? (
//                   <img
//                     src={`http://38.60.244.108:3000/shop-uploads/${activeShop.photo}`}
//                     alt={activeShop.shop_name}
//                     className="w-44 h-44 object-cover rounded-xl border shadow-md"
//                   />
//                 ) : (
//                   <div className="w-44 h-44 rounded-xl border shadow-md bg-[#B476FF] flex items-center justify-center text-white text-4xl font-bold">
//                     {activeShop.shop_name?.charAt(0).toUpperCase() || "?"}
//                   </div>
//                 )}
//               </div>

//               <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm">
//                 {[
//                   ["Shopkeeper", activeShop.shopkeeper_name],
//                   ["Email", activeShop.email],
//                   ["Phone", activeShop.phone],
//                   ["Items", activeShop.items],
//                   ["Status", activeShop.status],
//                   ["Permission", activeShop.permission],
//                   ["Created At", formatDateShort(activeShop.created_at)],
//                   ["Address", activeShop.address],
//                 ].map(([label, value]) => (
//                   <div key={label}>
//                     <div className="font-semibold text-gray-600">{label}</div>
//                     <div className="text-gray-800">{value}</div>
//                   </div>
//                 ))}
//               </div>

//               <div className="col-span-3">
//                 <div className="font-semibold text-gray-600">Location Map</div>
//                 <div className="text-gray-800">-</div>
//               </div>
//             </div>

//             <div className="mt-6 flex gap-2 justify-end">
//               <button
//                 onClick={() => openPasscode(activeShop.id, "reject")}
//                 disabled={!!actionLoading[activeShop.id]}
//                 className="px-4 py-2 text-white rounded-xl shadow bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 disabled:opacity-40"
//               >
//                 {actionLoading[activeShop.id] ? "..." : "Reject"}
//               </button>
//               <button
//                 onClick={() => openPasscode(activeShop.id, "approve")}
//                 disabled={!!actionLoading[activeShop.id]}
//                 className="px-4 py-2 text-white rounded-xl shadow bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 disabled:opacity-40"
//               >
//                 {actionLoading[activeShop.id] ? "..." : "Accept"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import { Search } from "lucide-react";

function formatDateShort(dtString) {
  if (!dtString) return "-";
  const d = new Date(dtString.replace(" ", "T"));
  if (isNaN(d)) return dtString;
  return d.toLocaleString();
}

const splitDateTime = (datetime) => {
  if (!datetime) return ["-", "-"];
  const [date, time] = datetime.split(" ");
  return [date, time.slice(0, 8)];
};

export default function PendingShopsFull() {
  // --- STATES ---
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [activeShop, setActiveShop] = useState(null);

  const [actionLoading, setActionLoading] = useState({});
  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [actionType, setActionType] = useState(null);
  const [actionId, setActionId] = useState(null);

  const passcodeInputRef = useRef(null);

  // FETCH SHOPS
  useEffect(() => {
    fetchPendingShops();
    const interval = setInterval(fetchPendingShops, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchPendingShops = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://38.60.244.108:3000/shops-pending");
      setShops(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      window.apiAlert("Fetch Error.");
    } finally {
      setLoading(false);
    }
  };

  // FILTER AND PAGINATION
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const from = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
    const to = dateTo ? new Date(dateTo + "T23:59:59") : null;

    return shops.filter((s) => {
      if (s.permission !== "pending") return false;

      if (from || to) {
        const created = new Date(s.created_at.replace(" ", "T"));
        if (from && created < from) return false;
        if (to && created > to) return false;
      }

      if (!q) return true;

      const text =
        `${s.id} ${s.shopkeeper_name} ${s.shop_name} ${s.email}`.toLowerCase();
      return text.includes(q);
    });
  }, [shops, query, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const windowPagination = () => {
    const pages = [];
    const windowSize = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + windowSize - 1);
    if (end - start < windowSize - 1) {
      start = Math.max(1, end - windowSize + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  // PASSCODE FLOW
  const openPasscode = (id, type) => {
    setActionId(id);
    setActionType(type);
    setPasscode("");
    setPasscodeModal(true);
    setModalOpen(false);
    setActiveShop(null);
  };

  useEffect(() => {
    if (passcodeModal && passcodeInputRef.current) {
      passcodeInputRef.current.focus();
    }
  }, [passcodeModal]);

  const handlePasscodeKey = (e) => {
    if (e.key === "Enter") doAction();
  };

  const doAction = async () => {
    if (passcode !== "123456") {
      window.apiAlert("Incorrect Passcode");
      return;
    }

    setPasscodeModal(false);
    setModalOpen(false);
    setActiveShop(null);

    const url = `http://38.60.244.108:3000/shops/${actionType}/${actionId}`;
    setActionLoading((p) => ({ ...p, [actionId]: true }));

    try {
      const res = await axios.patch(url);

      setShops((prev) => prev.filter((s) => s.id !== actionId));

      const message =
        res?.data?.message ||
        (actionType === "approve"
          ? "Successfully Accepted!"
          : "Successfully Rejected!");

      window.apiAlert(message);
    } catch (err) {
      window.apiAlert("Action Failed");
    } finally {
      setActionLoading((p) => ({ ...p, [actionId]: false }));
    }
  };

  const parseLocation = (loc) => {
    if (!loc) return { lat: null, lon: null };
    const match = loc.match(/Lag\s*([0-9.\-]+),\s*Log\s*([0-9.\-]+)/i);
    if (!match) return { lat: null, lon: null };
    return { lat: Number(match[1]), lon: Number(match[2]) };
  };

  return (
    <div className="mt-4 border border-gray-200 rounded-2xl p-4 mb-6">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
        Confirm Shops
      </h2>

      {/* SEARCH + DATE FILTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative flex items-center w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
          <input
            type="text"
            placeholder="Search Shops..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="date"
            className="border rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B476FF]"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setPage(1);
            }}
          />
          <input
            type="date"
            className="border rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B476FF]"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg shadow-sm border border-purple-100 bg-white">
        <table className="w-full text-sm min-w-[700px] sm:min-w-full">
          <thead className="bg-gradient-to-r bg-[#B476FF] text-white text-xs sm:text-sm">
            <tr>
              {[
                "ID",
                "Shopkeeper Name",
                "Shop Name",
                "Email",
                "Phone",
                "Items",
                "Address",
                "Date & Time",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="p-2 sm:p-3 font-semibold text-left sm:text-center"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-6 text-center">
                  No pending shops.
                </td>
              </tr>
            ) : (
              paginated.map((s) => (
                <tr
                  key={s.id}
                  className="border-b hover:bg-purple-50 transition"
                >
                  <td className="p-2 sm:p-3">{s.id}</td>

                  {/* PHOTO */}
                  <td
                    className="p-2 sm:p-3 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setActiveShop(s);
                      setModalOpen(true);
                    }}
                  >
                    {s.photo ? (
                      <img
                        src={`http://38.60.244.108:3000/shop-uploads/${s.photo}`}
                        alt={s.shop_name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B476FF] flex items-center justify-center text-white font-semibold mx-auto">
                        {s.shop_name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}

                    <div className="text-[#B476FF] font-semibold underline text-xs sm:text-sm">
                      {s.shopkeeper_name}
                    </div>
                  </td>

                  <td className="p-2 sm:p-3 text-xs sm:text-center">
                    {s.shop_name}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-center">
                    {s.email}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-center">
                    {s.phone}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-center">
                    {s.items}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-center">
                    {s.address}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-center">
                    {splitDateTime(s.created_at)[0]} <br />
                    {splitDateTime(s.created_at)[1]}
                  </td>

                  <td className="p-2 sm:p-3 text-center">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center items-center">
                      <button
                        onClick={() => openPasscode(s.id, "reject")}
                        disabled={!!actionLoading[s.id]}
                        className="px-3 py-1 text-white rounded-xl shadow bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 disabled:opacity-40 text-xs sm:text-sm"
                      >
                        {actionLoading[s.id] ? "..." : "Reject"}
                      </button>
                      <button
                        onClick={() => openPasscode(s.id, "approve")}
                        disabled={!!actionLoading[s.id]}
                        className="px-3 py-1 text-white rounded-xl shadow bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 disabled:opacity-40 text-xs sm:text-sm"
                      >
                        {actionLoading[s.id] ? "..." : "Accept"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-wrap gap-2 justify-end mt-5">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded-lg shadow-sm hover:bg-purple-100 disabled:opacity-50"
        >
          Prev
        </button>

        {windowPagination().map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border rounded-lg shadow-sm ${
              p === page ? "bg-[#B476FF] text-white" : "hover:bg-purple-100"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded-lg shadow-sm hover:bg-purple-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* PASSCODE MODAL */}
      {passcodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setPasscodeModal(false)}
          />
          <div className="relative bg-white rounded-xl p-6 w-[90%] max-w-[330px] shadow-2xl border border-purple-200">
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
              onKeyDown={handlePasscodeKey}
            />
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <button
                onClick={() => setPasscodeModal(false)}
                className="px-4 py-1.5 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={doAction}
                className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHOP DETAILS MODAL */}
      {modalOpen && activeShop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-2">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl p-4 sm:p-6 w-full max-w-[800px] shadow-2xl border border-purple-200 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
                Shop Details - {activeShop.id}
              </h3>
              <button
                className="text-gray-500 hover:text-black"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                {activeShop.photo ? (
                  <img
                    src={`http://38.60.244.108:3000/shop-uploads/${activeShop.photo}`}
                    alt={activeShop.shop_name}
                    className="w-44 h-44 sm:w-44 sm:h-44 object-cover rounded-xl border shadow-md"
                  />
                ) : (
                  <div className="w-44 h-44 rounded-xl border shadow-md bg-[#B476FF] flex items-center justify-center text-white text-4xl font-bold">
                    {activeShop.shop_name?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
              </div>

              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  ["Shopkeeper", activeShop.shopkeeper_name],
                  ["Email", activeShop.email],
                  ["Phone", activeShop.phone],
                  ["Items", activeShop.items],
                  ["Status", activeShop.status],
                  ["Permission", activeShop.permission],
                  ["Created At", formatDateShort(activeShop.created_at)],
                  ["Address", activeShop.address],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="font-semibold text-gray-600">{label}</div>
                    <div className="text-gray-800">{value}</div>
                  </div>
                ))}
              </div>

              {/* LOCATION MAP */}

              <div className="col-span-3">
                <div className="font-semibold text-gray-600">Location Map</div>

                {(() => {
                  const { lat, lon } = parseLocation(activeShop.location);

                  if (!lat || !lon) {
                    return <div className="text-gray-800">No location</div>;
                  }

                  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
                    lon - 0.01
                  }%2C${lat - 0.01}%2C${lon + 0.01}%2C${
                    lat + 0.01
                  }&layer=mapnik&marker=${lat}%2C${lon}`;

                  return (
                    <div className="mt-2">
                      <iframe
                        src={mapUrl}
                        className="w-full h-64 rounded-lg border"
                        title="Shop Location Map"
                        loading="lazy"
                      ></iframe>

                      <p className="text-xs text-gray-500 mt-1">
                        {lat}, {lon}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-end">
              <button
                onClick={() => openPasscode(activeShop.id, "reject")}
                disabled={!!actionLoading[activeShop.id]}
                className="px-4 py-2 text-white rounded-xl shadow bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 disabled:opacity-40"
              >
                {actionLoading[activeShop.id] ? "..." : "Reject"}
              </button>
              <button
                onClick={() => openPasscode(activeShop.id, "approve")}
                disabled={!!actionLoading[activeShop.id]}
                className="px-4 py-2 text-white rounded-xl shadow bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 disabled:opacity-40"
              >
                {actionLoading[activeShop.id] ? "..." : "Accept"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
