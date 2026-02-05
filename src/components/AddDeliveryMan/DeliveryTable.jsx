// import React, { useState, useEffect, useRef } from "react";
// import { Camera, Download, Search, Trash2 } from "lucide-react";
// import axios from "axios";

// export default function DeliveryTable({
//   deliveryMen,
//   setShowForm,
//   onOpenChat,
// }) {
//   const [deliverymen, setDeliverymen] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeUser, setActiveUser] = useState(null);
//   const [actionLoading, setActionLoading] = useState({});
//   const [alerts, setAlerts] = useState([]);

//   const [passcodeModal, setPasscodeModal] = useState(false);
//   const [passcode, setPasscode] = useState("");
//   const passcodeInputRef = useRef(null);

//   const [editModal, setEditModal] = useState(false);
//   const [editFormData, setEditFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     work_type: "Full time",
//     password: "",
//     photo: null,
//   });
//   const [editPasscodeModal, setEditPasscodeModal] = useState(false);
//   const [editPasscode, setEditPasscode] = useState("");
//   const editPasscodeInputRef = useRef(null);

//   // ---------------- PAGINATION STATES ----------------
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       axios
//         .get("http://38.60.244.108:3000/deliverymen")
//         .then((res) => setDeliverymen(res.data))
//         .catch((err) => console.error("API Error:", err));
//     }, 500);
//     return () => clearInterval(interval);
//   }, []);

//   const splitDateTime = (datetime) => {
//     if (!datetime) return ["-", "-"];
//     const [date, time] = datetime.split(" ");
//     return [date, time.slice(0, 8)];
//   };

//   // ---------------- FILTER ----------------
//   const filteredUsers = deliverymen.filter((delivery) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       delivery.name?.toLowerCase().includes(term) ||
//       delivery.id?.toLowerCase().includes(term) ||
//       delivery.email?.toLowerCase().includes(term) ||
//       delivery.phone?.toLowerCase().includes(term) ||
//       delivery.status?.toLowerCase().includes(term)
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

//   // DELETE LOGIC
//   const openDeletePasscode = (delivery) => {
//     setActiveUser(delivery);
//     setPasscode("");
//     setPasscodeModal(true);
//     setTimeout(() => passcodeInputRef.current?.focus(), 500);
//   };

//   const doDelete = () => {
//     if (passcode === "123456") {
//       setActionLoading((prev) => ({ ...prev, [activeUser.id]: true }));
//       axios
//         .delete(`http://38.60.244.108:3000/deliverymen/${activeUser.id}`)
//         .then((res) => {
//           setDeliverymen((prev) => prev.filter((u) => u.id !== activeUser.id));
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

//   // STATUS TOGGLE
//   const toggleStatus = (delivery, newStatus) => {
//     setActionLoading((prev) => ({ ...prev, [delivery.id]: true }));
//     axios
//       .patch(`http://38.60.244.108:3000/deliverymen/status/${delivery.id}`, {
//         status: newStatus,
//       })
//       .then((res) => {
//         setDeliverymen((prev) =>
//           prev.map((u) =>
//             u.id === delivery.id ? { ...u, status: newStatus } : u
//           )
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
//         setActionLoading((prev) => ({ ...prev, [delivery.id]: false }));
//       });
//   };

//   // EDIT LOGIC
//   const openEdit = (delivery) => {
//     setActiveUser(delivery);
//     setEditFormData({
//       name: delivery.name || "",
//       email: delivery.email || "",
//       phone: delivery.phone || "",
//       work_type: delivery.work_type || "Full time",
//       password: "",
//       photo: null,
//     });
//     setEditModal(true);
//   };

//   const doEdit = () => {
//     if (editPasscode === "123456") {
//       const formData = new FormData();
//       Object.entries(editFormData).forEach(([key, value]) => {
//         if (value !== null) formData.append(key, value);
//       });

