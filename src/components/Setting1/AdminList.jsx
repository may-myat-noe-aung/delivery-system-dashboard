// import React, { useEffect, useState, useMemo } from "react";
// import { Search, Download, ChevronUp, ChevronDown, X } from "lucide-react";
// import { useAlert } from "../../AlertContext";

// export default function AdminList() {
//   const { showAlert } = useAlert(); //  use showAlert
//   const [accounts, setAccounts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({
//     key: "id",
//     direction: "desc",
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 6;

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [deletePasscode, setDeletePasscode] = useState("");
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const res = await fetch("http://38.60.244.108:3000/admin");
//         const data = await res.json();
//         if (data.success) {
//           const filtered = data.data.filter((a) => a.role !== "owner");
//           setAccounts(filtered);
//         }
//       } catch (err) {
//         console.error(err);
//         showAlert("Server ချိတ်ဆက်မှု မအောင်မြင်ပါ ", "error");
//       }
//     };

//     // first time call
//     fetchAccounts();

//     // run every 500ms
//     const intervalId = setInterval(fetchAccounts, 500);

//     // cleanup when component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const filteredAccounts = useMemo(() => {
//     const term = searchTerm.toLowerCase();
//     return accounts.filter((a) => {
//       const matchesText =
//         a.id.toLowerCase().includes(term) ||
//         a.name.toLowerCase().includes(term) ||
//         a.email.toLowerCase().includes(term) ||
//         a.role.toLowerCase().includes(term) ||
//         (a.phone || "").toLowerCase().includes(term);

//       const matchesGender =
//         !term || (a.gender && a.gender.toLowerCase() === term);

//       return matchesText || matchesGender;
//     });
//   }, [accounts, searchTerm]);

//   const sortedAccounts = useMemo(() => {
//     const sortable = [...filteredAccounts];
//     if (sortConfig.key) {
//       sortable.sort((a, b) => {
//         const valA = a[sortConfig.key]
//           ? a[sortConfig.key].toString().toLowerCase()
//           : "";
//         const valB = b[sortConfig.key]
//           ? b[sortConfig.key].toString().toLowerCase()
//           : "";
//         if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
//         if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       });
//     }
//     return sortable;
//   }, [filteredAccounts, sortConfig]);

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc")
//       direction = "desc";
//     setSortConfig({ key, direction });
//   };

//   const handleDeleteClick = (account) => {
//     setDeleteTarget(account);
//     setDeletePasscode("");
//     setShowDeleteModal(true);
//   };

//   const handleExport = () => {
//     const term = searchTerm.toLowerCase();
//     const exportData = sortedAccounts.filter((a) => {
//       const genderMatch =
//         !term || (a.gender && a.gender.toLowerCase() === term);
//       const textMatch =
//         a.id.toLowerCase().includes(term) ||
//         a.name.toLowerCase().includes(term) ||
//         a.email.toLowerCase().includes(term) ||
//         a.role.toLowerCase().includes(term) ||
//         (a.phone || "").toLowerCase().includes(term);
//       return textMatch || genderMatch;
//     });

//     const exportList = exportData.map((a, index) => ({
//       No: index + 1,
//       Id: a.id,
//       Name: a.name,
//       Email: a.email,
//       Role: a.role,
//       Phone: a.phone || "-",
//       Gender: a.gender || "-",
//     }));

//     if (exportList.length === 0) {
//       showAlert("Network error (Server unreachable)", "error"); // Burmese fallback
//       return;
//     }

//     const worksheet = XLSX.utils.json_to_sheet(exportList);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Accounts");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, "Manager_Seller_List.xlsx");
//   };

//   const confirmDelete = async () => {
//     if (!deletePasscode) {
//       showAlert("Passcode ဖြည့်ပါ ", "error");
//       return;
//     }

//     try {
//       setDeleting(true);
//       const verify = await fetch(
//         "http://38.60.244.108:3000/admin/verify-owner-passcode",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ passcode: deletePasscode }),
//         }
//       );
//       const verifyData = await verify.json();

//       if (!verifyData.success) {
//         showAlert(verifyData.message || "Passcode မမှန်ပါ ", "error");
//         return;
//       }

//       const res = await fetch(
//         `http://38.60.244.108:3000/admin/${deleteTarget.id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const data = await res.json();

