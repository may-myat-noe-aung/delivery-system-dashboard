// import React, { useState, useEffect, useRef } from "react";
// import { Camera, Download, Search, Trash2 } from "lucide-react";
// import axios from "axios";
// import { useTheme } from "../ThemeProvider";

// export default function DeliveryTable({ deliveryMen, setShowForm, onOpenChat }) {
//   const { dark } = useTheme(); // get dark mode value

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

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       axios
//         .get("http://38.60.244.137:3000/deliverymen")
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

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

//   useEffect(() => setCurrentPage(1), [searchTerm]);

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
//         .delete(`http://38.60.244.137:3000/deliverymen/${activeUser.id}`)
//         .then((res) => {
//           setDeliverymen((prev) => prev.filter((u) => u.id !== activeUser.id));
//           setAlerts((prev) => [...prev, res.data.message || "Deleted successfully"]);
//         })
//         .catch((err) =>
//           setAlerts((prev) => [...prev, err.response?.data?.message || "Delete failed"])
//         )
//         .finally(() => {
//           setActionLoading((prev) => ({ ...prev, [activeUser.id]: false }));
//           setPasscodeModal(false);
//         });
//     } else {
//       setAlerts((prev) => [...prev, "Incorrect passcode"]);
//     }
//   };

//   const toggleStatus = (delivery, newStatus) => {
//     setActionLoading((prev) => ({ ...prev, [delivery.id]: true }));
//     axios
//       .patch(`http://38.60.244.137:3000/deliverymen/status/${delivery.id}`, { status: newStatus })
//       .then((res) => {
//         setDeliverymen((prev) =>
//           prev.map((u) => (u.id === delivery.id ? { ...u, status: newStatus } : u))
//         );
//         setAlerts((prev) => [...prev, res.data.message || "Status updated"]);
//       })
//       .catch((err) =>
//         setAlerts((prev) => [...prev, err.response?.data?.message || "Failed to update status"])
//       )
//       .finally(() => setActionLoading((prev) => ({ ...prev, [delivery.id]: false })));
//   };

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
//       Object.entries(editFormData).forEach(([key, value]) => value !== null && formData.append(key, value));
//       setActionLoading((prev) => ({ ...prev, [activeUser.id]: true }));
//       axios
//         .put(`http://38.60.244.137:3000/deliverymen/${activeUser.id}`, formData)
//         .then((res) => {
//           setDeliverymen((prev) =>
//             prev.map((u) => (u.id === activeUser.id ? { ...u, ...editFormData } : u))
//           );
//           setAlerts((prev) => [...prev, res.data.message || "Updated successfully"]);
//           setEditPasscodeModal(false);
//           setEditModal(false);
//         })
//         .catch((err) =>
//           setAlerts((prev) => [...prev, err.response?.data?.message || "Update failed"])
//         )
//         .finally(() => setActionLoading((prev) => ({ ...prev, [activeUser.id]: false })));
//     } else {
//       setAlerts((prev) => [...prev, "Incorrect passcode"]);
//     }
//   };

//   return (
//     <div className={`${dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"} min-h-full`}>
//       {/* Alerts */}
//       <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
//         {alerts.map((msg, i) => (
//           <div
//             key={i}
//             className={`${dark ? "bg-purple-800 text-purple-200" : "bg-purple-100 text-purple-700"} px-4 py-2 rounded shadow`}
//           >
//             {msg}
//           </div>
//         ))}
//       </div>

