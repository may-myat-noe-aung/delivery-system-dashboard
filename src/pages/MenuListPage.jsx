
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MenuDetailPopup from "../components/Shop/MenuDetailPopup";
import { Search, Utensils } from "lucide-react";
import { apiFetch } from "../api";

export default function MenuListPage() {
  const token = localStorage.getItem("token");
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  const [shopInfo, setShopInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [imageVersion, setImageVersion] = useState(Date.now());

  const [searchTerm, setSearchTerm] = useState(""); // ✅ FIX INCLUDED

  // ================= PAGINATION =================
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

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

  useEffect(() => {
    setPage(1);
  }, [shopId]);

  // ✅ RESET PAGE WHEN SEARCH CHANGES (IMPORTANT FIX)
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const formatPrices = (prices) => {
    if (!Array.isArray(prices)) return "N/A";
    return prices.map((p) => `${p.size}: ${p.price} Ks`).join(" • ");
  };

  const fetchMenus = async () => {
    try {
const res = await apiFetch(
  `https://api.pwezayshops.com/menu/${shopId}?t=${Date.now()}`
);

if (!res) return;

const data = await res.json();

setMenus(data.menus || []);
setShopInfo(data.shop || {});
setImageVersion(Date.now());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH FILTER =================
  const filteredMenus = useMemo(() => {
    if (!searchTerm) return menus;

    const t = searchTerm.toLowerCase();

    return menus.filter((m) =>
      m.name?.toLowerCase().includes(t)
    );
  }, [menus, searchTerm]);

  useEffect(() => {
    if (!shopId) return;
    setLoading(true);
    fetchMenus();
  }, [shopId]);

  useEffect(() => {
    if (!shopId) return;

    const interval = setInterval(() => {
      fetchMenus();
    }, 1000);

    return () => clearInterval(interval);
  }, [shopId]);

  const getPhotoUrl = (photo) =>
    photo ? `https://api.pwezayshops.com/menu-uploads/${photo}` : null;

  // ================= PAGINATION FIX =================
  const totalPages = Math.ceil(filteredMenus.length / pageSize);

  const paginatedMenus = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    // ✅ FIX: use filteredMenus (NOT menus)
    return filteredMenus.slice(start, end);
  }, [filteredMenus, page, pageSize]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-14 h-14 border-4 border-slate-700 border-t-[#B476FF] rounded-full animate-spin"></div>

        <h3 className="mt-5 text-xl font-semibold text-white">
          Loading Menus
        </h3>

        <p className="mt-1 text-sm text-gray-400 animate-pulse">
          Please wait a moment...
        </p>
      </div>
    );
  }

  return (
    <div className=" text-white ">
      {/* HEADER */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-[#B476FF] hover:bg-slate-800 transition"
          >
            ←
          </button>

          <h2 className="text-xl font-semibold text-purple-400">
            {shopInfo.shop_name || "Shop"}'s Menus
          </h2>
        </div>

        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
          />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Menu Name..."
            className="pl-10 pr-4 py-2 rounded-2xl text-sm bg-slate-900/60 border border-slate-700 text-white outline-none focus:border-purple-500 w-full sm:w-[250px]"
          />
        </div>
      </div>

      {/* EMPTY (FIXED) */}
      {filteredMenus.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-slate-700 rounded-3xl shadow-xl">
          <Utensils size={42} className="text-[#B476FF]" />
          <h2 className="text-2xl font-semibold mt-4">No Menu Available</h2>
        </div>
      ) : (
        <>
          {/* GRID (UNCHANGED UI) */}
          <div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
            {paginatedMenus.map((m) => (
              <div
                key={m.id}
                className="group bg-gradient-to-b border border-slate-700 rounded-2xl overflow-hidden shadow-lg"
              >
                {/* IMAGE */}
                <div className="relative h-44 overflow-hidden">
                  {m.photo ? (
                    <img
                      src={`${getPhotoUrl(m.photo)}?t=${imageVersion}`}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-700 text-gray-500">
                      No Image
                    </div>
                  )}

                  {/* STATUS (FIXED COLOR BUG) */}
                  <span
                    className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${m.open_menu
                        ? "bg-green-500/80 text-white border border-green-400"
                        : "bg-red-500/80 text-white border border-red-400"
                      }`}
                  >
                    {m.open_menu ? "This Menu is Open" : "This Menu is Closed"}
                  </span>

                  <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-black/90 text-white border border-purple-500/90">
                    {m.category || "Food"}
                  </span>
                </div>

                {/* CONTENT (UNCHANGED) */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white truncate">
                    {m.name}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2">
                    {m.description ||
                      "No description available for this menu item."}
                  </p>

                  <p className="text-sm text-gray-300 mt-1">
                    <span className="text-purple-400 font-semibold">
                      {formatPrices(m.prices)}
                    </span>
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {m.relate_ingredients?.length > 0 ? (
                      <span className="text-gray-300">
                        {m.relate_ingredients.map((i) => i.name).join(", ")}
                      </span>
                    ) : (
                      <span className="text-red-400">No ingredients</span>
                    )}
                  </p>

                  <button
                    onClick={() => setSelectedMenu(m)}
                    className="mt-3 bg-purple-500 hover:bg-purple-600 transition text-white py-2 rounded-xl font-semibold shadow-md shadow-purple-500/10"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION (UNCHANGED UI) */}
          <div className="flex flex-col md:flex-row justify-between px-4 pt-4 text-sm text-neutral-400 gap-2 md:gap-0">
            <p>
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-2 flex-wrap">
              <button
                disabled={page === 1}
                onClick={() => setPage(Math.max(1, page - 1))}
                className={`px-3 py-1 rounded-md border border-neutral-700 ${page === 1
                    ? "text-neutral-500 cursor-not-allowed"
                    : "text-purple-400 hover:bg-neutral-900"
                  }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`px-3 py-1 rounded-md border border-neutral-700 ${page === n
                        ? "bg-purple-300 text-black font-semibold"
                        : "text-purple-300 hover:bg-neutral-900"
                      }`}
                  >
                    {n}
                  </button>
                )
              )}

              <button
                disabled={page === totalPages}
                onClick={() =>
                  setPage(Math.min(totalPages, page + 1))
                }
                className={`px-3 py-1 rounded-md border border-neutral-700 ${page === totalPages
                    ? "text-neutral-500 cursor-not-allowed"
                    : "text-purple-500 hover:bg-neutral-900"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* MODAL (UNCHANGED) */}
      {selectedMenu && (
        <MenuDetailPopup
          menu={selectedMenu}
          onClose={() => {
            setSelectedMenu(null);
            fetchMenus();
          }}
        />
      )}
    </div>
  );
}