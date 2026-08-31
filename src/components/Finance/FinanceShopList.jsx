// import React, { useEffect, useState } from "react";
// import { Store, Search, ChevronRight, Loader2 } from "lucide-react";
// function LoadingRow() {
//   return (
//     <div className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-4">
//       {" "}
//       <div className="flex items-center gap-4">
//         {" "}
//         <div className="h-12 w-12 rounded-xl bg-white/10" />{" "}
//         <div className="flex-1 space-y-2">
//           {" "}
//           <div className="h-4 w-40 rounded bg-white/10" />{" "}
//           <div className="h-3 w-24 rounded bg-white/10" />{" "}
//         </div>{" "}
//       </div>{" "}
//     </div>
//   );
// }
// export default function FinanceShopList({ onSelectShop }) {
//   const [shops, setShops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");
//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         setError("");
//         const res = await fetch("https://api.pwezayshops.com/shops-approve", {
//           method: "GET",
//           headers: { Authorization: `MSHteam ${token}` },
//         });
//         if (!res.ok) {
//           throw new Error(`Request failed: ${res.status}`);
//         }
//         const result = await res.json();
//         if (Array.isArray(result)) {
//           setShops(result);
//         } else if (result.success && Array.isArray(result.data)) {
//           setShops(result.data);
//         } else if (Array.isArray(result.shops)) {
//           setShops(result.shops);
//         } else {
//           setShops([]);
//         }
//       } catch (err) {
//         console.error("Fetch shops error:", err);
//         setError("Failed to load shops.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchShops();
//   }, [token]);
//   const filteredShops = shops.filter((shop) => {
//     const keyword = search.toLowerCase().trim();
//     if (!keyword) return true;
//     return (
//       shop.id?.toLowerCase().includes(keyword) ||
//       shop.shop_name?.toLowerCase().includes(keyword) ||
//       shop.shopkeeper_name?.toLowerCase().includes(keyword) ||
//       shop.phone?.includes(keyword)
//     );
//   });
//   return (
//     <section className="mt-6">
//       {" "}
//       {/* Header */}{" "}
//       <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         {" "}
//         <div>
//           {" "}
//           <h2 className="text-lg font-semibold text-white"> Shops </h2>{" "}
//           <p className="text-sm text-slate-400">
//             {" "}
//             Select a shop to view finance details.{" "}
//           </p>{" "}
//         </div>{" "}
//         {/* Search */}{" "}
//         <div className="relative w-full sm:w-72">
//           {" "}
//           <Search
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//             size={17}
//           />{" "}
//           <input
//             type="text"
//             placeholder="Search shop..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className=" w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-white/20 "
//           />{" "}
//         </div>{" "}
//       </div>{" "}
//       {/* Error */}{" "}
//       {error && (
//         <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
//           {" "}
//           {error}{" "}
//         </div>
//       )}{" "}
//       {/* Loading */}{" "}
//       {loading && (
//         <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//           {" "}
//           {[...Array(6)].map((_, index) => (
//             <LoadingRow key={index} />
//           ))}{" "}
//         </div>
//       )}{" "}
//       {/* Empty */}{" "}
//       {!loading && !error && filteredShops.length === 0 && (
//         <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
//           {" "}
//           <Store className="mx-auto mb-3 text-slate-500" size={32} />{" "}
//           <p className="text-sm text-slate-400"> No shops found. </p>{" "}
//         </div>
//       )}{" "}
//       {/* Shop List */}{" "}
//       {!loading && filteredShops.length > 0 && (
//         <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
//           {" "}
//           {filteredShops.map((shop) => (
//             <button
//               key={shop.id}
//               type="button"
//               onClick={() => onSelectShop(shop)}
//               className=" group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.08] "
//             >
//               {" "}
//               {/* Shop Logo */}{" "}
//               <div className=" flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 ">
//                 {" "}
//                 {shop.logo ? (
//                   <img
//                     src={shop.logo}
//                     alt={shop.shop_name}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <Store className="text-slate-400" size={21} />
//                 )}{" "}
//               </div>{" "}
//               {/* Shop Info */}{" "}
//               <div className="min-w-0 flex-1">
//                 {" "}
//                 <div className="flex items-center gap-2">
//                   {" "}
//                   <h3 className="truncate text-sm font-semibold text-white">
//                     {" "}
//                     {shop.shop_name || "Unknown Shop"}{" "}
//                   </h3>{" "}
//                   <span className=" rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 ">
//                     {" "}
//                     {shop.status || "active"}{" "}
//                   </span>{" "}
//                 </div>{" "}
//                 <p className="mt-1 text-xs text-slate-400">
//                   {" "}
//                   {shop.id} · {shop.shopkeeper_name}{" "}
//                 </p>{" "}
//                 <p className="mt-1 text-xs text-slate-500">
//                   {" "}
//                   {shop.address || "No address"}{" "}
//                 </p>{" "}
//               </div>{" "}
//               {/* Arrow */}{" "}
//               <ChevronRight
//                 size={18}
//                 className=" shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white "
//               />{" "}
//             </button>
//           ))}{" "}
//         </div>
//       )}{" "}
//     </section>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Store,
  User,
  Phone,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Mail,
} from "lucide-react";

