
// import React from "react";

// function formatDateShort(dtString) {
//   if (!dtString) return "-";
//   const d = new Date(dtString.replace(" ", "T"));
//   if (isNaN(d)) return dtString;
//   return d.toLocaleString();
// }

// const parseLocation = (loc) => {
//   if (!loc) return { lat: null, lon: null, label: "-" };

//   const lower = loc.toLowerCase();

//   if (!lower.includes("lat") && !lower.includes("lag")) {
//     return { lat: null, lon: null, label: loc };
//   }

//   try {
//     const latMatch = loc.match(/(Lat|Lag)\s*([0-9.\-]+)/i);
//     const lonMatch = loc.match(/(Lon|Log)\s*([0-9.\-]+)/i);

//     if (latMatch && lonMatch) {
//       const lat = Number(latMatch[2]);
//       const lon = Number(lonMatch[2]);

//       return {
//         lat,
//         lon,
//         label: `📍 ${lat}, ${lon}`,
//       };
//     }

//     return { lat: null, lon: null, label: loc };
//   } catch {
//     return { lat: null, lon: null, label: loc };
//   }
// };

// export default function ShopkeeperDetailModal({
//   open,
//   shop,
//   onClose,
//   actionLoading,
// }) {
//   if (!open || !shop) return null;

//   const { lat, lon, label } = parseLocation(shop.location || "");

//   const mapUrl =
//     lat && lon
//       ? `https://www.openstreetmap.org/export/embed.html?bbox=${
//           lon - 0.01
//         }%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`
//       : null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3">

//       {/* BACKDROP */}
//       <div
//         className="absolute inset-0 bg-black/70"
//         onClick={onClose}
//       />

//       {/* MODAL */}
//       <div className="relative w-full max-w-5xl bg-[#141826] rounded-3xl shadow-2xl border border-[#2c2f44] text-white overflow-hidden">

//         {/* HEADER */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-[#2c2f44]">
//           <h2 className="text-2xl font-bold tracking-wide">
//             Shop Details
//             <span className="text-[#B476FF] ml-2">#{shop.id}</span>
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white text-xl transition"
//           >
//             ✕
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

//           {/* LEFT CARD */}
//           <div className="bg-[#1e2235] rounded-2xl p-5 flex flex-col items-center shadow-inner hover:shadow-purple-500/10 transition">

//             {shop.photo ? (
//               <img
//                 src={`https://api.pwezayshops.com/shop-uploads/${shop.photo}`}
//                 alt={shop.shop_name}
//                 className="w-48 h-48 object-cover rounded-2xl border border-[#2c2f44]"
//               />
//             ) : (
//               <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[#B476FF]/30 to-purple-600/20 border border-[#B476FF]/40 flex items-center justify-center text-5xl font-bold">
//                 {shop.shop_name?.charAt(0).toUpperCase() || "?"}
//               </div>
//             )}

//             <div className="mt-4 text-center">
//               <p className="text-lg font-semibold">{shop.shop_name}</p>
//               <p className="text-sm text-gray-400">{shop.shopkeeper_name}</p>
//             </div>
//           </div>

//           {/* DETAILS */}
//           <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">

//             {[
//               ["Shop Name", shop.shop_name],
//               ["Shopkeeper", shop.shopkeeper_name],
//               ["Email", shop.email],
//               ["Phone", shop.phone],
//               ["Status", shop.status],
//               ["Created", formatDateShort(shop.created_at)],
//             ].map(([label, value]) => (
//               <div
//                 key={label}
//                 className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44] hover:border-[#B476FF]/30 transition"
//               >
//                 <p className="text-xs text-gray-400">{label}</p>
//                 <p className="text-sm font-medium mt-1">{value || "-"}</p>
//               </div>
//             ))}
//           </div>

//           {/* MAP */}
//           <div className="col-span-3 bg-[#1e2235] p-4 rounded-2xl border border-[#2c2f44]">
//             <p className="text-sm text-gray-400 mb-2">Location</p>

//             {!mapUrl ? (
//               <p className="text-gray-300">{label}</p>
//             ) : (
//               <>
//                 <div className="overflow-hidden rounded-xl border border-[#2c2f44]">
//                   <iframe
//                     src={mapUrl}
//                     className="w-full h-72"
//                     title="map"
//                     loading="lazy"
//                   />
//                 </div>

