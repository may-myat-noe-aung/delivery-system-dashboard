// import React, { useEffect, useState, useMemo } from "react";
// import { Search, Download, ChevronUp, ChevronDown, X } from "lucide-react";
// import { useAlert } from "../../AlertContext";

// export default function AdminList() {
//   const { showAlert } = useAlert();
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

//   /* ---------------- EXISTING LOGIC UNTOUCHED ---------------- */
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const res = await fetch("http://38.60.244.137:3000/admin");
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

//     fetchAccounts();
//     const intervalId = setInterval(fetchAccounts, 500);
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

//   const paginatedAccounts = useMemo(() => {
//     const start = (currentPage - 1) * rowsPerPage;
//     const end = start + rowsPerPage;
//     return sortedAccounts.slice(start, end);
//   }, [sortedAccounts, currentPage]);

//   if (loading) return <p className="text-gray-400">Loading...</p>;

//   return (
//     <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl p-4">
//       {/* HEADER */}
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
//               className="
//                 w-full rounded-2xl pl-8 pr-3 py-2 text-sm
//                 bg-white dark:bg-gray-700
//                 border border-gray-300 dark:border-gray-600
//                 text-gray-800 dark:text-gray-100
//                 placeholder-gray-400 dark:placeholder-gray-400
//                 focus:outline-none focus:ring-2 focus:ring-[#B476FF]
//               "
//               type="text"
//             />

//           </div>

//           <button
//             className="
//               flex items-center gap-1 text-xs px-3 py-2 rounded-2xl
//               border border-[#B476FF] text-[#B476FF]
//               hover:bg-[#B476FF] hover:text-white transition
//             "
//           >
//             <Download size={14} /> Export
//           </button>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm table-auto">
//           <thead>
//             <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-center">
//               {["ID","Photo","Name","Email","Role","Phone","Gender","Action"].map(
//                 (h) => (
//                   <th key={h} className="py-2 px-3">
//                     {h}
//                   </th>
//                 )
//               )}
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
//                   className="
//                     border-b border-gray-200 dark:border-gray-700
//                     hover:bg-gray-50 dark:hover:bg-gray-700
//                     text-center
//                   "
//                 >
//                   <td className="py-2 px-3">{a.id}</td>

//                   <td className="py-2 px-3">
//                     {a.photo ? (
//                       <img
//                         src={`http://38.60.244.137:3000/admin-uploads/${a.photo}`}
//                         className="w-10 h-10 rounded-full mx-auto"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-[#B476FF] text-white flex items-center justify-center mx-auto">
//                         {a.name?.[0]}
//                       </div>
//                     )}
//                   </td>

//                   <td className="py-2 px-3">{a.name}</td>
//                   <td className="py-2 px-3">{a.email}</td>
//                   <td className="py-2 px-3">{a.role}</td>
//                   <td className="py-2 px-3">{a.phone || "-"}</td>
//                   <td className="py-2 px-3">{a.gender || "-"}</td>

//                   <td className="py-2 px-3">
//                     <button className="text-red-400 hover:text-red-600">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* DELETE MODAL */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6 w-80 relative">
//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-2 right-2 text-gray-400 hover:text-gray-100"
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
//               className="
//                 w-full rounded-lg px-3 py-2 text-sm mb-4
//                 bg-white dark:bg-gray-700
//                 border border-gray-300 dark:border-gray-600
//                 text-gray-800 dark:text-gray-100
//                 focus:ring-2 focus:ring-[#B476FF]
//               "
//             />

//             <div className="flex justify-between">
//               <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-md text-sm">
//                 Cancel
//               </button>

//               <button className="bg-red-500 text-white px-3 py-2 rounded-md text-sm">
//                 Confirm
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
        const res = await fetch("http://38.60.244.137:3000/admin");
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
  <div className="bg-gray-800 text-gray-200 rounded-xl p-4">
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
              bg-gray-700
              border border-gray-600
              text-gray-100
              placeholder-gray-400
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
          <tr className="border-b border-gray-700 text-gray-400 text-center">
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
                  border-b border-gray-700
                  hover:bg-gray-700
                  text-center
                "
              >
                <td className="py-2 px-3">{a.id}</td>

                <td className="py-2 px-3">
                  {a.photo ? (
                    <img
                      src={`http://38.60.244.137:3000/admin-uploads/${a.photo}`}
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
                  <button className="text-red-400 hover:text-red-500">
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
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-80 relative text-white">
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
              bg-gray-700
              border border-gray-600
              text-white
              focus:ring-2 focus:ring-[#B476FF]
            "
          />

          <div className="flex justify-between">
            <button className="bg-gray-700 text-gray-200 px-3 py-2 rounded-md text-sm">
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