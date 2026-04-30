
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

// export default function UserDetailModal({
//   modalOpen,
//   activeUser,
//   onClose,
// }) {
//   if (!modalOpen || !activeUser) return null;

//   const { lat, lon, label } = parseLocation(activeUser.location);

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
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="relative w-full max-w-5xl bg-[#141826] rounded-3xl shadow-2xl border border-[#2c2f44] text-white overflow-hidden">

//         {/* HEADER */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-[#2c2f44]">
//           <h2 className="text-2xl font-bold tracking-wide">
//             User Details
//             <span className="text-[#B476FF] ml-2">#{activeUser.id}</span>
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

//             {activeUser.photo ? (
//               <img
//                 src={activeUser.photo}
//                 alt={activeUser.name}
//                 className="w-48 h-48 object-cover rounded-2xl border border-[#2c2f44]"
//               />
//             ) : (
//               <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[#B476FF]/30 to-purple-600/20 border border-[#B476FF]/40 flex items-center justify-center text-5xl font-bold shadow-inner">
//                 {activeUser.name?.charAt(0).toUpperCase() || "?"}
//               </div>
//             )}

//             <div className="mt-4 text-center">
//               <p className="text-lg font-semibold">{activeUser.name}</p>
//               <p className="text-sm text-gray-400">
//                 {activeUser.email}
//               </p>
//             </div>
//           </div>

//           {/* DETAILS */}
//           <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">

//             {[
//               ["Phone", activeUser.phone],
//               ["Status", activeUser.status],
//               ["Created", formatDateShort(activeUser.created_at)],
//               ["Location", label],
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
//           <div className="col-span-3 bg-[#1e2235] p-4 rounded-2xl border border-[#2c2f44] hover:border-[#B476FF]/30 transition">
//             <p className="text-sm text-gray-400 mb-2">Location</p>

//             {!mapUrl ? (
//               <p className="text-gray-300">{label}</p>
//             ) : (
//               <>
//                 <div className="overflow-hidden rounded-xl border border-[#2c2f44]">
//                   <iframe
//                     src={mapUrl}
//                     className="w-full h-72"
//                     title="Map"
//                     loading="lazy"
//                   />
//                 </div>

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

export default function UserDetailModal({
  modalOpen,
  activeUser,
  onClose,
}) {
  if (!modalOpen || !activeUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-[#141826] rounded-3xl shadow-2xl border border-[#2c2f44] text-white overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#2c2f44]">
          <h2 className="text-2xl font-bold tracking-wide">
            User Details
            <span className="text-[#B476FF] ml-2">#{activeUser.id}</span>
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

          {/* LEFT CARD */}
          <div className="bg-[#1e2235] rounded-2xl p-5 flex flex-col items-center">

            {activeUser.photo ? (
              <img
                src={activeUser.photo}
                alt={activeUser.name}
                className="w-48 h-48 object-cover rounded-2xl border border-[#2c2f44]"
              />
            ) : (
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[#B476FF]/30 to-purple-600/20 border border-[#B476FF]/40 flex items-center justify-center text-5xl font-bold">
                {activeUser.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">{activeUser.name}</p>
              <p className="text-sm text-gray-400">{activeUser.email}</p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">

            {[
              ["Phone", activeUser.phone],
              ["Email", activeUser.email],
              ["Status", activeUser.status],
              ["Special User", activeUser.special === 1 ? "Yes" : "No"],
              ["Created At", formatDateShort(activeUser.created_at)],
            //   ["Location", activeUser.location || "No location provided"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]"
              >
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium mt-1">{value}</p>
              </div>
            ))}
          </div>

          {/* FOOTER INFO (NO MAP since no coords) */}
          <div className="col-span-3 bg-[#1e2235] p-4 rounded-2xl border border-[#2c2f44]">
            <p className="text-sm text-gray-400 mb-2">Location Info</p>

            <p className="text-gray-300 text-sm">
              {activeUser.location
                ? activeUser.location
                : "This user has not provided location data."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}