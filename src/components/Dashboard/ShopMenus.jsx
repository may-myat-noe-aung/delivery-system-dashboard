import React, { useEffect, useMemo, useState } from "react";
import { Store, Utensils, ChevronDown, ChevronUp, Search } from "lucide-react";

export default function ShopMenus() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ NEW STATES (MODAL)
  const [selectedShop, setSelectedShop] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const token = localStorage.getItem("token");

  /* ================= RESPONSIVE PAGE SIZE ================= */
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1536) {
        setPageSize(8);
      } else if (window.innerWidth >= 1280) {
        setPageSize(6);
      } else if (window.innerWidth >= 768) {
        setPageSize(4);
      } else {
        setPageSize(3);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await fetch(
          "https://api.pwezayshops.com/system-menu-branches",
          {
            method: "GET",
            headers: {
              Authorization: `MSHteam ${token}`,
            },
          },
        );

        const result = await res.json();

        if (result.success) {
          setShops(result.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();

    // ✅ FIXED: reduce overload (1s → 5s)
    const interval = setInterval(fetchShops, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ================= SEARCH ================= */
  const filteredShops = useMemo(() => {
    if (!search.trim()) return shops;

    const keyword = search.toLowerCase();

    return shops.filter(
      (shop) =>
        (shop.shop_name || "").toLowerCase().includes(keyword) ||
        (shop.id || "").toLowerCase().includes(keyword),
    );
  }, [shops, search]);

  /* ================= PAGINATION ================= */
  const totalPages = pageSize ? Math.ceil(filteredShops.length / pageSize) : 0;

  const paginatedShops = filteredShops.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // ✅ FIX: reset page safely when data changes
  useEffect(() => {
    const pages = Math.ceil(filteredShops.length / pageSize);
    if (page > pages) {
      setPage(1);
    }
  }, [filteredShops, pageSize, page]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div>
        <div className="h-12 w-72 rounded-xl bg-white/5 animate-pulse mb-6" />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-3xl bg-white/5 border border-white/10 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative  w-full p-6 rounded-3xl shadow-2xl  overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Shop Menus</h2>
          <p className="text-slate-400 text-sm mt-1">
            Total Shops : {filteredShops.length}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />

            <input
              type="text"
              placeholder="Search by Shop Name or ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10 pr-4 py-2 rounded-2xl text-sm bg-slate-900/60 border border-slate-700 text-white outline-none focus:border-purple-500 w-full sm:w-[250px]"
            />
          </div>
        </div>
      </div>

      {/* ================= CARDS ================= */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {paginatedShops.map((shop) => {
          const menus = shop.menus || [];
          const totalPrice = menus.reduce(
            (sum, item) => sum + (item.price || 0),
            0,
          );

          return (
            <div
              key={shop.id}
              className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                      <Store className="w-6 h-6 text-purple-300" />
                    </div>

                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {shop.shop_name}
                      </h3>
                      <p className="text-slate-400 text-sm">{shop.id}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mt-4 items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Menus</p>
                    <p className="text-white font-semibold">{menus.length}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Total Price</p>
                    <p className="text-emerald-400 font-semibold">
                      {totalPrice.toLocaleString()} Ks
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedShop(shop);
                      setShowModal(true);
                    }}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-xl"
                  >
                    Detail
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= MODAL (ONLY UX FIX ADDED) ================= */}
      {showModal && selectedShop && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)} // ✅ added
        >
          <div
            className="relative w-full max-w-xl bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // ✅ added
          >
            <div className="flex items-start justify-between p-5 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {selectedShop.shop_name}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Shop ID:{" "}
                  <span className="text-slate-200">{selectedShop.id}</span>
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-400">
                  Total Menus:{" "}
                  <span className="text-white font-semibold">
                    {(selectedShop.menus || []).length}
                  </span>
                </p>
              </div>

              <div className="max-h-[350px] overflow-y-auto pr-2 space-y-3">
                {(selectedShop.menus || []).length > 0 ? (
                  selectedShop.menus.map((menu) => (
                    <div
                      key={menu.menu_id}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                          <Utensils className="w-5 h-5 text-purple-400" />
                        </div>

                        <p className="text-white font-medium">
                          {menu.menu_name}
                        </p>
                      </div>

                      <p className="text-emerald-400 font-semibold">
                        {Number(menu.price || 0).toLocaleString()} Ks
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-500">
                    No menus available
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGINATION (WINDOW STYLE) ================= */}
      <div className="flex items-center justify-between px-4 pt-6 text-sm text-slate-400   mt-4">
        <p>
          Page <span className="text-white font-semibold">{page}</span> of{" "}
          <span className="text-white font-semibold">{totalPages}</span>
        </p>

        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className={`px-3 py-1 rounded-lg border transition
        ${
          page === 1
            ? "border-slate-700 text-slate-600 cursor-not-allowed"
            : "border-slate-600 text-slate-300 hover:bg-slate-700/40 hover:text-white"
        }`}
          >
            Prev
          </button>

          {/* PAGE NUMBERS (WINDOW STYLE) */}
          <div className="flex gap-1">
            {(() => {
              const maxButtons = 5; // window size
              const half = Math.floor(maxButtons / 2);

              let start = Math.max(1, page - half);
              let end = start + maxButtons - 1;

              if (end > totalPages) {
                end = totalPages;
                start = Math.max(1, end - maxButtons + 1);
              }

              return [...Array(end - start + 1)].map((_, i) => {
                const pageNum = start + i;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 rounded-lg border transition
                ${
                  page === pageNum
                    ? "bg-purple-500/20 border-purple-500 text-purple-300"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700/40 hover:text-white"
                }`}
                  >
                    {pageNum}
                  </button>
                );
              });
            })()}
          </div>

          {/* Next */}
          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className={`px-3 py-1 rounded-lg border transition
        ${
          page === totalPages || totalPages === 0
            ? "border-slate-700 text-slate-600 cursor-not-allowed"
            : "border-slate-600 text-slate-300 hover:bg-slate-700/40 hover:text-white"
        }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