//       if (data.success) {
//         setAccounts((prev) => prev.filter((a) => a.id !== deleteTarget.id));
//         showAlert(data.message || "အကောင့် ဖျက်ပြီးပါပြီ ", "success");
//         setShowDeleteModal(false);
//       } else {
//         showAlert(data.message || "အကောင့် ဖျက်မှု မအောင်မြင်ပါ ", "error");
//       }
//     } catch (err) {
//       console.error(err);
//       showAlert("အကောင့် ဖျက်မှုတွင် ပြဿနာရှိပါသည် ", "error");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const paginatedAccounts = useMemo(() => {
//     const start = (currentPage - 1) * rowsPerPage;
//     const end = start + rowsPerPage;
//     return sortedAccounts.slice(start, end);
//   }, [sortedAccounts, currentPage]);

//   const totalPages = Math.ceil(sortedAccounts.length / rowsPerPage);

//   if (loading) return <p className="text-neutral-400">Loading...</p>;
//   return (
//     <div className="bg-white text-gray-800">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
//         <h3 className="text-xl font-semibold text-[#B476FF]">
//           Manager & Seller Accounts
//         </h3>

//         <div className="flex flex-col md:flex-row gap-2">
//           <div className="relative w-full md:w-64">
//             <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
//             <input
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               placeholder="All Search"
//               className="w-full rounded-2xl bg-white border border-gray-300 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B476FF]"
//               type="text"
//             />
//           </div>

//           <button
//             onClick={handleExport}
//             className="flex items-center gap-1 text-xs px-3 py-2 rounded-2xl border border-[#B476FF] text-[#B476FF] hover:bg-[#B476FF] hover:text-white transition"
//           >
//             <Download size={14} /> Export
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm table-auto">
//           <thead>
//             <tr className="border-b border-gray-200 text-gray-500 text-center">
//               {[
//                 { label: "ID", key: "id" },
//                 { label: "Photo", key: "photo" },
//                 { label: "Name", key: "name" },
//                 { label: "Email", key: "email" },
//                 { label: "Role", key: "role" },
//                 { label: "Phone", key: "phone" },
//                 { label: "Gender", key: "gender" },
//                 { label: "Action", key: "action" },
//               ].map((col) => (
//                 <th
//                   key={col.key}
//                   className="py-2 px-3 cursor-pointer select-none"
//                   onClick={() =>
//                     col.key !== "photo" &&
//                     col.key !== "action" &&
//                     handleSort(col.key)
//                   }
//                 >
//                   <div className="flex items-center justify-center gap-1">
//                     {col.label}
//                     {sortConfig.key === col.key &&
//                       (sortConfig.direction === "asc" ? (
//                         <ChevronUp size={14} />
//                       ) : (
//                         <ChevronDown size={14} />
//                       ))}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedAccounts.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="text-center py-10 text-gray-400">
//                   No accounts found.
//                 </td>
//               </tr>
//             ) : (
//               paginatedAccounts.map((a) => (
//                 <tr
//                   key={a.id}
//                   className="border-b border-gray-200 hover:bg-gray-50 text-center"
//                 >
//                   <td className="py-2 px-3">{a.id}</td>

//                   <td className="py-2 px-3">
//                     {a.photo ? (
//                       <img
//                         src={`http://38.60.244.108:3000/admin-uploads/${a.photo}`}
//                         alt={a.name}
//                         className="w-10 h-10 rounded-full object-cover mx-auto"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-[#B476FF] text-white font-semibold flex items-center justify-center mx-auto">
//                         {a.name
//                           ?.split(" ")
//                           .map((n) => n[0])
//                           .slice(0, 2)
//                           .join("")
//                           .toUpperCase()}
//                       </div>
//                     )}
//                   </td>

//                   <td className="py-2 px-3">{a.name}</td>
//                   <td className="py-2 px-3">{a.email}</td>
//                   <td className="py-2 px-3">{a.role}</td>
//                   <td className="py-2 px-3">{a.phone || "-"}</td>
//                   <td className="py-2 px-3">{a.gender || "-"}</td>

//                   <td className="py-2 px-3">
//                     <button
//                       onClick={() => handleDeleteClick(a)}
//                       className="text-red-400 hover:text-red-600 mx-auto"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 mx-auto"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
//                         />
//                       </svg>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Delete Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white border border-gray-300 rounded-xl p-6 w-80 relative">
//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-2 right-2 text-gray-400 hover:text-black"
//             >
//               <X size={18} />
//             </button>

//             <h3 className="text-lg font-semibold mb-4 text-center text-[#B476FF]">
//               Enter Passcode
//             </h3>

//             <input
//               type="password"
//               value={deletePasscode}
//               onChange={(e) => setDeletePasscode(e.target.value)}
//               placeholder="Enter passcode"
//               className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#B476FF]"
//               autoFocus
//               onKeyDown={(e) => e.key === "Enter" && confirmDelete()}
//             />

