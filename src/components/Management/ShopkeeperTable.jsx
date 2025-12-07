// import React, { useState, useEffect, useRef } from "react";
// import { Download, Search, Trash2 } from "lucide-react";
// import axios from "axios";

// export default function ShopkeeperTable() {
//   const [shopkeepers, setShopkeepers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [activeShop, setActiveShop] = useState(null);
//   const [passcodeModal, setPasscodeModal] = useState(false);
//   const [passcode, setPasscode] = useState("");
//   const passcodeInputRef = useRef(null);
//   const [actionLoading, setActionLoading] = useState({});
//   const [alerts, setAlerts] = useState([]);

//   // Live fetch every 500ms
//   useEffect(() => {
//     const interval = setInterval(() => {
//       axios
//         .get("http://38.60.244.108:3000/shops")
//         .then((res) => setShopkeepers(res.data))
//         .catch((err) => console.error("API Error:", err));
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   const splitDateTime = (datetime) => {
//     if (!datetime) return ["-", "-"];
//     const [date, time] = datetime.split(" ");
//     return [date, time.slice(0, 8)];
//   };

//   const filteredShopkeepers = shopkeepers.filter((shop) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       shop.name?.toLowerCase().includes(term) ||
//       shop.id?.toLowerCase().includes(term) ||
//       shop.email?.toLowerCase().includes(term) ||
//       shop.phone?.toLowerCase().includes(term) ||
//       shop.status?.toLowerCase().includes(term) ||
//       shop.shop_name?.toLowerCase().includes(term)
//     );
//   });

//   const getPhoto = (photo) => photo || null;
//   const formatDateShort = (date) =>
//     date ? new Date(date).toLocaleString() : "-";
//   const getMapUrl = (location) =>
//     location
//       ? `https://maps.google.com?q=${encodeURIComponent(location)}&output=embed`
//       : null;

//   const openDetail = (shop) => {
//     setActiveShop(shop);
//     setModalOpen(true);
//   };

//   const openDeletePasscode = (shop) => {
//     setActiveShop(shop);
//     setPasscode("");
//     setPasscodeModal(true);
//     setTimeout(() => passcodeInputRef.current?.focus(), 500);
//   };

//   const doDelete = () => {
//     if (passcode === "123456") {
//       setActionLoading((prev) => ({ ...prev, [activeShop.id]: true }));
//       axios
//         .delete(`http://38.60.244.108:3000/shops/${activeShop.id}`)
//         .then((res) => {
//           setShopkeepers((prev) => prev.filter((s) => s.id !== activeShop.id));
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
//           setActionLoading((prev) => ({ ...prev, [activeShop.id]: false }));
//           setPasscodeModal(false);
//         });
//     } else {
//       setAlerts((prev) => [...prev, "Incorrect passcode"]);
//     }
//   };

//   const toggleStatus = (shop, newStatus) => {
//     setActionLoading((prev) => ({ ...prev, [shop.id]: true }));
//     axios
//       .patch(`http://38.60.244.108:3000/shops/status/${shop.id}`, {
//         status: newStatus,
//       })
//       .then((res) => {
//         setShopkeepers((prev) =>
//           prev.map((s) => (s.id === shop.id ? { ...s, status: newStatus } : s))
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
//         setActionLoading((prev) => ({ ...prev, [shop.id]: false }));
//       });
//   };

//   // const getPhotoUrl = (photo) => {
//   //   if (!photo) return null;
//   //   return `http://38.60.244.108:3000/uploads/${photo}`; // adjust path if needed
//   // };

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

//       <div className="flex items-center justify-between mb-4">
//         {/* Search Bar */}
//         <div className="relative flex items-center w-full max-w-sm">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
//           <input
//             type="text"
//             placeholder="Search Shopkeepers"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm"
//           />
//         </div>

//         {/* Export button */}
//         <button className="flex items-center gap-1.5 px-4 py-2 text-xs bg-white shadow-sm rounded-full hover:bg-gray-50">
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
//                 "Shopkeeper Name",
//                 "Shop Name",
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
//             {filteredShopkeepers.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="text-center p-6 text-gray-500">
//                   No results found.
//                 </td>
//               </tr>
//             ) : (
//               filteredShopkeepers.map((shop) => (
//                 <tr
//                   key={shop.id}
//                   className={`border-t ${
//                     shop.status === "active"
//                       ? "bg-green-100"
//                       : shop.status === "warning"
//                       ? "bg-red-100"
//                       : "bg-white"
//                   }`}
//                 >
//                   <td className="p-3">{shop.id}</td>

//                   <td className="p-3 flex items-center gap-2">
//                     {shop.photo ? (
//                       <img
//                         src={`http://38.60.244.108:3000/shop-uploads/${shop.photo}`}
//                         alt={shop.shop_name}
//                         className="size-10 object-cover rounded-full"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-[#B476FF] flex items-center justify-center text-white font-semibold">
//                         {shop.shop_name?.charAt(0).toUpperCase() || "?"}
//                       </div>
//                     )}
//                     <div>{shop.shopkeeper_name}</div>
//                   </td>
//                   <td className="p-3">{shop.shop_name}</td>

//                   <td className="p-3">{shop.email}</td>
//                   <td className="p-3">{shop.phone}</td>

//                   {/* Status */}
//                   <td className="px-4 py-2 space-x-1">
//                     <button
//                       onClick={() => toggleStatus(shop, "active")}
//                       disabled={!!actionLoading[shop.id]}
//                       className={`px-2 py-1 text-xs rounded ${
//                         shop.status === "active"
//                           ? "bg-green-500 text-white"
//                           : "bg-green-100 text-green-800"
//                       }`}
//                     >
//                       Active
//                     </button>
//                     <button
//                       onClick={() => toggleStatus(shop, "warning")}
//                       disabled={!!actionLoading[shop.id]}
//                       className={`px-2 py-1 text-xs rounded ${
//                         shop.status === "warning"
//                           ? "bg-red-500 text-white"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       Warning
//                     </button>
//                   </td>

//                   <td className="p-3">
//                     {splitDateTime(shop.created_at)[0]} <br />
//                     {splitDateTime(shop.created_at)[1]}
//                   </td>

//                   <td className="p-3 flex gap-2  ">
//                     <button
//                       className="px-3 py-1 rounded-full bg-[#B476FF] text-white text-xs"
//                       onClick={() => openDetail(shop)}
//                     >
//                       Detail
//                     </button>
//                     <button
//                       className="px-3 py-1 rounded-full bg-red-500 text-white text-xs flex items-center gap-1"
//                       onClick={() => openDeletePasscode(shop)}
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
//               <div className="flex flex-col items-center">
//                 {activeShop.photo ? (
//                   <img
//                     src={`http://38.60.244.108:3000/shop-uploads/${activeShop.photo}`}
//                     className="w-44 h-44 rounded-xl border shadow-md object-cover"
//                     alt={activeShop.name}
//                   />
//                 ) : (
//                   <div className="w-44 h-44 rounded-xl border shadow-md bg-[#B476FF] flex items-center justify-center text-white text-4xl font-bold">
//                     {activeShop.name
//                       ? activeShop.name
//                           .split(" ")
//                           .map((n) => n.charAt(0).toUpperCase())
//                           .join("")
//                       : "?"}
//                   </div>
//                 )}
//               </div>

//               <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm">
//                 {[
//                   ["Shop Name", activeShop.shop_name],
//                   ["Shopkeeper", activeShop.name],
//                   ["Email", activeShop.email],
//                   ["Phone", activeShop.phone],
//                   ["Status", activeShop.status],
//                   ["Created At", formatDateShort(activeShop.created_at)],
//                 ].map(([label, value]) => (
//                   <div key={label}>
//                     <div className="font-semibold text-gray-600">{label}</div>
//                     <div className="text-gray-800">{value}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {activeShop.location && (
//               <div className="col-span-2 mt-4">
//                 <div className="font-semibold text-gray-600">Location Map</div>
//                 <iframe
//                   src={getMapUrl(activeShop.location)}
//                   className="w-full h-56 rounded-lg border mt-1"
//                   loading="lazy"
//                 ></iframe>
//               </div>
//             )}
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
//             <div className="flex justify-end gap-2">
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

export default function ShopkeeperTable() {
  const [shopkeepers, setShopkeepers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeShop, setActiveShop] = useState(null);
  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const passcodeInputRef = useRef(null);
  const [actionLoading, setActionLoading] = useState({});
  const [alerts, setAlerts] = useState([]);

  // ---------------- PAGINATION STATES ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Live fetch every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://38.60.244.108:3000/shops")
        .then((res) => setShopkeepers(res.data))
        .catch((err) => console.error("API Error:", err));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const splitDateTime = (datetime) => {
    if (!datetime) return ["-", "-"];
    const [date, time] = datetime.split(" ");
    return [date, time.slice(0, 8)];
  };

  const filteredShopkeepers = shopkeepers.filter((shop) => {
    const term = searchTerm.toLowerCase();
    return (
      shop.name?.toLowerCase().includes(term) ||
      shop.id?.toLowerCase().includes(term) ||
      shop.email?.toLowerCase().includes(term) ||
      shop.phone?.toLowerCase().includes(term) ||
      shop.status?.toLowerCase().includes(term) ||
      shop.shop_name?.toLowerCase().includes(term)
    );
  });

  const getPhoto = (photo) => photo || null;
  const formatDateShort = (date) =>
    date ? new Date(date).toLocaleString() : "-";
  const getMapUrl = (location) =>
    location
      ? `https://maps.google.com?q=${encodeURIComponent(location)}&output=embed`
      : null;

  const openDetail = (shop) => {
    setActiveShop(shop);
    setModalOpen(true);
  };

  const openDeletePasscode = (shop) => {
    setActiveShop(shop);
    setPasscode("");
    setPasscodeModal(true);
    setTimeout(() => passcodeInputRef.current?.focus(), 500);
  };

  const doDelete = () => {
    if (passcode === "123456") {
      setActionLoading((prev) => ({ ...prev, [activeShop.id]: true }));
      axios
        .delete(`http://38.60.244.108:3000/shops/${activeShop.id}`)
        .then((res) => {
          setShopkeepers((prev) => prev.filter((s) => s.id !== activeShop.id));
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
          setActionLoading((prev) => ({ ...prev, [activeShop.id]: false }));
          setPasscodeModal(false);
        });
    } else {
      setAlerts((prev) => [...prev, "Incorrect passcode"]);
    }
  };

  const toggleStatus = (shop, newStatus) => {
    setActionLoading((prev) => ({ ...prev, [shop.id]: true }));
    axios
      .patch(`http://38.60.244.108:3000/shops/status/${shop.id}`, {
        status: newStatus,
      })
      .then((res) => {
        setShopkeepers((prev) =>
          prev.map((s) => (s.id === shop.id ? { ...s, status: newStatus } : s))
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
        setActionLoading((prev) => ({ ...prev, [shop.id]: false }));
      });
  };

  // ---------------- PAGINATION LOGIC ----------------
  const totalPages = Math.ceil(filteredShopkeepers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedShopkeepers = filteredShopkeepers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="pt-4">
      {/* Alerts */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {alerts.map((msg, i) => (
          <div
            key={i}
            className="bg-purple-100 text-purple-700 px-4 py-2 rounded shadow"
          >
            {msg}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        {/* Search Bar */}
        <div className="relative flex items-center w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
          <input
            type="text"
            placeholder="Search Shopkeepers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm"
          />
        </div>

        {/* Export button */}
        <button className="flex items-center gap-1.5 px-4 py-2 text-xs bg-white shadow-sm rounded-full hover:bg-gray-50">
          <Download className="h-4 w-4" /> Export
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl shadow-sm overflow-x-auto bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-[#B476FF] text-white sticky top-0 z-10">
            <tr>
              {[
                "ID",
                "Shopkeeper Name",
                "Shop Name",
                "Email",
                "Phone",
                "Status",
                "Date & Time",
                "Action",
              ].map((col) => (
                <th key={col} className="p-3 text-center">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedShopkeepers.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-6 text-gray-500">
                  No results found.
                </td>
              </tr>
            ) : (
              paginatedShopkeepers.map((shop) => (
                <tr
                  key={shop.id}
                  className={`border-t ${
                    shop.status === "active"
                      ? "bg-green-100"
                      : shop.status === "warning"
                      ? "bg-red-100"
                      : "bg-white"
                  }`}
                >
                  <td className="p-3">{shop.id}</td>

                  <td className="p-1 text-center md:p-3">
                    <div className="p-1 text-center md:p-3 flex items-center gap-2">
                      {shop.photo ? (
                        <img
                          src={`http://38.60.244.108:3000/shop-uploads/${shop.photo}`}
                          alt={shop.shop_name}
                          className="size-10 object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#B476FF] flex items-center justify-center text-white font-semibold">
                          {shop.shop_name?.charAt(0).toUpperCase() || "?"}
                        </div>
                      )}
                      <div>{shop.shopkeeper_name}</div>
                    </div>
                  </td>
                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">
                    {shop.shop_name}
                  </td>

                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">
                    {shop.email}
                  </td>
                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">
                    {shop.phone}
                  </td>

                  {/* Status */}
                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">
                    <div className="flex items-center justify-center gap-2 md:flex-col 2xl:flex-row">
                      <button
                        onClick={() => toggleStatus(shop, "active")}
                        disabled={!!actionLoading[shop.id]}
                        className={`w-[80px] py-1 text-xs md:text-sm rounded ${
                          shop.status === "active"
                            ? "bg-green-500 text-white"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => toggleStatus(shop, "warning")}
                        disabled={!!actionLoading[shop.id]}
                        className={`w-[80px] py-1 text-xs md:text-sm rounded  ${
                          shop.status === "warning"
                            ? "bg-red-500 text-white"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        Warning
                      </button>
                    </div>
                  </td>

                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">
                    {splitDateTime(shop.created_at)[0]} <br />
                    {splitDateTime(shop.created_at)[1]}
                  </td>

                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">
                    <div className="flex items-center justify-center gap-2 md:flex-col 2xl:flex-row">
                      <button
                        className="w-[80px] py-1 rounded bg-[#B476FF] text-white text-xs sm:text-sm"
                        onClick={() => openDetail(shop)}
                      >
                        Detail
                      </button>
                      <button
                        className="w-[80px] py-1 rounded bg-red-500 text-white text-xs sm:text-sm flex items-center gap-1 justify-center"
                        onClick={() => openDeletePasscode(shop)}
                      >
                        {/* <Trash2 className="h-4 w-4" /> */}
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
      <div className="flex justify-end items-center gap-2 mt-4">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className={`px-3 py-1 rounded-lg border shadow-sm${
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
            className={`px-3 py-1 rounded-lg border shadow-sm ${
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
          className={`px-3 py-1 rounded-lg border shadow-sm ${
            currentPage === totalPages || totalPages === 0
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>

      {/* SHOP DETAIL MODAL */}
      {modalOpen && activeShop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 w-[min(800px,95%)] shadow-2xl border border-purple-200 max-h-[90vh] overflow-auto">
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

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
              <div className="flex flex-col items-center">
                {activeShop.photo ? (
                  <img
                    src={`http://38.60.244.108:3000/shop-uploads/${activeShop.photo}`}
                    className="w-44 h-44 rounded-xl border shadow-md object-cover"
                    alt={activeShop.name}
                  />
                ) : (
                  <div className="w-44 h-44 rounded-xl border shadow-md bg-[#B476FF] flex items-center justify-center text-white text-4xl font-bold">
                    {activeShop.name
                      ? activeShop.name
                          .split(" ")
                          .map((n) => n.charAt(0).toUpperCase())
                          .join("")
                      : "?"}
                  </div>
                )}
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm">
                {[
                  ["Shop Name", activeShop.shop_name],
                  ["Shopkeeper", activeShop.name],
                  ["Email", activeShop.email],
                  ["Phone", activeShop.phone],
                  ["Status", activeShop.status],
                  ["Created At", formatDateShort(activeShop.created_at)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="font-semibold text-gray-600">{label}</div>
                    <div className="text-gray-800">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {activeShop.location && (
              <div className="col-span-2 mt-4">
                <div className="font-semibold text-gray-600">Location Map</div>
                <iframe
                  src={getMapUrl(activeShop.location)}
                  className="w-full h-56 rounded-lg border mt-1"
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PASSCODE MODAL */}
      {passcodeModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setPasscodeModal(false)}
          />
          <div className="relative bg-white rounded-xl p-6 w-[330px] shadow-2xl border border-purple-200">
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
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setPasscodeModal(false)}
                className="px-4 py-1.5 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={doDelete}
                className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90"
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
