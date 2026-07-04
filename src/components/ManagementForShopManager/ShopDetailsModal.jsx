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

//   // ✅ dynamic permission color
//   const permissionColor =
//     activeShop.permission === "pending"
//       ? "bg-yellow-500/20 text-yellow-400"
//       : activeShop.permission === "approved"
//       ? "bg-green-500/20 text-green-400"
//       : "bg-red-500/20 text-red-400";

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/70"
//         onClick={() => setModalOpen(false)}
//       />

//       {/* Modal */}
//       <div className="relative w-full max-w-5xl bg-[#141826] rounded-3xl shadow-2xl border border-[#2c2f44] text-white overflow-hidden">

//         {/* HEADER */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-[#2c2f44]">
//           <h2 className="text-2xl font-bold tracking-wide">
//             Shop Details
//             <span className="text-[#B476FF] ml-2">#{activeShop.id}</span>
//           </h2>
//           <button
//             onClick={() => setModalOpen(false)}
//             className="text-gray-400 hover:text-white text-xl transition"
//           >
//             ✕
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

//           {/* LEFT CARD */}
//           <div className="bg-[#1e2235] rounded-2xl p-5 flex flex-col items-center shadow-inner hover:shadow-purple-500/10 transition">

//             {activeShop.photo ? (
//               <img
//                 src={`https://api.pwezayshops.com/shop-uploads/${activeShop.photo}`}
//                 alt={activeShop.shop_name}
//                 className="w-48 h-48 object-cover rounded-2xl border border-[#2c2f44]"
//               />
//             ) : (
//               <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[#B476FF]/30 to-purple-600/20 border border-[#B476FF]/40 flex items-center justify-center text-5xl font-bold shadow-inner">
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

//           {/* DETAILS */}
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
//                 className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44] hover:border-[#B476FF]/30 transition"
//               >
//                 <p className="text-xs text-gray-400">{label}</p>
//                 <p className="text-sm font-medium mt-1">{value || "-"}</p>
//               </div>
//             ))}

//             {/* PERMISSION */}
//             <div className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]">
//               <p className="text-xs text-gray-400">Permission</p>
//               <span
//                 className={`mt-2 inline-block px-3 py-1 rounded-full text-xs ${permissionColor}`}
//               >
//                 {activeShop.permission}
//               </span>
//             </div>
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

//         {/* FOOTER */}
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
//             className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#B476FF] to-purple-600 hover:opacity-90 transition disabled:opacity-40"
//           >
//             Accept
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";

// function formatDateShort(dtString) {
//   if (!dtString) return "-";
//   const d = new Date(dtString.replace(" ", "T"));
//   if (isNaN(d)) return dtString;
//   return d.toLocaleString();
// }

// /* ================= ADD CATEGORY MAP ================= */
// const categoryMap = {
//   1: "Snack",
//   2: "Alcoholic",
//   3: "Breakfast",
//   4: "Cake",
//   5: "Coffee",
//   6: "Drink",
//   7: "Fast Food",
//   8: "Lunch",
//   9: "Morning",
//   10: "Sweets",
// };

// /* ================= FORMAT CATEGORY ================= */
// const formatCategories = (categories) => {
//   if (!categories || categories.length === 0) return "-";

//   return categories
//     .map((id) => categoryMap[id] || id)
//     .join(", ");
// };

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

//   const permissionColor =
//     activeShop.permission === "pending"
//       ? "bg-yellow-500/20 text-yellow-400"
//       : activeShop.permission === "approved"
//       ? "bg-green-500/20 text-green-400"
//       : "bg-red-500/20 text-red-400";

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/70"
//         onClick={() => setModalOpen(false)}
//       />

//       {/* Modal */}
//       <div className="relative w-full max-w-5xl bg-[#141826] rounded-3xl shadow-2xl border border-[#2c2f44] text-white overflow-hidden">

//         {/* HEADER */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-[#2c2f44]">
//           <h2 className="text-2xl font-bold tracking-wide">
//             Shop Details
//             <span className="text-[#B476FF] ml-2">#{activeShop.id}</span>
//           </h2>
//           <button
//             onClick={() => setModalOpen(false)}
//             className="text-gray-400 hover:text-white text-xl transition"
//           >
//             ✕
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

//           {/* LEFT CARD */}
//           <div className="bg-[#1e2235] rounded-2xl p-5 flex flex-col items-center shadow-inner hover:shadow-purple-500/10 transition">

//             {activeShop.photo ? (
//               <img
//                 src={`https://api.pwezayshops.com/shop-uploads/${activeShop.photo}`}
//                 alt={activeShop.shop_name}
//                 className="w-48 h-48 object-cover rounded-2xl border border-[#2c2f44]"
//               />
//             ) : (
//               <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[#B476FF]/30 to-purple-600/20 border border-[#B476FF]/40 flex items-center justify-center text-5xl font-bold shadow-inner">
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