//                 <p className="text-xs text-gray-400 mt-2">{label}</p>
//               </>
//             )}
//           </div>
//         </div>

//         {/* FOOTER ACTIONS */}
//         <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#2c2f44] bg-[#141826]">

//           <button
//             onClick={onClose}
//             className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
//           >
//             Close
//           </button>

//           <button
//             disabled={!!actionLoading?.[shop.id]}
//             className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#B476FF] to-purple-600 hover:opacity-90 transition disabled:opacity-40"
//           >
//             Edit
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }
import React from "react";

function formatDateShort(dtString) {
  if (!dtString) return "-";
  const d = new Date(dtString.replace(" ", "T"));
  if (isNaN(d)) return dtString;
  return d.toLocaleString();
}
const categoryMap = {
    1:"snack",
    2:"alcoholic",
   3: "breakfast",
    4:"cake",
    5:"coffee",
    6:"drink",
    7:"fastfood",
    8:"lunch",
    9:"morning",
   10: "sweets",
};

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

export default function ShopkeeperDetailModal({
  open,
  shop,
  onClose,
}) {
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
      ? "text-green-400 bg-green-500/10 border-green-500/30"
      : shop.permission === "pending"
      ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
      : "text-red-400 bg-red-500/10 border-red-500/30";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-5xl bg-[#141826] rounded-3xl shadow-2xl border border-[#2c2f44] text-white overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#2c2f44]">
          <h2 className="text-2xl font-bold">
            Shop Details
            <span className="text-[#B476FF] ml-2">#{shop.id}</span>
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT PROFILE CARD */}
          <div className="bg-[#1e2235] rounded-2xl p-5 flex flex-col items-center border border-[#2c2f44]">

            {shop.photo ? (
              <img
                src={`https://api.pwezayshops.com/shop-uploads/${shop.photo}`}
                alt={shop.shop_name}
                className="w-48 h-48 object-cover rounded-2xl border border-[#2c2f44]"
              />
            ) : (
              <div className="w-48 h-48 rounded-2xl bg-purple-500/20 flex items-center justify-center text-5xl font-bold">
                {shop.shop_name?.charAt(0) || "?"}
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">{shop.shop_name}</p>
              <p className="text-sm text-gray-400">
                {shop.shopkeeper_name}
              </p>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">

            {[
              ["Shop ID", shop.id],
              ["Email", shop.email],
              ["Phone", shop.phone],
              ["Items", shop.items],
              ["Address", shop.address],
              ["Created", formatDateShort(shop.created_at)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]"
              >
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium mt-1">
                  {value || "-"}
                </p>
              </div>
            ))}

            {/* STATUS */}
            <div className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]">
              <p className="text-xs text-gray-400">Status</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs border ${statusColor}`}>
                {shop.status}
              </span>
            </div>

            {/* PERMISSION */}
            {/* <div className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]">
              <p className="text-xs text-gray-400">Permission</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs border ${permissionColor}`}>
                {shop.permission}
              </span>
            </div> */}
            {/* CATEGORIES */}
<div className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]">
  <p className="text-xs text-gray-400">Categories</p>

  <div className="flex flex-wrap gap-2 mt-2">
    {shop.categories?.length ? (
      shop.categories.map((id) => (
        <span
          key={id}
          className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30"
        >
          {categoryMap[id] || `#${id}`}
        </span>
      ))
    ) : (
      <span className="text-sm text-gray-400">-</span>
    )}
  </div>
</div>
          </div>

          {/* MAP */}
          <div className="col-span-3 bg-[#1e2235] p-4 rounded-2xl border border-[#2c2f44]">
            <p className="text-sm text-gray-400 mb-2">Location</p>

            {!mapUrl ? (
              <p className="text-gray-300">{label}</p>
            ) : (
              <>
                <iframe
                  src={mapUrl}
                  className="w-full h-72 rounded-xl border border-[#2c2f44]"
                  title="map"
                  loading="lazy"
                />

                <p className="text-xs text-gray-500 mt-2">{label}</p>
              </>
            )}
          </div>
        </div>

        {/* FOOTER */}
        {/* <div className="flex justify-end px-6 py-4 border-t border-[#2c2f44]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
          >
            Close
          </button>
        </div> */}

      </div>
    </div>
  );
}