//       setActionLoading((prev) => ({ ...prev, [activeUser.id]: true }));
//       axios
//         .put(`http://38.60.244.108:3000/deliverymen/${activeUser.id}`, formData)
//         .then((res) => {
//           setDeliverymen((prev) =>
//             prev.map((u) =>
//               u.id === activeUser.id ? { ...u, ...editFormData } : u
//             )
//           );
//           setAlerts((prev) => [
//             ...prev,
//             res.data.message || "Updated successfully",
//           ]);
//           setEditPasscodeModal(false);
//           setEditModal(false);
//         })
//         .catch((err) =>
//           setAlerts((prev) => [
//             ...prev,
//             err.response?.data?.message || "Update failed",
//           ])
//         )
//         .finally(() => {
//           setActionLoading((prev) => ({ ...prev, [activeUser.id]: false }));
//         });
//     } else {
//       setAlerts((prev) => [...prev, "Incorrect passcode"]);
//     }
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

//       {/* Top bar: Add Button + Search + Export */}
//       <div className="flex items-center justify-between mb-4">
//         {/* Left: Add Delivery Man */}
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-[#B476FF] text-white px-6 py-2 rounded-full"
//         >
//           Add New Delivery Man
//         </button>

//         {/* Right: Search + Export */}
//         <div className="flex items-center gap-2">
//           <div className="relative flex items-center w-[300px]">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
//             <input
//               type="text"
//               placeholder="Search deliverymen"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm"
//             />
//           </div>

//           <button className="flex items-center gap-1.5 px-3 py-2 text-xs bg-white shadow-sm rounded-full">
//             <Download className="h-4 w-4" /> Export
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="rounded-xl shadow-sm overflow-x-auto bg-white">
//         <table className="min-w-full text-sm">
//           <thead className="bg-[#B476FF] text-white sticky top-0 z-10">
//             <tr>
//               {[
//                 "ID",
//                 "Deliveryman",
//                 "Email",
//                 "Phone",
//                 "Work Type",
//                 "Orders",
//                 "Status",
//                 "Date & Time",
//                 "Action",
//               ].map((col) => (
//                 <th key={col} className="p-3 text-center">
//                   {col}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedUsers.length === 0 ? (
//               <tr>
//                 <td colSpan={9} className="text-center p-6 text-gray-500">
//                   No results found.
//                 </td>
//               </tr>
//             ) : (
//               paginatedUsers.map((delivery) => (
//                 <tr
//                   key={delivery.id}
//                   className={`border-t ${
//                     delivery.status === "active"
//                       ? "bg-green-100"
//                       : delivery.status === "warning"
//                       ? "bg-red-100"
//                       : "bg-white"
//                   }`}
//                 >
//                   <td className="p-1 text-center md:p-3 text-xs md:text-sm">{delivery.id}</td>

//                   <td className="p-1 text-center md:p-3 text-xs md:text-sm flex items-center gap-2">
//                     {delivery.photo ? (
//                       <img
//                         src={`http://38.60.244.108:3000/deliverymen-uploads/${delivery.photo}`}
//                         alt={delivery.name}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-[#B476FF] flex items-center justify-center text-white font-semibold">
//                         {delivery.name?.charAt(0).toUpperCase() || "?"}
//                       </div>
//                     )}
//                     <div>{delivery.name}</div>
//                   </td>

//                   <td className="p-1 text-center md:p-3 text-xs md:text-sm">{delivery.email}</td>
//                   <td className="p-1 text-center md:p-3 text-xs md:text-sm">{delivery.phone}</td>
//                   <td className="p-1 text-center md:p-3 text-xs md:text-sm">{delivery.work_type}</td>

//                   <td className="p-1 text-center md:p-3 text-xs md:text-sm">
//                     <div className="flex flex-col">
//                       <span>Total: {delivery.total_order}</span>
//                       <span>Assigned: {delivery.assign_order}</span>
//                     </div>
//                   </td>

//                   <td className="px-4 py-2 space-x-1">
//                     <button
//                       onClick={() => toggleStatus(delivery, "active")}
//                       disabled={!!actionLoading[delivery.id]}
//                       className={`px-2 py-1 text-xs rounded ${
//                         delivery.status === "active"
//                           ? "bg-green-500 text-white"
//                           : "bg-green-200 text-green-800"
//                       }`}
//                     >
//                       Active
//                     </button>

//                     <button
//                       onClick={() => toggleStatus(delivery, "warning")}
//                       disabled={!!actionLoading[delivery.id]}
//                       className={`px-2 py-1 text-xs rounded ${
//                         delivery.status === "warning"
//                           ? "bg-red-500 text-white"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       Warning
//                     </button>
//                   </td>

//                   <td className="p-3">
//                     {splitDateTime(delivery.created_at)[0]} <br />
//                     {splitDateTime(delivery.created_at)[1]}
//                   </td>

//                   <td className="p-3 flex gap-2">
//                     <button
//                       className="px-3 py-1 rounded-full bg-yellow-500 text-white text-xs"
//                       onClick={() => openEdit(delivery)}
//                     >
//                       Edit
//                     </button>

//                     <button
//                       className="px-3 py-1 rounded-full bg-red-500 text-white text-xs flex items-center gap-1"
//                       onClick={() => openDeletePasscode(delivery)}
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
//           className={`px-3 py-1 rounded-full border text-sm ${
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
//             className={`px-3 py-1 rounded-full text-sm border ${
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
//           className={`px-3 py-1 rounded-full border text-sm ${
//             currentPage === totalPages || totalPages === 0
//               ? "opacity-40 cursor-not-allowed"
//               : "hover:bg-gray-100"
//           }`}
//         >
//           Next
//         </button>
//       </div>

//       {/* EDIT PASSCODE MODAL */}
//       {editPasscodeModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setEditPasscodeModal(false)}
//           />
//           <div className="relative bg-white rounded-2xl p-6 w-[330px] shadow-2xl border border-purple-200">
//             <h3 className="text-lg font-bold text-center mb-4 bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
//               Enter Passcode
//             </h3>
//             <input
//               ref={editPasscodeInputRef}
//               type="password"
//               className="border rounded-lg w-full px-3 py-2 mb-4 focus:ring-2 focus:ring-[#B476FF]"
//               placeholder="Passcode"
//               value={editPasscode}
//               onChange={(e) => setEditPasscode(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && doEdit()}
//             />
//             <div className="flex justify-between gap-2">
//               <button
//                 onClick={() => setEditPasscodeModal(false)}
//                 className="px-4 py-1.5 border rounded-lg hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={doEdit}
//                 className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90"
//               >
//                 Confirm
//               </button>
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

//       {/* EDIT FORM MODAL */}
//       {editModal && activeUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white rounded-2xl shadow-lg w-[450px] p-6 relative">
//             <h2 className="text-lg font-semibold mb-4 text-[#B476FF]">
//               Edit Delivery Man
//             </h2>

//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 setEditModal(false);
//                 setEditPasscodeModal(true);
//               }}
//               className="space-y-3"
//             >
//               {/* ---------- UPDATED PHOTO UI ---------- */}
//               <div className="flex flex-col items-center mb-4">
//                 <div className="relative w-28 h-28">
//                   {editFormData.photo ? (
//                     <img
//                       src={URL.createObjectURL(editFormData.photo)}
//                       alt="Profile Preview"
//                       className="w-full h-full rounded-full object-cover border-2 border-dashed border-[#B476FF] shadow-sm"
//                     />
//                   ) : activeUser.photo ? (
//                     <img
//                       src={`http://38.60.244.108:3000/deliverymen-uploads/${activeUser.photo}`}
//                       alt={activeUser.name}
//                       className="w-full h-full rounded-full object-cover border-2 border-dashed border-[#B476FF] shadow-sm"
//                     />
//                   ) : (
//                     <div className="w-full h-full rounded-full border-2 border-dashed border-[#B476FF] bg-purple-50 flex items-center justify-center shadow-sm">
//                       <span className="text-[#B476FF] font-semibold text-sm">
//                         Avatar
//                       </span>
//                     </div>
//                   )}

//                   {/* Upload Button */}
//                   <label className="cursor-pointer flex items-center justify-center bg-[#B476FF] text-white w-8 h-8 rounded-full hover:bg-[#9b5de5] absolute bottom-0 right-0">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) =>
//                         setEditFormData((prev) => ({
//                           ...prev,
//                           photo: e.target.files[0],
//                         }))
//                       }
//                       className="hidden"
//                     />
//                     <Camera className="w-4 h-4" />
//                   </label>
//                 </div>
//               </div>

//               {/* Name, Email, Phone, Work Type */}
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={editFormData.name}
//                 onChange={(e) =>
//                   setEditFormData((prev) => ({ ...prev, name: e.target.value }))
//                 }
//                 className="w-full border px-3 py-2 rounded-lg text-sm"
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={editFormData.email}
//                 onChange={(e) =>
//                   setEditFormData((prev) => ({
//                     ...prev,
//                     email: e.target.value,
//                   }))
//                 }
//                 className="w-full border px-3 py-2 rounded-lg text-sm"
//                 required
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone"
//                 value={editFormData.phone}
//                 onChange={(e) =>
//                   setEditFormData((prev) => ({
//                     ...prev,
//                     phone: e.target.value,
//                   }))
//                 }
//                 className="w-full border px-3 py-2 rounded-lg text-sm"
//                 required
//               />
//               <select
//                 name="work_type"
//                 value={editFormData.work_type}
//                 onChange={(e) =>
//                   setEditFormData((prev) => ({
//                     ...prev,
//                     work_type: e.target.value,
//                   }))
//                 }
//                 className="w-full border px-3 py-2 rounded-lg text-sm"
//               >
//                 <option>Full time</option>
//                 <option>Part time</option>
//               </select>

//               <div className="flex justify-end gap-2 pt-3">
//                 <button
//                   type="button"
//                   onClick={() => setEditModal(false)}
//                   className="px-4 py-2 rounded-lg border text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded-lg bg-[#B476FF] text-white text-sm"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>

//             <button
//               onClick={() => setEditModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-black"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { Camera, Download, Search, Trash2 } from "lucide-react";
import axios from "axios";
import { useTheme } from "../ThemeProvider";

export default function DeliveryTable({ deliveryMen, setShowForm, onOpenChat }) {
  const { dark } = useTheme(); // get dark mode value

  const [deliverymen, setDeliverymen] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeUser, setActiveUser] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [alerts, setAlerts] = useState([]);

  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const passcodeInputRef = useRef(null);

  const [editModal, setEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    work_type: "Full time",
    password: "",
    photo: null,
  });
  const [editPasscodeModal, setEditPasscodeModal] = useState(false);
  const [editPasscode, setEditPasscode] = useState("");
  const editPasscodeInputRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://38.60.244.108:3000/deliverymen")
        .then((res) => setDeliverymen(res.data))
        .catch((err) => console.error("API Error:", err));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const splitDateTime = (datetime) => {
    if (!datetime) return ["-", "-"];
    const [date, time] = datetime.split(" ");
    return [date, time.slice(0, 8)];
  };

  const filteredUsers = deliverymen.filter((delivery) => {
    const term = searchTerm.toLowerCase();
    return (
      delivery.name?.toLowerCase().includes(term) ||
      delivery.id?.toLowerCase().includes(term) ||
      delivery.email?.toLowerCase().includes(term) ||
      delivery.phone?.toLowerCase().includes(term) ||
      delivery.status?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => setCurrentPage(1), [searchTerm]);

  const openDeletePasscode = (delivery) => {
    setActiveUser(delivery);
    setPasscode("");
    setPasscodeModal(true);
    setTimeout(() => passcodeInputRef.current?.focus(), 500);
  };

  const doDelete = () => {
    if (passcode === "123456") {
      setActionLoading((prev) => ({ ...prev, [activeUser.id]: true }));
      axios
        .delete(`http://38.60.244.108:3000/deliverymen/${activeUser.id}`)
        .then((res) => {
          setDeliverymen((prev) => prev.filter((u) => u.id !== activeUser.id));
          setAlerts((prev) => [...prev, res.data.message || "Deleted successfully"]);
        })
        .catch((err) =>
          setAlerts((prev) => [...prev, err.response?.data?.message || "Delete failed"])
        )
        .finally(() => {
          setActionLoading((prev) => ({ ...prev, [activeUser.id]: false }));
          setPasscodeModal(false);
        });
    } else {
      setAlerts((prev) => [...prev, "Incorrect passcode"]);
    }
  };

  const toggleStatus = (delivery, newStatus) => {
    setActionLoading((prev) => ({ ...prev, [delivery.id]: true }));
    axios
      .patch(`http://38.60.244.108:3000/deliverymen/status/${delivery.id}`, { status: newStatus })
      .then((res) => {
        setDeliverymen((prev) =>
          prev.map((u) => (u.id === delivery.id ? { ...u, status: newStatus } : u))
        );
        setAlerts((prev) => [...prev, res.data.message || "Status updated"]);
      })
      .catch((err) =>
        setAlerts((prev) => [...prev, err.response?.data?.message || "Failed to update status"])
      )
      .finally(() => setActionLoading((prev) => ({ ...prev, [delivery.id]: false })));
  };

  const openEdit = (delivery) => {
    setActiveUser(delivery);
    setEditFormData({
      name: delivery.name || "",
      email: delivery.email || "",
      phone: delivery.phone || "",
      work_type: delivery.work_type || "Full time",
      password: "",
      photo: null,
    });
    setEditModal(true);
  };

  const doEdit = () => {
    if (editPasscode === "123456") {
      const formData = new FormData();
      Object.entries(editFormData).forEach(([key, value]) => value !== null && formData.append(key, value));
      setActionLoading((prev) => ({ ...prev, [activeUser.id]: true }));
      axios
        .put(`http://38.60.244.108:3000/deliverymen/${activeUser.id}`, formData)
        .then((res) => {
          setDeliverymen((prev) =>
            prev.map((u) => (u.id === activeUser.id ? { ...u, ...editFormData } : u))
          );
          setAlerts((prev) => [...prev, res.data.message || "Updated successfully"]);
          setEditPasscodeModal(false);
          setEditModal(false);
        })
        .catch((err) =>
          setAlerts((prev) => [...prev, err.response?.data?.message || "Update failed"])
        )
        .finally(() => setActionLoading((prev) => ({ ...prev, [activeUser.id]: false })));
    } else {
      setAlerts((prev) => [...prev, "Incorrect passcode"]);
    }
  };

  return (
    <div className={`${dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"} min-h-full`}>
      {/* Alerts */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {alerts.map((msg, i) => (
          <div
            key={i}
            className={`${dark ? "bg-purple-800 text-purple-200" : "bg-purple-100 text-purple-700"} px-4 py-2 rounded shadow`}
          >
            {msg}
          </div>
        ))}
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#B476FF] text-white px-6 py-2 rounded-full"
        >
          Add New Delivery Man
        </button>

        <div className="flex items-center gap-2">
          <div className="relative flex items-center w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
            <input
              type="text"
              placeholder="Search deliverymen"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-full border focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm ${
                dark ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-[#B476FF]"
              }`}
            />
          </div>

          <button
            className={`flex items-center gap-1.5 px-3 py-2 text-xs shadow-sm rounded-full ${
              dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-xl shadow-sm overflow-x-auto ${dark ? "bg-gray-800" : "bg-white"}`}>
        <table className="min-w-full text-sm">
          <thead className="bg-[#B476FF] text-white sticky top-0 z-10">
            <tr>
              {["ID","Deliveryman","Email","Phone","Work Type","Orders","Status","Date & Time","Action"].map((col) => (
                <th key={col} className="p-3 text-center">{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={9} className={`${dark ? "text-gray-300" : "text-gray-500"} text-center p-6`}>
                  No results found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((delivery) => (
                <tr
                  key={delivery.id}
                  className={`border-t ${
                    delivery.status === "active"
                      ? dark ? "bg-green-900" : "bg-green-100"
                      : delivery.status === "warning"
                      ? dark ? "bg-red-900" : "bg-red-100"
                      : dark ? "bg-gray-700" : "bg-white"
                  }`}
                >
                  {/* ID */}
                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">{delivery.id}</td>

                  {/* Name + Photo */}
                  <td className="p-1 text-center md:p-3 text-xs md:text-sm flex items-center gap-2">
                    {delivery.photo ? (
                      <img
                        src={`http://38.60.244.108:3000/deliverymen-uploads/${delivery.photo}`}
                        alt={delivery.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#B476FF] flex items-center justify-center text-white font-semibold">
                        {delivery.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <div>{delivery.name}</div>
                  </td>

                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">{delivery.email}</td>
                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">{delivery.phone}</td>
                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">{delivery.work_type}</td>

                  <td className="p-1 text-center md:p-3 text-xs md:text-sm">
                    <div className="flex flex-col">
                      <span>Total: {delivery.total_order}</span>
                      <span>Assigned: {delivery.assign_order}</span>
                    </div>
                  </td>

                  <td className="px-4 py-2 space-x-1">
                    <button
                      onClick={() => toggleStatus(delivery, "active")}
                      disabled={!!actionLoading[delivery.id]}
                      className={`px-2 py-1 text-xs rounded ${
                        delivery.status === "active"
                          ? "bg-green-500 text-white"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => toggleStatus(delivery, "warning")}
                      disabled={!!actionLoading[delivery.id]}
                      className={`px-2 py-1 text-xs rounded ${
                        delivery.status === "warning"
                          ? "bg-red-500 text-white"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      Warning
                    </button>
                  </td>

                  <td className="p-3">
                    {splitDateTime(delivery.created_at)[0]} <br />
                    {splitDateTime(delivery.created_at)[1]}
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      className="px-3 py-1 rounded-full bg-yellow-500 text-white text-xs"
                      onClick={() => openEdit(delivery)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 rounded-full bg-red-500 text-white text-xs flex items-center gap-1"
                      onClick={() => openDeletePasscode(delivery)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className={`px-3 py-1 rounded-full border text-sm ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-full text-sm border ${currentPage === page ? "bg-[#B476FF] text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
          className={`px-3 py-1 rounded-full border text-sm ${currentPage === totalPages || totalPages === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
        >
          Next
        </button>
      </div>

         {/* EDIT PASSCODE MODAL */}
      {editPasscodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setEditPasscodeModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 w-[330px] shadow-2xl border border-purple-200">
            <h3 className="text-lg font-bold text-center mb-4 bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
              Enter Passcode
            </h3>
            <input
              ref={editPasscodeInputRef}
              type="password"
              className="border rounded-lg w-full px-3 py-2 mb-4 focus:ring-2 focus:ring-[#B476FF]"
              placeholder="Passcode"
              value={editPasscode}
              onChange={(e) => setEditPasscode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doEdit()}
            />
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setEditPasscodeModal(false)}
                className="px-4 py-1.5 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={doEdit}
                className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90"
              >
                Confirm
              </button>
            </div>
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

      {/* EDIT FORM MODAL */}
      {editModal && activeUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[450px] p-6 relative">
            <h2 className="text-lg font-semibold mb-4 text-[#B476FF]">
              Edit Delivery Man
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEditModal(false);
                setEditPasscodeModal(true);
              }}
              className="space-y-3"
            >
              {/* ---------- UPDATED PHOTO UI ---------- */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative w-28 h-28">
                  {editFormData.photo ? (
                    <img
                      src={URL.createObjectURL(editFormData.photo)}
                      alt="Profile Preview"
                      className="w-full h-full rounded-full object-cover border-2 border-dashed border-[#B476FF] shadow-sm"
                    />
                  ) : activeUser.photo ? (
                    <img
                      src={`http://38.60.244.108:3000/deliverymen-uploads/${activeUser.photo}`}
                      alt={activeUser.name}
                      className="w-full h-full rounded-full object-cover border-2 border-dashed border-[#B476FF] shadow-sm"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full border-2 border-dashed border-[#B476FF] bg-purple-50 flex items-center justify-center shadow-sm">
                      <span className="text-[#B476FF] font-semibold text-sm">
                        Avatar
                      </span>
                    </div>
                  )}

                  {/* Upload Button */}
                  <label className="cursor-pointer flex items-center justify-center bg-[#B476FF] text-white w-8 h-8 rounded-full hover:bg-[#9b5de5] absolute bottom-0 right-0">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          photo: e.target.files[0],
                        }))
                      }
                      className="hidden"
                    />
                    <Camera className="w-4 h-4" />
                  </label>
                </div>
              </div>

              {/* Name, Email, Phone, Work Type */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded-lg text-sm"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={editFormData.email}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full border px-3 py-2 rounded-lg text-sm"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={editFormData.phone}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className="w-full border px-3 py-2 rounded-lg text-sm"
                required
              />
              <select
                name="work_type"
                value={editFormData.work_type}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    work_type: e.target.value,
                  }))
                }
                className="w-full border px-3 py-2 rounded-lg text-sm"
              >
                <option>Full time</option>
                <option>Part time</option>
              </select>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="px-4 py-2 rounded-lg border text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#B476FF] text-white text-sm"
                >
                  Save
                </button>
              </div>
            </form>

            <button
              onClick={() => setEditModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