//           {/* DETAILS */}
//           <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">

//             {[
//               ["Email", activeShop.email],
//               ["Phone", activeShop.phone],
//               ["Items", activeShop.items],

//               // ✅ ADDED CATEGORY HERE
//               ["Categories", formatCategories(activeShop.categories)],

//               ["Created", formatDateShort(activeShop.created_at)],
//               ["Address", activeShop.address || "-"],
//             ].map(([label, value]) => (
//               <div
//                 key={label}
//                 className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44] hover:border-[#B476FF]/30 transition"
//               >
//                 <p className="text-xs text-gray-400">{label}</p>
//                 <p className="text-sm font-medium mt-1">{value || "-"}</p>
//               </div>
//             ))}

//             {/* PERMISSION */}
//             <div className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]">
//               <p className="text-xs text-gray-400">Permission</p>
//               <span
//                 className={`mt-2 inline-block px-3 py-1 rounded-full text-xs ${permissionColor}`}
//               >
//                 {activeShop.permission}
//               </span>
//             </div>
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

//         {/* FOOTER */}
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
//             className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#B476FF] to-purple-600 hover:opacity-90 transition disabled:opacity-40"
//           >
//             Accept
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { useAlert } from "../../AlertContext";

/* ================= FORMAT HELPERS ================= */
function formatDateShort(dtString) {
  if (!dtString) return "-";
  const d = new Date(dtString.replace(" ", "T"));
  if (isNaN(d)) return dtString;
  return d.toLocaleString();
}

const categoryMap = {
  1: "snack",
  2: "alcoholic",
  3: "breakfast",
  4: "cake",
  5: "coffee",
  6: "drink",
  7: "fastfood",
  8: "lunch",
  9: "morning",
  10: "sweets",
};

const formatCategories = (categories) => {
  if (!categories || categories.length === 0) return "-";
  return categories.map((id) => categoryMap[id] || id).join(", ");
};

const parseLocation = (loc) => {
  if (!loc) return { lat: null, lon: null, label: "-" };

  const lower = loc.toLowerCase();

  if (!lower.includes("lat") && !lower.includes("lag")) {
    return { lat: null, lon: null, label: loc };
  }

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
};

