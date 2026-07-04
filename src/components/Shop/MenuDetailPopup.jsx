import React, { useEffect, useState } from "react";
import {
  X,
  Tag,
  DollarSign,
  FileText,
  CheckCircle,
  Star,
  CalendarDays,
  Layers,
} from "lucide-react";

export default function MenuDetailPopup({ menu, onClose }) {
  const [data, setData] = useState(menu);
  const [loading, setLoading] = useState(true);

  // ================= SYNC =================
  useEffect(() => {
    if (!menu) return;

    const t = setTimeout(() => {
      setData(menu);
      setLoading(false);
    }, 200);

    return () => clearTimeout(t);
  }, [menu]);

  if (!menu) return null;

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
        <p className="text-white text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  // ================= IMAGE HELPER =================
  const getPhotoUrl = (type, photo) => {
    if (!photo) return null;
    return `https://api.pwezayshops.com/${type}-uploads/${photo}`;
  };

  // ================= PRICE FORMAT =================
  const formatPrices = (prices) => {
    if (!Array.isArray(prices)) return "-";

    return prices
      .map((p) => (typeof p === "object" ? `${p.size}: ${p.price} Ks` : p))
      .join(" • ");
  };

  const getCategory = () => {
    if (!data?.category) return "-";
    return data.category.charAt(0).toUpperCase() + data.category.slice(1);
  };
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-white w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 relative shadow-2xl border border-gray-700">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-800 hover:bg-red-500 transition p-2 rounded-full shadow-lg"
        >
          <X size={20} />
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-purple-400 mb-4">
          {data.name}
        </h2>

        {/* TOP SECTION - HERO STYLE */}
        <div className="space-y-5">
          {/* IMAGE HERO */}
          <div className="relative w-full">
            {data.photo ? (
              <div className="relative group">
                <img
                  src={getPhotoUrl("menu", data.photo)}
                  className="w-full h-[200px] object-cover rounded-3xl shadow-2xl border border-gray-700"
                />

                {/* dark overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* floating title on image */}
                <div className="absolute bottom-5 left-5">
                  <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                    {data.name}
                  </h2>
                  <p className="text-sm text-gray-300">ID: {data.id}</p>
                </div>
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 text-gray-400 shadow-lg">
                No Image Available
              </div>
            )}
          </div>

          {/* INFO SECTION */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl p-6 rounded-3xl border border-gray-700 shadow-2xl space-y-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-200">
                Menu Details
              </h3>

              {data.open_menu == 1 ? (
                <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                  This Menu is Open
                </span>
              ) : (
                <span className="px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                  This Menu is Closed
                </span>
              )}
            </div>

            <div className="grid gap-2">
              {/* ROW 1 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-2">
                  <Info icon={Tag} label="Category" value={getCategory()} />
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-2">
                  <Info
                    icon={CalendarDays}
                    label="Created"
                    value={data.created_at}
                  />
                </div>
              </div>

              {/* ROW 2 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-2">
                  <Info
                    icon={CheckCircle}
                    label="Complete Orders"
                    value={data.complete_order}
                  />
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-2">
                  <Info
                    icon={Star}
                    label="Rating"
                    value={`${data.rating} (${data.rating_count})`}
                  />
                </div>
              </div>

              {/* PRICE */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2">
                <Info
                  icon={DollarSign}
                  label="Price"
                  value={formatPrices(data.prices)}
                />
              </div>

              {/* DESCRIPTION */}
              <div className="bg-gray-500/10 border border-gray-500/20 rounded-xl p-2">
                <Info
                  icon={FileText}
                  label="Description"
                  value={data.description || "-"}
                />
              </div>

              {/* MONTHS */}
              <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-2">
                <Info
                  icon={Layers}
                  label="Available Months"
                  value={data.get_months?.join(", ") || "-"}
                />
              </div>
            </div>
          </div>
        </div>
        {/* RELATED MENU */}
        <Section title="Relate Menu" items={data.relate_menu} type="menu" />

        {/* INGREDIENTS */}
        <Section
          title="Relate Ingredients"
          items={data.relate_ingredients}
          type="ingredient"
        />
      </div>
    </div>
  );
}

/* ================= INFO ================= */
const Info = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/40 transition">
    <Icon className="text-purple-400 mt-1" size={18} />
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-gray-100">{value}</p>
    </div>
  </div>
);

/* ================= SECTION ================= */
const Section = ({ title, items = [], type }) => {
  const getPhotoUrl = (photo) => {
    if (!photo) return null;

    const folder =
      type === "ingredient" ? "ingredients-uploads" : "menu-uploads";

    return `https://api.pwezayshops.com/${folder}/${photo}`;
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
        {title}
      </h3>

      {Array.isArray(items) && items.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 bg-gray-900/60 hover:bg-gray-800/70 transition p-4 rounded-xl border border-gray-700 shadow-md"
            >
              <img
                src={getPhotoUrl(item.photo)}
                className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                alt={item.name}
              />

              <div className="flex-1 ">
                <p className="font-bold text-purple-300">{item.name}</p>

                <p className="text-sm text-gray-300 mt-1">
                  {Array.isArray(item.prices)
                    ? item.prices
                        .map((p) => `${p.size}: ${p.price}`)
                        .join(" • ")
                    : item.prices || "-"}
                </p>

                {item.category && (
                  <span className="inline-block mt-2 text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                    {item.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No {title}</p>
      )}
    </div>
  );
};
