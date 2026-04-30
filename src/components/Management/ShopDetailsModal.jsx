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

// export default function ShopDetailsModal({
//   modalOpen,
//   activeShop,
//   setModalOpen,
//   openPasscode,
//   actionLoading,
// }) {
//   if (!modalOpen || !activeShop) return null;

//   const { lat, lon, label } = parseLocation(activeShop.location);

//   const mapUrl =
//     lat && lon
//       ? `https://www.openstreetmap.org/export/embed.html?bbox=${
//           lon - 0.01
//         }%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`
//       : null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/70"
//         onClick={() => setModalOpen(false)}
//       />

//       {/* Modal */}
//       <div className="relative w-full max-w-5xl bg-[#141826] rounded-3xl shadow-2xl border border-[#2c2f44] text-white overflow-hidden animate-fadeIn">
        
//         {/* HEADER */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-[#2c2f44]">
//           <h2 className="text-2xl font-bold tracking-wide">
//             Shop Details
//             <span className="text-[#B476FF] ml-2">#{activeShop.id}</span>
//           </h2>
//           <button
//             onClick={() => setModalOpen(false)}
//             className="text-gray-400 hover:text-white text-xl"
//           >
//             ✕
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
//           {/* LEFT: IMAGE CARD */}
//           <div className="bg-[#1e2235] rounded-2xl p-4 flex flex-col items-center shadow-inner">
//             {activeShop.photo ? (
//               <img
//                 src={`http://38.60.244.137:3000/shop-uploads/${activeShop.photo}`}
//                 alt={activeShop.shop_name}
//                 className="w-48 h-48 object-cover rounded-2xl border border-[#2c2f44]"
//               />
//             ) : (
//               <div className="w-48 h-48 rounded-2xl border border-dashed border-[#B476FF] to-purple-600 flex items-center justify-center text-5xl font-bold">
//                 {activeShop.shop_name?.charAt(0).toUpperCase() || "?"}
//               </div>
//             )}

//             <div className="mt-4 text-center">
//               <p className="text-lg font-semibold">{activeShop.shop_name}</p>
//               <p className="text-sm text-gray-400">
//                 {activeShop.shopkeeper_name}
//               </p>
//             </div>
//           </div>

//           {/* RIGHT: DETAILS */}
//           <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
//             {[
//               ["Email", activeShop.email],
//               ["Phone", activeShop.phone],
//               ["Items", activeShop.items],
//               ["Created", formatDateShort(activeShop.created_at)],
//               ["Address", activeShop.address || "-"],
//             ].map(([label, value]) => (
//               <div
//                 key={label}
//                 className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]"
//               >
//                 <p className="text-xs text-gray-400">{label}</p>
//                 <p className="text-sm font-medium mt-1">{value || "-"}</p>
//               </div>
//             ))}

//             {/* STATUS BADGES */}
//             <div className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44] flex flex-col gap-2">
//               {/* <p className="text-xs text-gray-400">Status</p>
//               <span className="px-3 py-1 rounded-full text-xs bg-green-600/20 text-green-400 w-fit">
//                 {activeShop.status}
//               </span> */}

//               <p className="text-xs text-gray-400 mt-2">Permission</p>
//               <span className="px-3 py-1 rounded-full text-xs bg-yellow-600/20 text-yellow-400 w-fit">
//                 {activeShop.permission}
//               </span>
//             </div>
//           </div>

//           {/* MAP SECTION */}
//           <div className="col-span-3 bg-[#1e2235] p-4 rounded-2xl border border-[#2c2f44]">
//             <p className="text-sm text-gray-400 mb-2">Location</p>

//             {!mapUrl ? (
//               <p className="text-gray-300">{label}</p>
//             ) : (
//               <>
//                 <iframe
//                   src={mapUrl}
//                   className="w-full h-72 rounded-xl border border-[#2c2f44]"
//                   title="Map"
//                   loading="lazy"
//                 />

//                 <div className="flex justify-between items-center mt-2 text-xs">
//                   <span className="text-gray-400">{label}</span>

//                   <a
//                     href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-[#B476FF] hover:underline"
//                   >
//                     Open Map →
//                   </a>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {/* FOOTER ACTIONS */}
//         <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#2c2f44] bg-[#141826]">
//           <button
//             onClick={() => openPasscode(activeShop.id, "reject")}
//             disabled={!!actionLoading[activeShop.id]}
//             className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition disabled:opacity-40"
//           >
//             Reject
//           </button>

//           <button
//             onClick={() => openPasscode(activeShop.id, "approve")}
//             disabled={!!actionLoading[activeShop.id]}
//             className="px-5 py-2 rounded-xl bg-[#B476FF] to-purple-600 hover:opacity-90 transition disabled:opacity-40"
//           >
//             Accept
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

