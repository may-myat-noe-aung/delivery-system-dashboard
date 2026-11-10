
import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search, Utensils } from "lucide-react";
import MenuDetailPopup from "../Shop/MenuDetailPopup";
import { apiFetch } from "../../api";
import AddMainMenu from "./AddMainMenu";

const API_BASE = "https://api.pwezayshops.com";
const MENU_IMAGE_BASE = `${API_BASE}/menu-uploads/`;

export default function MainMenuList({ shop, onBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menuToAdd, setMenuToAdd] = useState(null);
  const [menus, setMenus] = useState([]);
  const [shopInfo, setShopInfo] = useState({});
  const [imageVersion, setImageVersion] = useState(Date.now());
  const [loading, setLoading] = useState(true);

  // Get the shop ID from the selected shop.
  const shopId =
    shop?.shop?.shop_id ??
    shop?.shop?.id ??
    shop?.shop_id ??
    shop?.id;

  // Fetch menus from the API.
  useEffect(() => {
    if (!shopId) {
      setMenus([]);
      setShopInfo({});
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchMenus = async () => {
      try {
        setLoading(true);

        const res = await apiFetch(
          `${API_BASE}/menu/${shopId}?t=${Date.now()}`
        );

        if (!res) {
          throw new Error("No response received from the menu API.");
        }

        if (!res.ok) {
          throw new Error(`Failed to fetch menus: ${res.status}`);
        }

        const data = await res.json();

        if (cancelled) return;

        setMenus(Array.isArray(data.menus) ? data.menus : []);
        setShopInfo(data.shop || {});
        setImageVersion(Date.now());
      } catch (error) {
        if (!cancelled) {
          console.error("Fetch menus error:", error);
          setMenus([]);
          setShopInfo({});
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    setSearchTerm("");
    setSelectedMenu(null);
    setMenuToAdd(null);
    fetchMenus();

    return () => {
      cancelled = true;
    };
  }, [shopId]);

  const formatPrices = (prices) => {
    if (!Array.isArray(prices) || prices.length === 0) {
      return "N/A";
    }

    return prices
      .map((item) => `${item.size || "Regular"}: ${item.price} Ks`)
      .join(" • ");
  };

  const filteredMenus = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) return menus;

    return menus.filter((menu) =>
      menu.name?.toLowerCase().includes(keyword)
    );
  }, [menus, searchTerm]);

  const getPhotoUrl = (photo) => {
    if (!photo) return null;

    return `${MENU_IMAGE_BASE}${photo}?t=${imageVersion}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-[#B476FF]" />

        <h3 className="mt-5 text-xl font-semibold text-white">
          Loading Menus
        </h3>

        <p className="mt-1 animate-pulse text-sm text-gray-400">
          Please wait a moment...
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0 text-white">
      {/* HEADER */}
      <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to shops"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-[#B476FF] transition hover:bg-slate-800"
          >
            <ArrowLeft size={20} />
          </button>

          <h2 className="truncate text-xl font-semibold text-purple-400">
            {shopInfo.shop_name || "Shop"}'s Menus
          </h2>
        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-auto">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search Menu Name..."
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 py-2 pl-10 pr-4 text-sm text-white outline-none transition focus:border-purple-500 sm:w-[250px]"
          />
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredMenus.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-700 py-20 shadow-xl">
          <Utensils size={42} className="text-[#B476FF]" />

          <h2 className="mt-4 text-2xl font-semibold">
            {searchTerm ? "No Matching Menus" : "No Menu Available"}
          </h2>

          {searchTerm && (
            <p className="mt-2 text-sm text-gray-400">
              Try searching with another menu name.
            </p>
          )}
        </div>
      ) : (
        /* MENU GRID */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredMenus.map((menu, index) => (
            <div
              key={menu.id ?? `${menu.name}-${index}`}
              className="group overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-lg transition duration-300 hover:border-purple-500/60"
            >
              {/* IMAGE */}
              <div className="relative h-44 overflow-hidden bg-slate-700">
                {menu.photo && (
                  <img
                    src={getPhotoUrl(menu.photo)}
                    alt={menu.name || "Menu"}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";

                      const fallback =
                        event.currentTarget.nextElementSibling;

                      if (fallback) {
                        fallback.style.display = "flex";
                      }
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                <div
                  style={{ display: menu.photo ? "none" : "flex" }}
                  className="absolute inset-0 flex-col items-center justify-center bg-slate-700 text-gray-500"
                >
                  <Utensils size={30} />
                  <span className="mt-2 text-xs">No Image</span>
                </div>

                {/* STATUS */}
                <span
                  className={`absolute right-3 top-3 rounded-full border px-3 py-1 text-xs font-semibold ${
                    menu.open_menu
                      ? "border-green-400 bg-green-500/80 text-white"
                      : "border-red-400 bg-red-500/80 text-white"
                  }`}
                >
                  {menu.open_menu
                    ? "This Menu is Open"
                    : "This Menu is Closed"}
                </span>

                {/* CATEGORY */}
                <span className="absolute left-3 top-3 rounded-full border border-purple-500/90 bg-black/90 px-3 py-1 text-xs text-white">
                  {menu.category || "Food"}
                </span>
              </div>

              {/* CONTENT */}
              <div className="grid min-h-[230px] grid-cols-2 gap-x-3 gap-y-3 p-4">
                {/* MENU NAME */}
                <div className="col-span-2 min-w-0">
                  <h3 className="truncate text-lg font-bold text-white">
                    {menu.name || "Unnamed Menu"}
                  </h3>
                </div>

                {/* DESCRIPTION */}
                <div className="col-span-2 min-w-0">
                  <p className="line-clamp-2 text-xs leading-5 text-gray-400">
                    {menu.description ||
                      "No description available for this menu item."}
                  </p>
                </div>

                {/* PRICE */}
                <div>
                  <p className="break-words text-sm font-semibold text-purple-400">
                    {formatPrices(menu.prices)}
                  </p>
                </div>

                {/* INGREDIENTS */}
                <div className="col-span-2 min-w-0">
                  <p className="mb-1 text-xs font-medium text-gray-500">
                    Ingredients
                  </p>

                  <p className="line-clamp-2 break-words text-xs leading-5 text-gray-300">
                    {menu.relate_ingredients?.length > 0
                      ? menu.relate_ingredients
                          .map((ingredient) => ingredient.name)
                          .filter(Boolean)
                          .join(", ")
                      : "No ingredients"}
                  </p>
                </div>

                {/* ADD MAIN MENU */}
                <div className="col-span-2 mt-auto pt-2">
                  <button
                    type="button"
                    onClick={() => setMenuToAdd(menu)}
                    className="flex w-full items-center justify-center rounded-xl bg-purple-500 py-2.5 font-semibold text-white shadow-md shadow-purple-500/10 transition hover:bg-purple-600 active:scale-[0.98]"
                  >
                    Add Main Menu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MENU DETAILS POPUP - PRESERVED */}
      {selectedMenu && (
        <MenuDetailPopup
          menu={selectedMenu}
          onClose={() => setSelectedMenu(null)}
        />
      )}

      {/* ADD MAIN MENU POPUP */}
      {menuToAdd && (
        <AddMainMenu
          menu={menuToAdd}
          onClose={() => setMenuToAdd(null)}
          onSuccess={() => {
            setMenuToAdd(null);
          }}
        />
      )}
    </div>
  );
}
