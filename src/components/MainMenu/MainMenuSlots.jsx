
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Crown, Store, UtensilsCrossed, Sparkles } from "lucide-react";

const API_URL = "https://api.pwezayshops.com/get-10-main-menu";
const MENU_IMAGE_URL = "https://api.pwezayshops.com/menu-uploads";

const MainMenuSlots = () => {
  const [slots, setSlots] = useState(Array(10).fill(null));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchingRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (fetchingRef.current) return;

    fetchingRef.current = true;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `MSHteam ${token}` } : {}),
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to load main menus.");
      }

      const shops = Array.isArray(result)
        ? result
        : Array.isArray(result?.shops)
          ? result.shops
          : Array.isArray(result?.data?.shops)
            ? result.data.shops
            : [];

      const nextSlots = Array(10).fill(null);

      shops.forEach((item) => {
        const shop = item?.shop || {};
        const menus = Array.isArray(item?.menus) ? item.menus : [];

        menus.forEach((menu) => {
          const position = Number(menu?.main_menu);

          if (
            Number.isInteger(position) &&
            position >= 1 &&
            position <= 10 &&
            !nextSlots[position - 1]
          ) {
            nextSlots[position - 1] = {
              ...menu,
              shop_id: shop.id || menu.shop_id || "",
              shop_name:
                shop.shop_name || menu.shop_name || "Unknown Shop",
            };
          }
        });
      });

      setSlots(nextSlots);
      setError("");
    } catch (err) {
      console.error("Fetch main menus error:", err);
      setError(err.message || "Unable to load main menus.");
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, [fetchData]);

  const getImageUrl = (photo) => {
    if (!photo) return "";

    if (/^https?:\/\//i.test(photo)) return photo;

    return `${MENU_IMAGE_URL}/${String(photo).replace(/^\/+/, "")}`;
  };

  return (
    <section className="mb-5 rounded-xl border border-[#B476FF]/20 bg-gray-900 p-3 text-white shadow-lg sm:p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#B476FF]/30 bg-[#B476FF]/10">
          <Crown size={19} className="text-[#B476FF]" />
        </div>

        <div>
          <h2 className="text-base font-bold text-[#B476FF] sm:text-lg">
            Main Menu List
          </h2>
          <p className="text-xs text-gray-400">
            Featured menus · Positions 1–10
          </p>
        </div>

        <div className="ml-auto rounded-full border border-[#B476FF]/20 bg-[#B476FF]/10 px-2.5 py-1 text-xs font-semibold text-[#B476FF]">
          {slots.filter(Boolean).length}/10
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-3 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
          <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />

          <div>
            <p className="text-xs font-semibold text-red-300">
              Unable to load main menus
            </p>
            <p className="mt-1 break-words text-xs text-red-300/80">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Menu Cards */}
      <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
        {slots.map((menu, index) => {
          const position = index + 1;
          const imageUrl = menu ? getImageUrl(menu.photo) : "";

          return (
            <article
              key={position}
              className={`relative min-w-0 self-start overflow-hidden rounded-xl border transition-all duration-200 ${
                menu
                  ? "border-[#B476FF]/25 bg-gray-800 hover:border-[#B476FF]/60 hover:shadow-md hover:shadow-[#B476FF]/5"
                  : "border-dashed border-gray-700/80 bg-gradient-to-br from-gray-800/60 to-gray-900/80"
              }`}
            >
              {/* Loading Skeleton */}
              {loading && !menu ? (
                <div className="flex animate-pulse items-start gap-3 p-3">
                  <div className="h-[90px] w-[90px] shrink-0 rounded-lg bg-gray-700/80" />

                  <div className="min-w-0 flex-1 space-y-2 pt-1">
                    <div className="h-3 w-12 rounded bg-[#B476FF]/20" />
                    <div className="h-3 w-4/5 rounded bg-gray-700" />
                    <div className="h-3 w-3/5 rounded bg-gray-700" />
                  </div>
                </div>
              ) : menu ? (
                <>
                  {/* Position Badge */}
                  <div className="absolute right-2 top-2 z-10 flex h-6 min-w-6 items-center justify-center rounded-md border border-[#B476FF]/30 bg-gray-950/90 px-1.5 text-[10px] font-bold text-[#B476FF]">
                    {position}
                  </div>

                  {/* Photo + Shop Details */}
                  <div className="flex items-start gap-3 p-3">
                    {/* Menu Photo */}
                    <div className="relative h-[90px] w-[90px] shrink-0 overflow-hidden rounded-lg border border-[#B476FF]/20 bg-gray-900">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={menu.name || "Menu"}
                          loading="eager"
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                            event.currentTarget.nextElementSibling?.classList.remove(
                              "hidden"
                            );
                          }}
                        />
                      )}

                      <div
                        className={`absolute inset-0 flex items-center justify-center ${
                          imageUrl ? "hidden" : ""
                        }`}
                      >
                        <UtensilsCrossed
                          size={24}
                          className="text-gray-600"
                        />
                      </div>
                    </div>

                    {/* Right: Menu Details */}
                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate pr-5 text-[11px] font-semibold text-[#B476FF]"
                        title={menu.shop_id || ""}
                      >
                        {menu.shop_id || "No Shop ID"}
                      </p>

                      <p
                        className="mt-1 truncate text-xs font-medium text-gray-300"
                        title={menu.shop_name || ""}
                      >
                        {menu.shop_name || "Unknown Shop"}
                      </p>

                      <p
                        className="mt-1 truncate text-sm font-bold text-white"
                        title={menu.name || ""}
                      >
                        {menu.name || "Unnamed Menu"}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                /* Empty State */
                <div className="flex items-start gap-3 p-3">
                  <div className="flex h-[90px] w-[90px] shrink-0 flex-col items-center justify-center rounded-lg border border-dashed border-[#B476FF]/20 bg-gray-900/70">
                    <Store size={23} className="text-[#B476FF]/50" />
                    <span className="mt-2 text-[9px] font-medium text-gray-600">
                      NO MENU
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 pt-1">
                    <div className="mb-2 flex items-center gap-1.5">
                      <Sparkles
                        size={13}
                        className="text-[#B476FF]/70"
                      />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B476FF]/80">
                        Menu {position}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-gray-400">
                      Empty Menu
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-gray-600">
                      No main menu assigned yet.
                    </p>

                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

     
    </section>
  );
};

export default MainMenuSlots;
