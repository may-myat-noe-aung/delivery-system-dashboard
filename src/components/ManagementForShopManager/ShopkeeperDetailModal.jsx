import React from "react";

function formatDateShort(dtString) {
  if (!dtString) return "-";
  const d = new Date(dtString.replace(" ", "T"));
  if (isNaN(d)) return dtString;
  return d.toLocaleString();
}
const categories = [
  {
    id: 1,
    name: "Fashion",
    icon: "fashion",
  },
  {
    id: 2,
    name: "Food & Restaurant",
    icon: "foodrestaurant",
  },
  {
    id: 3,
    name: "Electronic",
    icon: "electronic",
  },
  {
    id: 4,
    name: "Convenience Shop",
    icon: "convenience",
  },
  {
    id: 5,
    name: "Material",
    icon: "material",
  },
  {
    id: 6,
    name: "Fast Food",
    icon: "fastfood",
  },
  {
    id: 7,
    name: "Snack",
    icon: "snack",
  },
  {
    id: 8,
    name: "Breakfast",
    icon: "breakfast",
  },
  {
    id: 9,
    name: "Cake",
    icon: "cake",
  },
  {
    id: 10,
    name: "Coffee",
    icon: "coffee",
  },
  {
    id: 11,
    name: "Drink",
    icon: "drink",
  },
  {
    id: 12,
    name: "Lunch",
    icon: "lunch",
  },
  {
    id: 13,
    name: "Morning",
    icon: "morning",
  },
  {
    id: 14,
    name: "Sweets",
    icon: "sweets",
  },
  {
    id: 15,
    name: "Other",
    icon: "other",
  },
];

const parseLocation = (loc) => {
  if (!loc) return { lat: null, lon: null, label: "-" };

  const match = loc.match(/Lag\s*([0-9.\-]+),\s*Log\s*([0-9.\-]+)/i);

  if (!match) return { lat: null, lon: null, label: loc };

  const lat = Number(match[1]);
  const lon = Number(match[2]);

  return {
    lat,
    lon,
    label: `📍 ${lat}, ${lon}`,
  };
};

export default function ShopkeeperDetailModal({ open, shop, onClose }) {
  if (!open || !shop) return null;

  const { lat, lon, label } = parseLocation(shop.location);
  const renderCategories = (cats = []) => {
    if (!cats.length) return "-";

    return cats.map((id) => categoryMap[id] || `#${id}`).join(", ");
  };

  const mapUrl =
    lat && lon
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${
          lon - 0.01
        }%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`
      : null;

  const statusColor =
    shop.status === "active"
      ? "text-green-400 bg-green-500/10 border-green-500/30"
      : shop.status === "warning"
        ? "text-red-400 bg-red-500/10 border-red-500/30"
        : "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";

  const permissionColor =
    shop.permission === "approved"
      ? "text-white bg-green-500 border-green-500/30"
      : shop.permission === "pending"
        ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
        : "text-red-400 bg-red-500/10 border-red-500/30";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* MODAL */}
      <div className="relative w-full max-w-5xl bg-[#141826] rounded-3xl shadow-2xl border border-[#2c2f44] text-white overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">
              Shop Details <span className="text-[#B476FF]">#{shop.id}</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10
    flex items-center justify-center text-gray-300 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT PROFILE CARD */}
          <div className="lg:col-span-1">
            <div
              className="
      relative overflow-hidden
      rounded-3xl
      border border-purple-500/20
      bg-gradient-to-b from-[#1b2338] via-[#141b2d] to-[#0f172a]
      py-3 px-4
      shadow-2xl
    "
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

              <div className="absolute top-4 right-4 z-50">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold ${permissionColor}`}
                >
                  {shop.permission}
                </span>
              </div>

              <div className="relative mx-auto size-52">
                {shop.photo ? (
                  <img
                    src={`https://api.pwezayshops.com/shop-uploads/${shop.photo}`}
                    alt={shop.shop_name}
                    className="w-full h-full object-cover rounded-3xl border-4 border-purple-500/20 shadow-xl"
                  />
                ) : (
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-6xl font-bold text-white">
                    {shop.shop_name?.charAt(0)}
                  </div>
                )}
              </div>

              <div className="mt-2 text-center">
                <h3 className="text-2xl font-bold">{shop.shop_name}</h3>

                <p className="text-purple-300">{shop.shopkeeper_name}</p>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs text-slate-400">Phone</p>
                  <p>{shop.phone}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="break-all">{shop.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {/* Categories */}
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-gray-400 mb-3">Categories</p>

              <div className="grid grid-cols-3 gap-3 max-h-[150px] overflow-y-auto">
                {shop.categories?.map((id) => {
                  const category = categories.find((c) => c.id === id);

                  if (!category) return null;

                  return (
                    <div
                      key={id}
                      className="p-2 rounded-xl border border-purple-500 bg-black flex flex-col items-center"
                    >
                      <img
                        src={`/categoriesIcon/${category.icon}.png`}
                        alt={category.name}
                        className="size-12 object-contain"
                      />

                      <p className="text-[11px] text-gray-300 mt-2 text-center">
                        {category.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {[
              ["Items", shop.items],
              ["Created", formatDateShort(shop.created_at)],
            ].map(([k, v]) => (
              <div
                key={k}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
              >
                <p className="text-gray-400 mb-1">{k}</p>

                <p className="text-sm font-medium">{v}</p>
              </div>
            ))}

            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition">
              <p className="text-gray-400 mb-1">Address</p>

              <p className="text-sm font-medium break-words">
                {shop.address || "-"}
              </p>
            </div>
          </div>

          {/* MAP */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-gray-400 text-sm mb-3">Location</p>

              {mapUrl ? (
                <iframe
                  src={mapUrl}
                  className="w-full h-72 rounded-xl border border-white/10"
                  title="map"
                />
              ) : (
                <p className="text-gray-300">{label}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}