function LoadingRow() {
  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-md w-full">
      <div className="animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded bg-gray-700" />

          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-700 rounded w-32" />
            <div className="h-3 bg-gray-700 rounded w-24" />
            <div className="h-3 bg-gray-700 rounded w-28" />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-3 bg-gray-700 rounded w-full" />
          <div className="h-3 bg-gray-700 rounded w-3/4" />
        </div>

        <div className="mt-4 flex justify-end">
          <div className="h-9 bg-gray-700 rounded-md w-28" />
        </div>
      </div>
    </div>
  );
}

export default function FinanceShopList({ onSelectShop }) {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const token = localStorage.getItem("token");

  // =========================
  // RESPONSIVE PAGE SIZE
  // =========================
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1536) {
        setPageSize(8);
      } else if (window.innerWidth >= 768) {
        setPageSize(6);
      } else {
        setPageSize(4);
      }
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // =========================
  // FETCH SHOPS
  // =========================
  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("https://api.pwezayshops.com/shops-approve", {
          method: "GET",
          headers: {
            Authorization: `MSHteam ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const result = await res.json();

        if (Array.isArray(result)) {
          setShops(result);
        } else if (result.success && Array.isArray(result.data)) {
          setShops(result.data);
        } else if (Array.isArray(result.shops)) {
          setShops(result.shops);
        } else {
          setShops([]);
        }
      } catch (err) {
        console.error("Fetch shops error:", err);
        setError("Failed to load shops.");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [token]);

  // =========================
  // SEARCH
  // =========================
  const filteredShops = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return shops;

    return shops.filter((shop) => {
      return (
        (shop.id || "").toLowerCase().includes(term) ||
        (shop.shop_name || "").toLowerCase().includes(term) ||
        (shop.shopkeeper_name || "").toLowerCase().includes(term) ||
        (shop.phone || "").toLowerCase().includes(term)
      );
    });
  }, [shops, searchTerm]);

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

  // =========================
  // PREVENT INVALID PAGE
  // =========================
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <section className="w-full h-full overflow-y-auto scrollbar-hide bg-gray-900 p-4">
      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-5">
        <div>
          <h2 className="text-2xl font-semibold text-[#B476FF]">
            Finance Shops
          </h2>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-[300px]">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
          />

          <input
            type="text"
            placeholder="Search shop, owner or phone..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="pl-10 w-full pr-4 py-2.5 rounded-2xl text-sm bg-slate-900/60 border border-slate-700 text-white outline-none transition focus:border-[#B476FF]"
          />
        </div>
      </div>

      {/* =========================
          ERROR
      ========================= */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* =========================
          LOADING
      ========================= */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <LoadingRow key={index} />
          ))}
        </div>
      )}

      {/* =========================
          CONTENT
      ========================= */}
      {!loading && !error && (
        <>
          {paginatedShops.length > 0 ? (
            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center gap-6">
              {paginatedShops.map((shop) => (
                <div
                  key={shop.id}
                  className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-md w-full max-w-xs flex flex-col gap-4 hover:border-[#B476FF]/60 transition-colors"
                >
                  {/* Shop Name */}
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className="text-lg font-semibold text-[#B476FF] truncate"
                      title={shop.shop_name}
                    >
                      {shop.shop_name || "Unknown Shop"}
                    </p>

                    <span className="text-[10px] px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 shrink-0">
                      {shop.status || "active"}
                    </span>
                  </div>

                  {/* Image + Basic Info */}
                  <div className="flex items-center gap-4">
                    {shop.photo ? (
                      <img
                        src={`https://api.pwezayshops.com/shop-uploads/${shop.photo}`}
                        alt={shop.shop_name}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                      />
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg text-gray-500">
                        <Store size={25} />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-100 mb-2 flex items-center gap-1.5">
                        <User size={15} className="text-[#B476FF] shrink-0" />

                        <span className="truncate">
                          {shop.shopkeeper_name || "Unknown"}
                        </span>
                      </h4>

                      <p className="text-xs text-gray-300 flex items-center gap-1.5 mb-2">
                        <Phone size={14} className="text-[#B476FF] shrink-0" />

                        <span className="truncate">
                          {shop.phone || "No phone"}
                        </span>
                      </p>
                        <p className="text-xs text-gray-300 flex items-center gap-1.5">
                        <Mail size={14} className="text-[#B476FF] shrink-0" />

                        <span className="truncate">
                          {shop.email || "No emaq"}
                        </span>
                      </p>

                      {/* <p className="text-[11px] text-gray-500 mt-2 truncate">
                        ID: {shop.id}
                      </p> */}
                    </div>
                  </div>

                  {/* Address */}
                  {/* <div className="text-xs text-gray-300">
                    <p className="font-semibold text-gray-200 flex items-center gap-1.5 ">
                      <MapPin size={13} className="text-[#B476FF]" />
                      Address
                    </p>

                    <p className="text-gray-400 line-clamp-2 min-h-[32px]">
                      {shop.address || "No address"}
                    </p>
                  </div> */}

                  {/* Button */}
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectShop(shop)}
                      className="flex items-center gap-1.5 bg-[#B476FF] text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-[#9c5bcc] transition-colors"
                    >
                      View Finance
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* =========================
               EMPTY STATE
            ========================= */
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                <Search size={28} className="text-[#B476FF]" />
              </div>

              <h3 className="text-lg font-semibold text-white">
                No Shops Found
              </h3>

              <p className="text-sm text-gray-400 mt-1 max-w-md">
                We couldn’t find any shops matching your search.
              </p>

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#B476FF] hover:bg-[#9c5bcc] text-white text-sm transition"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* =========================
          PAGINATION
      ========================= */}
      {!loading && totalPages > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center px-4 pt-4 pb-2 text-sm text-neutral-400 gap-3">
          <div>
            Page <span className="text-white font-medium">{page}</span> of{" "}
            <span className="text-white font-medium">{totalPages}</span>
            <span className="ml-2 text-neutral-600">
              ({filteredShops.length} shops)
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Previous */}
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md border transition ${
                page === 1
                  ? "border-neutral-800 text-neutral-600 cursor-not-allowed"
                  : "border-neutral-700 text-[#B476FF] hover:bg-neutral-800"
              }`}
            >
              <ChevronLeft size={15} />
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => setPage(number)}
                  className={`min-w-[34px] px-3 py-1.5 rounded-md border transition ${
                    page === number
                      ? "bg-[#B476FF] text-black border-[#B476FF] font-semibold"
                      : "border-neutral-700 text-[#B476FF] hover:bg-neutral-800"
                  }`}
                >
                  {number}
                </button>
              ),
            )}

            {/* Next */}
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md border transition ${
                page === totalPages
                  ? "border-neutral-800 text-neutral-600 cursor-not-allowed"
                  : "border-neutral-700 text-[#B476FF] hover:bg-neutral-800"
              }`}
            >
              Next
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