const parseLocation = (loc) => {
  if (!loc) return { lat: null, lon: null, label: "-" };

  const lower = loc.toLowerCase();

  if (!lower.includes("lat") && !lower.includes("lag")) {
    return { lat: null, lon: null, label: loc };
  }

  try {
    const latMatch = loc.match(/(Lat|Lag)\s*([0-9.\-]+)/i);
    const lonMatch = loc.match(/(Lon|Log)\s*([0-9.\-]+)/i);

    if (latMatch && lonMatch) {
      const lat = Number(latMatch[2]);
      const lon = Number(lonMatch[2]);

      return {
        lat,
        lon,
        label: `📍 ${lat}, ${lon}`,
      };
    }

    return { lat: null, lon: null, label: loc };
  } catch {
    return { lat: null, lon: null, label: loc };
  }
};

export default function ShopDetailsModal({
  modalOpen,
  activeShop,
  setModalOpen,
  openPasscode,
  actionLoading,
}) {
  if (!modalOpen || !activeShop) return null;

  const { lat, lon, label } = parseLocation(activeShop.location);

  const mapUrl =
    lat && lon
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${
          lon - 0.01
        }%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`
      : null;

  // ✅ dynamic permission color
  const permissionColor =
    activeShop.permission === "pending"
      ? "bg-yellow-500/20 text-yellow-400"
      : activeShop.permission === "approved"
      ? "bg-green-500/20 text-green-400"
      : "bg-red-500/20 text-red-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setModalOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-[#141826] rounded-3xl shadow-2xl border border-[#2c2f44] text-white overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#2c2f44]">
          <h2 className="text-2xl font-bold tracking-wide">
            Shop Details
            <span className="text-[#B476FF] ml-2">#{activeShop.id}</span>
          </h2>
          <button
            onClick={() => setModalOpen(false)}
            className="text-gray-400 hover:text-white text-xl transition"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT CARD */}
          <div className="bg-[#1e2235] rounded-2xl p-5 flex flex-col items-center shadow-inner hover:shadow-purple-500/10 transition">

            {activeShop.photo ? (
              <img
                src={`http://38.60.244.137:3000/shop-uploads/${activeShop.photo}`}
                alt={activeShop.shop_name}
                className="w-48 h-48 object-cover rounded-2xl border border-[#2c2f44]"
              />
            ) : (
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[#B476FF]/30 to-purple-600/20 border border-[#B476FF]/40 flex items-center justify-center text-5xl font-bold shadow-inner">
                {activeShop.shop_name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">{activeShop.shop_name}</p>
              <p className="text-sm text-gray-400">
                {activeShop.shopkeeper_name}
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">

            {[
              ["Email", activeShop.email],
              ["Phone", activeShop.phone],
              ["Items", activeShop.items],
              ["Created", formatDateShort(activeShop.created_at)],
              ["Address", activeShop.address || "-"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44] hover:border-[#B476FF]/30 transition"
              >
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium mt-1">{value || "-"}</p>
              </div>
            ))}

            {/* PERMISSION */}
            <div className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]">
              <p className="text-xs text-gray-400">Permission</p>
              <span
                className={`mt-2 inline-block px-3 py-1 rounded-full text-xs ${permissionColor}`}
              >
                {activeShop.permission}
              </span>
            </div>
          </div>

          {/* MAP */}
          <div className="col-span-3 bg-[#1e2235] p-4 rounded-2xl border border-[#2c2f44] hover:border-[#B476FF]/30 transition">
            <p className="text-sm text-gray-400 mb-2">Location</p>

            {!mapUrl ? (
              <p className="text-gray-300">{label}</p>
            ) : (
              <>
                <div className="overflow-hidden rounded-xl border border-[#2c2f44]">
                  <iframe
                    src={mapUrl}
                    className="w-full h-72"
                    title="Map"
                    loading="lazy"
                  />
                </div>

                <div className="flex justify-between items-center mt-2 text-xs">
                  <span className="text-gray-400">{label}</span>

                  <a
                    href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#B476FF] hover:underline"
                  >
                    Open Map →
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#2c2f44] bg-[#141826]">
          <button
            onClick={() => openPasscode(activeShop.id, "reject")}
            disabled={!!actionLoading[activeShop.id]}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition disabled:opacity-40"
          >
            Reject
          </button>

          <button
            onClick={() => openPasscode(activeShop.id, "approve")}
            disabled={!!actionLoading[activeShop.id]}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#B476FF] to-purple-600 hover:opacity-90 transition disabled:opacity-40"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}