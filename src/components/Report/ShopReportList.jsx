// import React, { useState } from "react";
// import {
//   Search,
//   User,
//   Package,
//   Phone,
// } from "lucide-react";

// const ShopReportList = ({ shops, onDetail, onViewShopDetails }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterBy, setFilterBy] = useState("shop_name");

//   // 🔍 SAFE FILTER
//   const filteredShops = shops.filter((shop) => {
//     if (!searchTerm) return true;

//     const term = searchTerm.toLowerCase();

//     return (shop[filterBy] || "")
//       .toString()
//       .toLowerCase()
//       .includes(term);
//   });

//   return (
//     <section className="w-full overflow-y-auto h-full scrollbar-hide bg-gray-900 p-4">

//       {/* 🔥 HEADER */}
//       <div className="sticky top-0 bg-gray-900 z-10 pb-4 space-y-3 flex items-center justify-between">

//         {/* TITLE */}
//         <h1 className="text-xl font-bold text-[#B476FF]">
//          All Shop Report List
//         </h1>

//         {/* SEARCH */}
//         <div className="relative">
//           <Search
//             size={16}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
//           />

//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search shop name, phone..."
//             className="w-full pl-10 pr-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white outline-none focus:border-[#B476FF] transition"
//           />
//         </div>

//       </div>

//       {/* 🧾 CARDS */}
//       <div className="my-6">
//         {filteredShops.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-6">

//             {filteredShops.map((shop) => (
//               <div
//                 key={shop.id}
//                 className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-md w-full max-w-xs flex flex-col gap-4"
//               >

//                 {/* HEADER */}
//                 <div className="flex items-center justify-between">
//                   <p className="text-lg font-semibold text-[#B476FF]">
//                     {shop.shop_name}
//                   </p>
//                 </div>

//                 {/* INFO */}
//                 <div className="flex items-center gap-4">
//                   {shop.photo ? (
//                     <img
//                       src={`https://api.pwezayshops.com/shop-uploads/${shop.photo}`}
//                       alt={shop.shop_name}
//                       className="w-24 h-24 object-cover rounded"
//                     />
//                   ) : (
//                     <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-600 rounded text-gray-400 text-xs">
//                       No Image
//                     </div>
//                   )}

//                   <div className="flex-1">
//                     <h4 className="font-medium text-md text-gray-100 mb-1 flex items-center gap-1">
//                       <User size={16} /> {shop.shopkeeper_name}
//                     </h4>

//                     <p className="text-sm text-gray-300 flex items-center gap-1">
//                       <Package size={15} /> Items: {shop.items}
//                     </p>

//                     <p className="text-sm text-gray-300 flex items-center gap-1">
//                       <Phone size={15} /> {shop.phone}
//                     </p>
//                   </div>
//                 </div>

//                 {/* EMAIL */}
//                 <div className="text-xs text-gray-300">
//                   <p className="font-semibold text-gray-200">Email</p>
//                   <p>{shop.email}</p>
//                 </div>

//                 {/* ADDRESS */}
//                 <div className="text-xs text-gray-300">
//                   <p className="font-semibold text-gray-200">Address</p>
//                   <p>{shop.address}</p>
//                 </div>

//                 {/* BUTTON */}
//                 <div className="flex justify-end">
//                   <button
//                     onClick={() => onDetail(shop.id)}
//                     className="bg-[#B476FF] text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-[#9c5bcc] transition-colors"
//                   >
//                     View All Reports
//                   </button>
//                 </div>

//               </div>
//             ))}

//           </div>
//         ) : (
//           <p className="text-gray-400 text-center mt-6">
//             No shops found.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ShopReportList;

import React, { useState, useMemo, useEffect } from "react";
import { Search, User, Package, Phone } from "lucide-react";