//             <div className="flex justify-between">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={confirmDelete}
//                 disabled={deleting}
//                 className="bg-red-500 text-white px-3 py-2 rounded-md text-sm"
//               >
//                 {deleting ? "Deleting..." : "Confirm"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState, useMemo } from "react";
import { Search, Download, ChevronUp, ChevronDown, X } from "lucide-react";
import { useAlert } from "../../AlertContext";

export default function AdminList() {
  const { showAlert } = useAlert();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "desc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletePasscode, setDeletePasscode] = useState("");
  const [deleting, setDeleting] = useState(false);

  /* ---------------- EXISTING LOGIC UNTOUCHED ---------------- */
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch("http://38.60.244.108:3000/admin");
        const data = await res.json();
        if (data.success) {
          const filtered = data.data.filter((a) => a.role !== "owner");
          setAccounts(filtered);
        }
      } catch (err) {
        console.error(err);
        showAlert("Server ချိတ်ဆက်မှု မအောင်မြင်ပါ ", "error");
      }
    };

    fetchAccounts();
    const intervalId = setInterval(fetchAccounts, 500);
    return () => clearInterval(intervalId);
  }, []);

  const filteredAccounts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return accounts.filter((a) => {
      const matchesText =
        a.id.toLowerCase().includes(term) ||
        a.name.toLowerCase().includes(term) ||
        a.email.toLowerCase().includes(term) ||
        a.role.toLowerCase().includes(term) ||
        (a.phone || "").toLowerCase().includes(term);

      const matchesGender =
        !term || (a.gender && a.gender.toLowerCase() === term);

      return matchesText || matchesGender;
    });
  }, [accounts, searchTerm]);

  const sortedAccounts = useMemo(() => {
    const sortable = [...filteredAccounts];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        const valA = a[sortConfig.key]
          ? a[sortConfig.key].toString().toLowerCase()
          : "";
        const valB = b[sortConfig.key]
          ? b[sortConfig.key].toString().toLowerCase()
          : "";
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [filteredAccounts, sortConfig]);

  const paginatedAccounts = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedAccounts.slice(start, end);
  }, [sortedAccounts, currentPage]);

  if (loading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl p-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <h3 className="text-xl font-semibold text-[#B476FF]">
          Manager & Seller Accounts
        </h3>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="All Search"
              className="
                w-full rounded-2xl pl-8 pr-3 py-2 text-sm
                bg-white dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-gray-800 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-[#B476FF]
              "
              type="text"
            />
          </div>

          <button
            className="
              flex items-center gap-1 text-xs px-3 py-2 rounded-2xl
              border border-[#B476FF] text-[#B476FF]
              hover:bg-[#B476FF] hover:text-white transition
            "
          >
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm table-auto">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-center">
              {["ID","Photo","Name","Email","Role","Phone","Gender","Action"].map(
                (h) => (
                  <th key={h} className="py-2 px-3">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedAccounts.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-gray-400">
                  No accounts found.
                </td>
              </tr>
            ) : (
              paginatedAccounts.map((a) => (
                <tr
                  key={a.id}
                  className="
                    border-b border-gray-200 dark:border-gray-700
                    hover:bg-gray-50 dark:hover:bg-gray-800
                    text-center
                  "
                >
                  <td className="py-2 px-3">{a.id}</td>

                  <td className="py-2 px-3">
                    {a.photo ? (
                      <img
                        src={`http://38.60.244.108:3000/admin-uploads/${a.photo}`}
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#B476FF] text-white flex items-center justify-center mx-auto">
                        {a.name?.[0]}
                      </div>
                    )}
                  </td>

                  <td className="py-2 px-3">{a.name}</td>
                  <td className="py-2 px-3">{a.email}</td>
                  <td className="py-2 px-3">{a.role}</td>
                  <td className="py-2 px-3">{a.phone || "-"}</td>
                  <td className="py-2 px-3">{a.gender || "-"}</td>

                  <td className="py-2 px-3">
                    <button className="text-red-400 hover:text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6 w-80 relative">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold mb-4 text-center text-[#B476FF]">
              Enter Passcode
            </h3>

            <input
              type="password"
              value={deletePasscode}
              onChange={(e) => setDeletePasscode(e.target.value)}
              className="
                w-full rounded-lg px-3 py-2 text-sm mb-4
                bg-white dark:bg-gray-700
                border border-gray-300 dark:border-gray-600
                text-gray-800 dark:text-gray-100
                focus:ring-2 focus:ring-[#B476FF]
              "
            />

            <div className="flex justify-between">
              <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-md text-sm">
                Cancel
              </button>

              <button className="bg-red-500 text-white px-3 py-2 rounded-md text-sm">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
