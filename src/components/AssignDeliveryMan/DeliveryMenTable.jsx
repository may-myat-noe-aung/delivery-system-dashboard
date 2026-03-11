// import React, { useEffect, useState, useMemo } from "react";
// import { Search } from "lucide-react";

// export default function DeliveryMenTable() {
//   const [deliverymen, setDeliverymen] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(5);

//   // 🎨 Status Colors
//   const statusColors = {
//     active: "text-green-400",
//     inactive: "text-gray-400",
//     warning: "text-yellow-400",
//     banned: "text-red-400",
//   };

//   // 🔄 Fetch Delivery Men (Auto Refresh)
//   useEffect(() => {
//     const fetchDeliverymen = async () => {
//       try {
//         const res = await fetch(
//           "http://38.60.244.137:3000/deliverymen"
//         );
//         const data = await res.json();

//         setDeliverymen(data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch delivery men.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDeliverymen();

//     const interval = setInterval(fetchDeliverymen, 2000); // change to 500 if needed

//     return () => clearInterval(interval);
//   }, []);

//   // 🔍 Search Filter
//   const filteredData = useMemo(() => {
//     return deliverymen.filter((item) =>
//       item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.id?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [deliverymen, searchTerm]);

//   // Pagination
//   const totalPages = Math.ceil(filteredData.length / pageSize);

//   const paginatedData = filteredData.slice(
//     (page - 1) * pageSize,
//     page * pageSize
//   );

//   useEffect(() => {
//     if (page > totalPages) {
//       setPage(1);
//     }
//   }, [filteredData]);

//   return (
//     <div className=" text-white ">

//       {/* Header */}
//       <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <h2 className="text-2xl font-semibold text-[#B476FF]">
//           All Delivery Men Table
//         </h2>

//         <div className="relative">
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-400" />
//           <input
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search delivery man..."
//             className="rounded-2xl bg-neutral-900 border border-neutral-700 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-[#1a2030]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-6">

//         {loading ? (
//           <div className="text-center text-slate-400 py-10">
//             Loading delivery men...
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-500 py-10">
//             {error}
//           </div>
//         ) : paginatedData.length === 0 ? (
//           <div className="text-center text-slate-400 py-10">
//             No delivery men found.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="text-slate-400 border-b border-slate-700">
//                 <tr>
//                   <th className="py-4 text-left">ID</th>
//                   <th className="py-4 text-left">Name</th>
//                   <th className="py-4 text-left">Email</th>
//                   <th className="py-4 text-left">Phone</th>
//                   <th className="py-4 text-left">Work Type</th>
//                   <th className="py-4 text-left">Rating</th>
//                   <th className="py-4 text-left">Total Orders</th>
//                   <th className="py-4 text-left">Assigned</th>
//                   <th className="py-4 text-left">Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {paginatedData.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="border-b border-slate-800 hover:bg-slate-800/40 transition"
//                   >
//                     <td className="py-4 font-semibold text-cyan-400">
//                       {item.id}
//                     </td>

//                     <td className="py-4 font-semibold">
//                       {item.name}
//                     </td>

//                     <td className="py-4">
//                       {item.email}
//                     </td>

//                     <td className="py-4">
//                       {item.phone}
//                     </td>

//                     <td className="py-4">
//                       {item.work_type}
//                     </td>

//                     <td className="py-4 text-yellow-400 font-semibold">
//                       ⭐ {item.rating}
//                     </td>

//                     <td className="py-4">
//                       {item.total_order}
//                     </td>

//                     <td className="py-4">
//                       {item.assign_order}
//                     </td>

//                     <td
//                       className={`py-4 font-semibold ${
//                         statusColors[item.status?.toLowerCase()] ||
//                         "text-white"
//                       }`}
//                     >
//                       {item.status}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination */}
//             <div className="flex justify-between px-4 pt-4 text-sm text-neutral-400">
//               <p>
//                 Page {totalPages === 0 ? 0 : page} of {totalPages}
//               </p>

//               <div className="flex gap-2">
//                 <button
//                   disabled={page === 1}
//                   onClick={() => setPage(page - 1)}
//                   className="px-3 py-1 rounded-md border border-neutral-700"
//                 >
//                   Prev
//                 </button>

//                 <button
//                   disabled={page === totalPages}
//                   onClick={() => setPage(page + 1)}
//                   className="px-3 py-1 rounded-md border border-neutral-700"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";

export default function DeliveryMenTable() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const statusColors = {
    active: "text-green-400",
    inactive: "text-gray-400",
    warning: "text-yellow-400",
    banned: "text-red-400",
  };

  useEffect(() => {
    const fetchDeliverymen = async () => {
      try {
        const res = await fetch("http://38.60.244.137:3000/deliverymen");
        const data = await res.json();
        setDeliverymen(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch delivery men.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliverymen();
    const interval = setInterval(fetchDeliverymen, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = useMemo(() => {
    return deliverymen.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [deliverymen, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [filteredData]);

  return (
    <div className="text-gray-100 font-sans mb-40">

      {/* Header */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ">
        <h2 className="text-2xl font-bold text-purple-400">
          Delivery Men Table
        </h2>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="rounded-xl bg-gray-800 border border-gray-700 pl-8 pr-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-purple-500/50 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-6">

        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Loading delivery men...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : paginatedData.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No delivery men found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="text-white border-b-2 border-purple-400">
                <tr>
                  <th className="py-3 text-left">ID</th>
                  <th className="py-3 text-left">Name</th>
                  <th className="py-3 text-left">Email</th>
                  <th className="py-3 text-left">Phone</th>
                  <th className="py-3 text-left">Work Type</th>
                  <th className="py-3 text-left">Rating</th>
                  <th className="py-3 text-left">Total Orders</th>
                  <th className="py-3 text-left">Assigned</th>
                  <th className="py-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-purple-400 hover:bg-purple-500/20 transition"
                  >
                    <td className="py-3 font-semibold text-cyan-400">{item.id}</td>
                    <td className="py-3 font-semibold text-white-100">{item.name}</td>
                    <td className="py-3 text-white">{item.email}</td>
                    <td className="py-3 text-white">{item.phone}</td>
                    <td className="py-3 text-white">{item.work_type}</td>
                    <td className="py-3 text-yellow-400 font-semibold">⭐ {item.rating}</td>
                    <td className="py-3 text-white">{item.total_order}</td>
                    <td className="py-3 text-white">{item.assign_order}</td>
                    <td className={`py-3 font-semibold ${statusColors[item.status?.toLowerCase()] || "text-white"}`}>
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between px-4 pt-4 text-sm text-white">
              <p>
                Page {totalPages === 0 ? 0 : page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1 rounded-md border border-white disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1 rounded-md border border-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}