const ShopReportList = ({ shops, onDetail, onViewShopDetails }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("shop_name");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // =========================
  // RESPONSIVE PAGE SIZE
  // =========================
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth > 1280) {
        setPageSize(8);
      } else {
        setPageSize(6);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // =========================
  // MULTI SEARCH (name, phone, email, shop_name)
  // =========================
  const filteredShops = shops.filter((shop) => {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();

    return (
      (shop.shop_name || "").toLowerCase().includes(term) ||
      (shop.shopkeeper_name || "").toLowerCase().includes(term) ||
      (shop.phone || "").toLowerCase().includes(term) ||
      (shop.email || "").toLowerCase().includes(term)
    );
  });

  // =========================
  // RESET PAGE
  // =========================
  useEffect(() => {
    setPage(1);
  }, [searchTerm, pageSize]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(filteredShops.length / pageSize);

  const paginatedShops = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filteredShops.slice(start, end);
  }, [filteredShops, page, pageSize]);

  return (
    <section className="w-full overflow-y-auto h-full scrollbar-hide bg-gray-900 p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-purple-400">
          All Shop Reports
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />

            <input
              type="text"
              placeholder="Search name, phone and email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="pl-10 w-[300px] pr-4 py-2 rounded-2xl text-sm bg-slate-900/60 border border-slate-700 text-white outline-none focus:border-purple-500 "
            />
          </div>
        </div>
      </div>

      {/* 🧾 CONTENT */}
      <div className="my-6">
        {paginatedShops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-6">
            {paginatedShops.map((shop) => (
              <div
                key={shop.id}
                className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-md w-full max-w-xs flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-[#B476FF]">
                    {shop.shop_name}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {shop.photo ? (
                    <img
                      src={`https://api.pwezayshops.com/shop-uploads/${shop.photo}`}
                      alt={shop.shop_name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-600 rounded text-gray-400 text-xs">
                      No Image
                    </div>
                  )}

                  <div className="flex-1">
                    <h4 className="font-medium text-md text-gray-100 mb-1 flex items-center gap-1">
                      <User size={16} /> {shop.shopkeeper_name}
                    </h4>

                    <p className="text-sm text-gray-300 flex items-center gap-1">
                      <Package size={15} /> Items: {shop.items}
                    </p>

                    <p className="text-sm text-gray-300 flex items-center gap-1">
                      <Phone size={15} /> {shop.phone}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-gray-300">
                  <p className="font-semibold text-gray-200">Email</p>
                  <p>{shop.email}</p>
                </div>

                <div className="text-xs text-gray-300">
                  <p className="font-semibold text-gray-200">Address</p>
                  <p>{shop.address}</p>
                </div>

                <div className="flex justify-end">
                  <button
                   onClick={() => onDetail(shop)}
                    className="bg-[#B476FF] text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-[#9c5bcc] transition-colors"
                  >
                    View All Reports
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // =========================
          // ✨ EMPTY STATE CARD
          // =========================
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
              <Search size={28} className="text-[#B476FF]" />
            </div>

            <h3 className="text-lg font-semibold text-white">No Shops Found</h3>

            <p className="text-sm text-gray-400 mt-1 max-w-md">
              We couldn’t find any shops matching your search.
            </p>

            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 rounded-lg bg-[#B476FF] hover:bg-[#9c5bcc] text-white text-sm transition"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* =========================
          PAGINATION UI
      ========================= */}
      {totalPages > 0 && (
        <div className="flex flex-col md:flex-row justify-between px-4 pt-4 text-sm text-neutral-400 gap-2 md:gap-0">
          <p>
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-3 py-1 rounded-md border border-neutral-700 ${
                page === 1
                  ? "text-neutral-500 cursor-not-allowed"
                  : "text-[#B476FF] hover:bg-neutral-900"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`px-3 py-1 rounded-md border border-neutral-700 ${
                  page === n
                    ? "bg-[#B476FF] text-black font-semibold"
                    : "text-[#B476FF] hover:bg-neutral-900"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-3 py-1 rounded-md border border-neutral-700 ${
                page === totalPages
                  ? "text-neutral-500 cursor-not-allowed"
                  : "text-[#B476FF] hover:bg-neutral-900"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShopReportList;