/* ================= COMPONENT ================= */
export default function ShopDetailsModal({
  modalOpen,
  activeShop,
  setModalOpen,
}) {
  /* ================= STATES ================= */
  const [passcode, setPasscode] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  /* ================= REFS ================= */
  const passcodeInputRef = useRef(null);

  /* ================= EFFECTS ================= */
  useEffect(() => {
    if (pendingAction && passcodeInputRef.current) {
      passcodeInputRef.current.focus();
    }
  }, [pendingAction]);

  /* ================= GUARD ================= */
  if (!modalOpen || !activeShop) return null;

  /* ================= DATA ================= */
  const { lat, lon, label } = parseLocation(activeShop.location);

  const mapUrl =
    lat !== null && lon !== null
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${
          lon - 0.01
        }%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`
      : null;

  const permissionColor =
    activeShop.permission === "pending"
      ? "bg-yellow-500/20 text-yellow-400"
      : activeShop.permission === "approved"
      ? "bg-green-500/20 text-green-400"
      : "bg-red-500/20 text-red-400";

  /* ================= ACTION ================= */
// const handleConfirm = async () => {
//   if (!passcode) {
//     showAlert("Enter passcode", "warning");
//     return;
//   }

//   setLoading(true);

//   try {
//     const verifyRes = await fetch(
//       "https://api.pwezayshops.com/admin/verify-shopmanager-passcode",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ passcode }),
//       }
//     );

//     const verifyData = await verifyRes.json();

//     if (!verifyData.success) {
//       showAlert(verifyData.message || "Wrong passcode", "error");

//       // ✅ IMPORTANT RESET HERE
//       // setLoading(false);
//       return;
//     }

//     const url =
//       pendingAction === "approve"
//         ? `https://api.pwezayshops.com/shops/approve/${activeShop.id}`
//         : `https://api.pwezayshops.com/shops/reject/${activeShop.id}`;

//     const res = await fetch(url, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await res.json();

//     if (data.success) {
//       showAlert(data.message || "Success", "success");

//       setPendingAction(null);
//       setPasscode("");
//       setModalOpen(false);
//     } else {
//       showAlert(data.message || "Failed", "error");
//     }
//   } catch (err) {
//     console.error(err);
//     showAlert("Server error", "error");
//   } finally {
//     setLoading(false); // ✅ always safe
//   }
// };
const closeAll = () => {
  setPendingAction(null);
  setPasscode("");
  setLoading(false);
  setModalOpen(false);
};


const handleConfirm = async () => {
  if (!passcode) {
    showAlert("Enter passcode", "warning");
    return;
  }

  setLoading(true);

  try {
    const verifyRes = await fetch(
      "https://api.pwezayshops.com/admin/verify-shopmanager-passcode",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      showAlert(verifyData.message || "Wrong passcode", "error");
      closeAll();   // ✅ IMPORTANT FIX
      return;
    }

    const url =
      pendingAction === "approve"
        ? `https://api.pwezayshops.com/shops/approve/${activeShop.id}`
        : `https://api.pwezayshops.com/shops/reject/${activeShop.id}`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.success) {
      showAlert(data.message || "Success", "success");
      closeAll();  // ✅ CLOSE POPUP HERE
      setModalOpen(false);
    } else {
      showAlert(data.message || "Failed", "error");
      closeAll();  // optional but safe
    }
  } catch (err) {
    console.error(err);
    showAlert("Server error", "error");
    closeAll(); // ✅ VERY IMPORTANT
  }
};
  return (
    <>
      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/70"
          onClick={() => setModalOpen(false)}
        />

        {/* MODAL */}
        <div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl 
bg-gradient-to-b from-[#111827] via-[#0f172a] to-[#0b1020]
border border-white/10 shadow-2xl text-white"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                Shop Details{" "}
                <span className="text-[#B476FF]">#{activeShop.id}</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Review shop information and manage approval
              </p>
            </div>

            <button
              onClick={() => setModalOpen(false)}
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
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition">
                <div className="relative mx-auto w-40 h-40">
                  {activeShop.photo ? (
                    <img
                      src={`https://api.pwezayshops.com/shop-uploads/${activeShop.photo}`}
                      className="w-full h-full object-cover rounded-2xl border border-white/10"
                    />
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-purple-500/20 flex items-center justify-center text-5xl font-bold">
                      {activeShop.shop_name?.charAt(0)}
                    </div>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {activeShop.shop_name}
                </h3>

                <p className="text-sm text-gray-400">
                  {activeShop.shopkeeper_name}
                </p>

                <div className="mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
            ${permissionColor}`}
                  >
                    {activeShop.permission}
                  </span>
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {[
                ["Email", activeShop.email],
                ["Phone", activeShop.phone],
                ["Items", activeShop.items],
                ["Created", formatDateShort(activeShop.created_at)],
                ["Categories", formatCategories(activeShop.categories)],
                ["Address", activeShop.address || "-"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
                >
                  <p className="text-gray-400 text-xs mb-1">{k}</p>
                  <p className="text-sm font-medium break-words">{v}</p>
                </div>
              ))}
            </div>

            {/* MAP */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-gray-400 text-sm mb-3">Location</p>

                {mapUrl ? (
                  <iframe
                    src={mapUrl}
                    className="w-full h-72 rounded-xl border border-white/10"
                  />
                ) : (
                  <p className="text-gray-300">{label}</p>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 p-5 border-t border-white/10">
            <button
              onClick={() => {
                setPendingAction("reject");
                setPasscode("");
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl
      bg-red-500/10 border border-red-500/30 text-red-300
      hover:bg-red-500/20 transition"
            >
              Reject
            </button>

            <button
              onClick={() => {
                setPendingAction("approve");
                setPasscode("");
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl
      bg-purple-500
      text-white font-medium hover:opacity-90 transition shadow-lg"
            >
              Accept
            </button>
          </div>
        </div>
      </div>

      {/* PASSCODE MODAL */}
      {pendingAction && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-3">
          {/* Overlay */}
          <div
            className="absolute inset-0"
            onClick={() => setPendingAction(null)}
          />

          {/* Modal */}
          <div className="relative bg-[#1e2235] border border-[#2c2f44] rounded-xl p-5 w-full max-w-[340px] text-white shadow-2xl">
            {/* Title */}
            <h3 className="text-lg font-semibold text-purple-400 text-center mb-2">
              Enter Passcode
            </h3>

            {/* Input */}
            <input
              ref={passcodeInputRef}
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  handleConfirm();
                }
              }}
              className="w-full px-3 py-2 rounded-lg bg-[#141826] border border-slate-600 text-white outline-none focus:border-purple-500 mb-4"
              placeholder="passcode"
            />

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setPendingAction(null)}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`flex-1 px-3 py-2 rounded-lg text-white transition ${pendingAction === "approve"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-red-600 hover:bg-red-700"
                  }`}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
