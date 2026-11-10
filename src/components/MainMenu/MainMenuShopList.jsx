import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Search,
  Store,
  User,
  Phone,
  MapPin,
  UtensilsCrossed,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const API_URL = "https://api.pwezayshops.com/shops-approve";
const IMAGE_URL = "https://api.pwezayshops.com/shop-uploads";

function LoadingCard() {
  return (
    <div className="w-full animate-pulse rounded-xl border border-gray-700 bg-gray-800 p-4 shadow-md">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 shrink-0 rounded-lg bg-gray-700" />

        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-4 w-32 rounded bg-gray-700" />
          <div className="h-3 w-24 rounded bg-gray-700" />
          <div className="h-3 w-28 rounded bg-gray-700" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-gray-700" />
        <div className="h-3 w-3/4 rounded bg-gray-700" />
      </div>

      <div className="mt-4 flex justify-end">
        <div className="h-9 w-28 rounded-md bg-gray-700" />
      </div>
    </div>
  );
}

export default function MainMenuShopList({ onSelectShop }) {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const fetchingRef = useRef(false);
  const initialLoadRef = useRef(true);

  // Fetch approved shops from API
  const fetchShops = useCallback(async () => {
    // Prevent overlapping requests
    if (fetchingRef.current) return;

    fetchingRef.current = true;

    try {
      // Show loading skeleton only during the initial load
      if (initialLoadRef.current) {
        setLoading(true);
      }

      setError("");

      const token = localStorage.getItem("token");

      const headers = {
        Accept: "application/json",
      };

      // Keep the existing authentication format
      if (token) {
        headers.Authorization = `MSHteam ${token}`;
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `Request failed: ${response.status}`
        );
      }

      // /shops-approve returns an array directly
      if (!Array.isArray(result)) {
        throw new Error("Invalid shops response. Expected an array.");
      }

      // Preserve the existing { shop, menus } structure
      const formattedShops = result.map((shop) => ({
        shop,
        menus: [],
      }));

      setShops(formattedShops);
    } catch (err) {
      console.error("Fetch main menu shops error:", err);
      setError(err.message || "Failed to load shops.");
    } finally {
      setLoading(false);
      initialLoadRef.current = false;
      fetchingRef.current = false;
    }
  }, []);

  // Automatically fetch data and refresh every second
  useEffect(() => {
    fetchShops();

    const interval = setInterval(fetchShops, 1000);

    return () => clearInterval(interval);
  }, [fetchShops]);

  // Responsive page size
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

  // Search shops using the actual API fields
  const filteredShops = useMemo(() => {
    const keyword = searchTerm.toLowerCase().trim();

    if (!keyword) return shops;

    return shops.filter(({ shop = {} }) => {
      return [
        shop.id,
        shop.shop_name,
        shop.shopkeeper_name,
        shop.phone,
        shop.email,
        shop.address,
        shop.status,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(keyword)
      );
    });
  }, [shops, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, pageSize]);

  const totalPages = Math.ceil(filteredShops.length / pageSize);

  const paginatedShops = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredShops.slice(start, start + pageSize);
  }, [filteredShops, page, pageSize]);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const getStatusStyle = (status) => {
    switch (String(status ?? "").toLowerCase()) {
      case "active":
        return "border-green-500/20 bg-green-500/10 text-green-400";

      case "warning":
        return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";

      default:
        return "border-gray-600 bg-gray-700 text-gray-400";
    }
  };

  return (
    <section className="h-full w-full overflow-y-auto bg-gray-900 p-4 text-white sm:p-5">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#B476FF]">
            Main Menu Shops
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Select a shop to manage its main menus.
          </p>
        </div>

        {/* Search only - Refresh button removed */}
        <div className="flex w-full gap-2 sm:w-auto">
          <div className="relative w-full sm:w-[300px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search shop, owner or phone..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#B476FF]"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
          <p className="mt-1 text-xs text-red-300/70">
            The page will retry automatically.
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      )}

      {/* Shop Cards */}
      {!loading && !error && (
        <>
          {paginatedShops.length > 0 ? (
            <div className="my-6 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
              {paginatedShops.map((item, index) => {
                const shop = item.shop || {};
                const menus = Array.isArray(item.menus)
                  ? item.menus
                  : [];

                return (
                  <article
                    key={shop.id || index}
                    className="flex w-full max-w-xs flex-col gap-4 rounded-xl border border-gray-700 bg-gray-800 p-4 shadow-md transition-colors hover:border-[#B476FF]/60"
                  >
                    {/* Shop Name and Status */}
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        title={shop.shop_name || ""}
                        className="truncate text-lg font-semibold text-[#B476FF]"
                      >
                        {shop.shop_name?.trim() || "Unknown Shop"}
                      </h3>

                      <span
                        className={`shrink-0 rounded-full border px-2 py-1 text-[10px] ${getStatusStyle(
                          shop.status
                        )}`}
                      >
                        {shop.status || "Unknown"}
                      </span>
                    </div>

                    {/* Image + Shop Information */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
                        {shop.photo ? (
                          <img
                            src={`${IMAGE_URL}/${encodeURIComponent(
                              shop.photo
                            )}`}
                            alt={shop.shop_name || "Shop"}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling?.classList.remove(
                                "hidden"
                              );
                            }}
                          />
                        ) : null}

                        <div
                          className={`flex h-full w-full items-center justify-center text-gray-500 ${
                            shop.photo ? "hidden" : ""
                          }`}
                        >
                          <Store size={25} />
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="mb-2 flex items-center gap-1.5 text-sm text-gray-200">
                          <User
                            size={14}
                            className="shrink-0 text-[#B476FF]"
                          />
                          <span className="truncate">
                            {shop.shopkeeper_name || "Unknown"}
                          </span>
                        </p>

                        <p className="mb-2 flex items-center gap-1.5 text-xs text-gray-300">
                          <Phone
                            size={13}
                            className="shrink-0 text-[#B476FF]"
                          />
                          <span className="truncate">
                            {shop.phone || "No phone"}
                          </span>
                        </p>

                        {/*
                        <p className="flex items-center gap-1.5 text-xs text-gray-400">
                          <UtensilsCrossed
                            size={13}
                            className="shrink-0 text-[#B476FF]"
                          />
                          <span>{menus.length} menus</span>
                        </p>
                        */}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="min-w-0 text-xs text-gray-400">
                      <p className="mb-1 font-medium text-gray-300">
                        Email
                      </p>

                      <p className="truncate">
                        {shop.email || "No email"}
                      </p>
                    </div>

                    {/* Address - preserved as comment */}
                    {/*
                    <div className="min-h-[48px] text-xs text-gray-400">
                      <p className="mb-1 flex items-center gap-1.5 font-medium text-gray-300">
                        <MapPin
                          size={13}
                          className="text-[#B476FF]"
                        />
                        Address
                      </p>

                      <p className="line-clamp-2">
                        {shop.address || "No address"}
                      </p>
                    </div>
                    */}

                    {/* View Menus */}
                    <div className="flex justify-end border-t border-gray-700 pt-3">
                      <button
                        type="button"
                        onClick={() => onSelectShop?.(item)}
                        className="flex items-center gap-1.5 rounded-md bg-[#B476FF] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#9c5bcc]"
                      >
                        View Menus
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
                <Search size={28} className="text-[#B476FF]" />
              </div>

              <h3 className="text-lg font-semibold text-white">
                No Shops Found
              </h3>

              <p className="mt-1 max-w-md text-sm text-gray-400">
                We couldn't find any shops matching your search.
              </p>

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="mt-4 rounded-lg bg-[#B476FF] px-4 py-2 text-sm text-white transition hover:bg-[#9c5bcc]"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex flex-col gap-3 border-t border-gray-800 px-2 pb-2 pt-4 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
              <div>
                Page{" "}
                <span className="font-medium text-white">{page}</span> of{" "}
                <span className="font-medium text-white">
                  {totalPages}
                </span>

                <span className="ml-2 text-neutral-500">
                  ({filteredShops.length} shops)
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="flex items-center gap-1 rounded-md border border-neutral-700 px-3 py-1.5 text-[#B476FF] transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:border-neutral-800 disabled:text-neutral-600"
                >
                  <ChevronLeft size={15} />
                  Prev
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    className={`min-w-[34px] rounded-md border px-3 py-1.5 transition ${
                      page === number
                        ? "border-[#B476FF] bg-[#B476FF] font-semibold text-white"
                        : "border-neutral-700 text-[#B476FF] hover:bg-neutral-800"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex items-center gap-1 rounded-md border border-neutral-700 px-3 py-1.5 text-[#B476FF] transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:border-neutral-800 disabled:text-neutral-600"
                >
                  Next
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}