//       {/* Top bar */}
//       <div className="flex items-center justify-between mb-4">
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-[#B476FF] text-white px-6 py-2 rounded-full"
//         >
//           Add New Delivery Man
//         </button>

//         <div className="flex items-center gap-2">
//           <div className="relative flex items-center w-[300px]">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
//             <input
//               type="text"
//               placeholder="Search deliverymen"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className={`w-full pl-10 pr-4 py-2 rounded-full border focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm ${
//                 dark ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-[#B476FF]"
//               }`}
//             />
//           </div>

//           <button
//             className={`flex items-center gap-1.5 px-3 py-2 text-xs shadow-sm rounded-full ${
//               dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
//             }`}
//           >
//             <Download className="h-4 w-4" /> Export
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className={`rounded-xl shadow-sm overflow-x-auto ${dark ? "bg-gray-800" : "bg-white"}`}>
//         <table className="min-w-full text-sm">
//           <thead className="bg-[#B476FF] text-white sticky top-0 z-10">
//             <tr>
//               {["ID","Deliveryman","Email","Phone","Work Type","Orders","Status","Date & Time","Action"].map((col) => (
//                 <th key={col} className="p-3 text-center">{col}</th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedUsers.length === 0 ? (
//               <tr>
//                 <td colSpan={9} className={`${dark ? "text-gray-300" : "text-gray-500"} text-center p-6`}>
//                   No results found.
//                 </td>
//               </tr>
//             ) : (
//               paginatedUsers.map((delivery) => (
//                 <tr
//                   key={delivery.id}
//                   className={`border-t ${
//                     delivery.status === "active"
//                       ? dark ? "bg-green-900" : "bg-green-100"
//                       : delivery.status === "warning"
//                       ? dark ? "bg-red-900" : "bg-red-100"
//                       : dark ? "bg-gray-700" : "bg-white"
//                   }`}
//                 >
//                   {/* ID */}
//                   <td className="p-1 text-center md:p-3 text-xs md:text-sm">{delivery.id}</td>

//                   {/* Name + Photo */}
//                   <td className="p-1 text-center md:p-3 text-xs md:text-sm flex items-center gap-2">
//                     {delivery.photo ? (
//                       <img
//                         src={`http://38.60.244.137:3000/deliverymen-uploads/${delivery.photo}`}
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

//       {/* Pagination */}
//       <div className="flex justify-end items-center gap-2 mt-4">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((p) => p - 1)}
//           className={`px-3 py-1 rounded-full border text-sm ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
//         >
//           Prev
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <button
//             key={page}
//             onClick={() => setCurrentPage(page)}
//             className={`px-3 py-1 rounded-full text-sm border ${currentPage === page ? "bg-[#B476FF] text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
//           >
//             {page}
//           </button>
//         ))}
//         <button
//           disabled={currentPage === totalPages || totalPages === 0}
//           onClick={() => setCurrentPage((p) => p + 1)}
//           className={`px-3 py-1 rounded-full border text-sm ${currentPage === totalPages || totalPages === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
//         >
//           Next
//         </button>
//       </div>

//          {/* EDIT PASSCODE MODAL */}
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
//                       src={`http://38.60.244.137:3000/deliverymen-uploads/${activeUser.photo}`}
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

export default function DeliveryTable({
  deliveryMen,
  setShowForm,
  onOpenChat,
}) {
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
        .get("http://38.60.244.137:3000/deliverymen")
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
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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
        .delete(`http://38.60.244.137:3000/deliverymen/${activeUser.id}`)
        .then((res) => {
          setDeliverymen((prev) => prev.filter((u) => u.id !== activeUser.id));
          setAlerts((prev) => [
            ...prev,
            res.data.message || "Deleted successfully",
          ]);
        })
        .catch((err) =>
          setAlerts((prev) => [
            ...prev,
            err.response?.data?.message || "Delete failed",
          ]),
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
      .patch(`http://38.60.244.137:3000/deliverymen/status/${delivery.id}`, {
        status: newStatus,
      })
      .then((res) => {
        setDeliverymen((prev) =>
          prev.map((u) =>
            u.id === delivery.id ? { ...u, status: newStatus } : u,
          ),
        );
        setAlerts((prev) => [...prev, res.data.message || "Status updated"]);
      })
      .catch((err) =>
        setAlerts((prev) => [
          ...prev,
          err.response?.data?.message || "Failed to update status",
        ]),
      )
      .finally(() =>
        setActionLoading((prev) => ({ ...prev, [delivery.id]: false })),
      );
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
      Object.entries(editFormData).forEach(
        ([key, value]) => value !== null && formData.append(key, value),
      );
      setActionLoading((prev) => ({ ...prev, [activeUser.id]: true }));
      axios
        .put(`http://38.60.244.137:3000/deliverymen/${activeUser.id}`, formData)
        .then((res) => {
          setDeliverymen((prev) =>
            prev.map((u) =>
              u.id === activeUser.id ? { ...u, ...editFormData } : u,
            ),
          );
          setAlerts((prev) => [
            ...prev,
            res.data.message || "Updated successfully",
          ]);
          setEditPasscodeModal(false);
          setEditModal(false);
        })
        .catch((err) =>
          setAlerts((prev) => [
            ...prev,
            err.response?.data?.message || "Update failed",
          ]),
        )
        .finally(() =>
          setActionLoading((prev) => ({ ...prev, [activeUser.id]: false })),
        );
    } else {
      setAlerts((prev) => [...prev, "Incorrect passcode"]);
    }
  };

  return (
    <div
      className={`${dark ? "bg-[#0f172a] text-gray-100" : "bg-gray-50 text-gray-900"} min-h-full p-6`}
    >
      {/* Alerts */}
      <div className="fixed top-6 right-6 flex flex-col gap-3 z-50">
        {alerts.map((msg, i) => (
          <div
            key={i}
            className="px-4 py-2 rounded-xl shadow-lg backdrop-blur-md bg-[#B476FF]/90 text-white text-sm animate-fadeIn"
          >
            {msg}
          </div>
        ))}
      </div>

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-[#B476FF] to-purple-600 text-white px-6 py-2.5 rounded-full shadow-md hover:opacity-90 transition"
        >
          + Add New Delivery Man
        </button>

        <div className="flex items-center gap-3">
          <div className="relative w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B476FF]" />
            <input
              type="text"
              placeholder="Search deliverymen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-4 py-2.5 rounded-full border text-sm shadow-sm focus:ring-2 focus:ring-[#B476FF] transition ${
                dark
                  ? "bg-[#1e293b] border-slate-700 text-gray-200"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>

          <button
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border shadow-sm transition hover:shadow-md ${
              dark
                ? "bg-[#1e293b] border-slate-700 text-gray-200"
                : "bg-white border-gray-300"
            }`}
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div
        className={`rounded-2xl overflow-hidden shadow-xl backdrop-blur-xl border ${
          dark ? "bg-[#1e293b]/80 border-slate-700" : "bg-white border-gray-200"
        }`}
      >
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-[#B476FF] to-purple-600 text-white">
            <tr>
              {[
                "ID",
                "Deliveryman",
                "Email",
                "Phone",
                "Work Type",
                "Orders",
                "Status",
                "Date & Time",
                "Action",
              ].map((col) => (
                <th
                  key={col}
                  className="p-4 text-center font-medium tracking-wide"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-8 text-gray-400">
                  No results found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((delivery) => (
      <tr
  key={delivery.id}
  className={`border-t transition-all duration-300 ${
    delivery.status === "active"
      ? dark
        ? "bg-green-900/30 hover:bg-green-900/40 border-green-700"
        : "bg-green-50 hover:bg-green-100 border-green-200"
      : delivery.status === "warning"
      ? dark
        ? "bg-red-900/30 hover:bg-red-900/40 border-red-700"
        : "bg-red-50 hover:bg-red-100 border-red-200"
      : dark
      ? "hover:bg-slate-800 border-slate-700"
      : "hover:bg-gray-50 border-gray-200"
  }`}
>
                  <td className="p-4 text-center">{delivery.id}</td>

                  <td className="p-4 flex items-center gap-3 justify-center">
                    {delivery.photo ? (
                      <img
                        src={`http://38.60.244.137:3000/deliverymen-uploads/${delivery.photo}`}
                        alt={delivery.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-[#B476FF]/40"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#B476FF] flex items-center justify-center text-white font-semibold">
                        {delivery.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <span>{delivery.name}</span>
                  </td>

                  <td className="p-4 text-center">{delivery.email}</td>
                  <td className="p-4 text-center">{delivery.phone}</td>
                  <td className="p-4 text-center">{delivery.work_type}</td>

                  <td className="p-4 text-center">
                    <div className="flex flex-col text-xs">
                      <span>Total: {delivery.total_order}</span>
                      <span>Assigned: {delivery.assign_order}</span>
                    </div>
                  </td>

                  {/* STATUS BADGE */}
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => toggleStatus(delivery, "active")}
                        disabled={!!actionLoading[delivery.id]}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          delivery.status === "active"
                            ? "bg-green-500 text-white shadow-md"
                            : "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        } ${actionLoading[delivery.id] ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        Active
                      </button>

                      <button
                        onClick={() => toggleStatus(delivery, "warning")}
                        disabled={!!actionLoading[delivery.id]}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          delivery.status === "warning"
                            ? "bg-red-500 text-white shadow-md"
                            : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        } ${actionLoading[delivery.id] ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        Warning
                      </button>
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    {splitDateTime(delivery.created_at)[0]} <br />
                    {splitDateTime(delivery.created_at)[1]}
                  </td>

                  <td className="p-4 flex gap-2 justify-center">
                    <button
                      onClick={() => openEdit(delivery)}
                      className="px-3 py-1.5 rounded-full bg-yellow-500/90 text-white text-xs hover:opacity-90 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeletePasscode(delivery)}
                      className="px-3 py-1.5 rounded-full bg-red-500/90 text-white text-xs flex items-center gap-1 hover:bg-red-600 transition shadow-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
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
      <div className="flex justify-end items-center gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-1.5 rounded-full border text-sm hover:bg-[#B476FF]/10 disabled:opacity-40 transition"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-1.5 rounded-full text-sm border transition ${
              currentPage === page
                ? "bg-[#B476FF] text-white border-[#B476FF]"
                : "hover:bg-[#B476FF]/10"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-1.5 rounded-full border text-sm hover:bg-[#B476FF]/10 disabled:opacity-40 transition"
        >
          Next
        </button>
      </div>
{/* DELETE PASSCODE */}
      {passcodeModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setPasscodeModal(false)}
    />

    <div className={`relative w-[360px] rounded-2xl p-6 shadow-2xl border ${
      dark
        ? "bg-[#1e293b] border-slate-700 text-gray-200"
        : "bg-white border-gray-200 text-gray-800"
    }`}>
      
      <h3 className="text-lg font-semibold text-center mb-2">
        Confirm Delete
      </h3>

      {/* <p className="text-sm text-center text-gray-400 mb-4">
        Enter passcode to permanently delete this delivery man.
      </p> */}

      <input
        ref={passcodeInputRef}
        type="password"
        placeholder="Enter passcode"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && doDelete()}
        className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#B476FF] mb-4 text-sm
        dark:bg-[#0f172a] dark:border-slate-600"
      />

      <div className="flex justify-between items-center">
        <button
          onClick={() => setPasscodeModal(false)}
          className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition"
        >
          Cancel
        </button>

        <button
          onClick={doDelete}
          className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm hover:bg-red-600 transition shadow"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

{/* edit passcode */}
{editPasscodeModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setEditPasscodeModal(false)}
    />

    <div className={`relative w-[360px] rounded-2xl p-6 shadow-2xl border ${
      dark
        ? "bg-[#1e293b] border-slate-700 text-gray-200"
        : "bg-white border-gray-200 text-gray-800"
    }`}>
      
      <h3 className="text-lg font-semibold text-center mb-4">
        Enter Passcode
      </h3>

      <input
        ref={editPasscodeInputRef}
        type="password"
        placeholder="Enter passcode"
        value={editPasscode}
        onChange={(e) => setEditPasscode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && doEdit()}
        className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#B476FF] mb-4 text-sm
        dark:bg-[#0f172a] dark:border-slate-600"
      />

      <div className="flex justify-between">
        <button
          onClick={() => setEditPasscodeModal(false)}
          className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition"
        >
          Cancel
        </button>

        <button
          onClick={doEdit}
          className="px-4 py-2 rounded-xl bg-[#B476FF] text-white text-sm hover:opacity-90 transition shadow"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

{/* EDIT FORM MODAL */}
{editModal && activeUser && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
    <div
      className={`rounded-3xl w-[480px] p-8 relative border transition-all duration-300 shadow-[0_25px_80px_rgba(0,0,0,0.25)] 
        ${dark ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-900"}`}
    >
      <h2 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
        Edit Delivery Man
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setEditModal(false);
          setEditPasscodeModal(true);
        }}
        className="space-y-4"
      >
        {/* ---------- UPDATED PHOTO UI ---------- */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 group">
            {editFormData.photo ? (
              <img
                src={URL.createObjectURL(editFormData.photo)}
                alt="Profile Preview"
                className={`w-full h-full rounded-full object-cover border-4 shadow-xl ring-2 transition-all duration-300 ${
                  dark ? "border-gray-800 ring-gray-600/40" : "border-white ring-[#B476FF]/40"
                }`}
              />
            ) : activeUser.photo ? (
              <img
                src={`http://38.60.244.137:3000/deliverymen-uploads/${activeUser.photo}`}
                alt={activeUser.name}
                className={`w-full h-full rounded-full object-cover border-4 shadow-xl ring-2 transition-all duration-300 ${
                  dark ? "border-gray-800 ring-gray-600/40" : "border-white ring-[#B476FF]/40"
                }`}
              />
            ) : (
              <div
                className={`w-full h-full rounded-full flex items-center justify-center shadow-inner ring-2 transition-all duration-300 ${
                  dark
                    ? "bg-gray-800 ring-gray-600/30"
                    : "bg-gradient-to-br from-purple-100 to-purple-200 ring-[#B476FF]/30"
                }`}
              >
                <span className={`font-semibold text-sm ${dark ? "text-gray-200" : "text-[#B476FF]"}`}>
                  Avatar
                </span>
              </div>
            )}

            {/* Upload Button */}
            <label
              className={`cursor-pointer flex items-center justify-center w-9 h-9 rounded-full shadow-lg absolute bottom-1 right-1 transition-all duration-200 ${
                dark
                  ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                  : "bg-gradient-to-r from-[#B476FF] to-purple-600 text-white hover:scale-110"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditFormData((prev) => ({ ...prev, photo: e.target.files[0] }))
                }
                className="hidden"
              />
              <Camera className="w-4 h-4" />
            </label>
          </div>
        </div>

        {/* Inputs */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={editFormData.name}
          onChange={(e) =>
            setEditFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:ring-2 focus:border-gray-500 transition-all duration-200 ${
            dark ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-300 text-gray-900"
          }`}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={editFormData.email}
          onChange={(e) =>
            setEditFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:ring-2 focus:border-gray-500 transition-all duration-200 ${
            dark ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-300 text-gray-900"
          }`}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={editFormData.phone}
          onChange={(e) =>
            setEditFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:ring-2 focus:border-gray-500 transition-all duration-200 ${
            dark ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-300 text-gray-900"
          }`}
          required
        />

        <select
          name="work_type"
          value={editFormData.work_type}
          onChange={(e) =>
            setEditFormData((prev) => ({ ...prev, work_type: e.target.value }))
          }
          className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:ring-2 focus:border-gray-500 transition-all duration-200 ${
            dark ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <option>Full time</option>
          <option>Part time</option>
        </select>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setEditModal(false)}
            className={`px-5 py-2 rounded-xl text-sm border transition-all duration-200 ${
              dark ? "border-gray-700 text-gray-100 hover:bg-gray-700" : "border-gray-300 text-gray-900 hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-5 py-2 rounded-xl text-sm font-medium shadow-lg transition-all duration-200 ${
              dark ? " bg-purple-500 hover:bg-purple-600 text-gray-100 " : "bg-gradient-to-r from-[#B476FF] to-purple-600 text-white hover:opacity-95"
            }`}
          >
            Save Changes
          </button>
        </div>
      </form>

      <button
        onClick={() => setEditModal(false)}
        className={`absolute top-4 right-4 transition ${
          dark ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-700"
        }`}
      >
        ✕
      </button>
    </div>
  </div>
)}
    </div>
  );
}
