// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ViewShopDetail = ({ shopId, onClose }) => {
//   const [shop, setShop] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchShop = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.pwezayshops.com/shops/${shopId}`
//         );
//         setShop(res.data[0]); // API returns array
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (shopId) fetchShop();
//   }, [shopId]);

//   if (!shop) return null;

//   // Parse location (Lag / Log)
//   const locationText = shop.location || "";
//   const match = locationText.match(/Lag\s*([\d.-]+),\s*Log\s*([\d.-]+)/);

//   const lat = match ? match[1] : 0;
//   const lng = match ? match[2] : 0;

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-gray-900 text-white w-[90%] max-w-2xl p-6 rounded-lg relative">

//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-white"
//         >
//           ✕
//         </button>

//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="space-y-3">
//             <h2 className="text-xl font-bold text-[#B476FF]">
//               {shop.shop_name}
//             </h2>

//             <p>Owner: {shop.shopkeeper_name}</p>
//             <p>Email: {shop.email}</p>
//             <p>Phone: {shop.phone}</p>
//             <p>Address: {shop.address}</p>
//             <p>Status: {shop.status}</p>

//             {/* Image */}
//             <img
//               src={`https://api.pwezayshops.com/shop-uploads/${shop.photo}`}
//               className="w-40 h-40 object-cover rounded"
//             />

//             {/* OpenStreetMap */}
//             <div className="mt-4">
//               <iframe
//                 width="100%"
//                 height="250"
//                 src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng},${lat},${lng},${lat}&layer=mapnik&marker=${lat},${lng}`}
//                 className="rounded"
//               />
//             </div>

//             {/* Payment info */}
//             <div>
//               <p className="font-bold mt-2">Payment Methods:</p>
//               <p>{shop.payment_method?.join(", ")}</p>
//               <p>{shop.payment_phone?.join(", ")}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewShopDetail;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   User,
//   Phone,
//   Mail,
//   Package,
//   MapPin,
//   CheckCircle,
//   Shield,
//   Calendar,
//   CreditCard,
//   Truck,
//   Store,
// } from "lucide-react";

// const ViewShopDetail = ({ shopId, onClose }) => {
//   const [shop, setShop] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchShop = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.pwezayshops.com/shops/${shopId}`,
//         );
//         setShop(res.data[0]);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (shopId) fetchShop();
//   }, [shopId]);

//   if (!shop) return null;

//   // location parse
//   const match = shop.location?.match(/Lag\s*([\d.-]+),\s*Log\s*([\d.-]+)/);
//   const lat = match ? match[1] : 0;
//   const lng = match ? match[2] : 0;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900">
//       <div className=" text-white w-[95%] max-w-5xl rounded-xl shadow-lg overflow-hidden">
//         {/* HEADER */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
//           <h2 className="text-xl font-bold text-[#B476FF] flex items-center gap-2">
//             <Store /> Shop Details
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white text-xl"
//           >
//             ✕
//           </button>
//         </div>

//         {loading ? (
//           <p className="p-6">Loading...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//             {/* LEFT SIDE */}
//             <div className="md:col-span-2 space-y-4">
//               {/* BASIC INFO */}
//               <div className="bg-gray-800 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold text-[#B476FF] mb-3">
//                   Basic Information
//                 </h3>

//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   <p className="flex items-center gap-2">
//                     <User size={16} /> {shop.shopkeeper_name}
//                   </p>

//                   <p className="flex items-center gap-2">
//                     <Store size={16} /> {shop.shop_name}
//                   </p>

//                   <p className="flex items-center gap-2">
//                     <Mail size={16} /> {shop.email}
//                   </p>

//                   <p className="flex items-center gap-2">
//                     <Phone size={16} /> {shop.phone}
//                   </p>

//                   <p className="flex items-center gap-2">
//                     <Package size={16} /> Items: {shop.items}
//                   </p>

//                   <p className="flex items-center gap-2">
//                     <CheckCircle size={16} /> Status: {shop.status}
//                   </p>

//                   <p className="flex items-center gap-2">
//                     <Shield size={16} /> Permission: {shop.permission}
//                   </p>

//                   <p className="flex items-center gap-2">
//                     <Calendar size={16} /> {shop.created_at}
//                   </p>
//                 </div>
//               </div>

//               {/* ADDRESS */}
//               <div className="bg-gray-800 p-4 rounded-lg">
//                 <h3 className="text-[#B476FF] font-semibold mb-2">Address</h3>
//                 <p className="text-sm text-gray-300">{shop.address}</p>
//               </div>

//               {/* PAYMENT INFO */}
//               <div className="bg-gray-800 p-4 rounded-lg">
//                 <h3 className="text-[#B476FF] font-semibold mb-2 flex items-center gap-2">
//                   <CreditCard size={16} /> Payment Info
//                 </h3>

//                 <p className="text-sm">
//                   Method: {shop.payment_method?.join(", ")}
//                 </p>
//                 <p className="text-sm">Name: {shop.payment_name?.join(", ")}</p>
//                 <p className="text-sm">
//                   Phone: {shop.payment_phone?.join(", ")}
//                 </p>
//               </div>

//               {/* DELIVERY SETTINGS */}
//               <div className="bg-gray-800 p-4 rounded-lg">
//                 <h3 className="text-[#B476FF] font-semibold mb-2 flex items-center gap-2">
//                   <Truck size={16} /> Delivery Settings
//                 </h3>

//                 <p className="text-sm">
//                   Have Deliverymen: {shop.have_deliverymen ? "Yes" : "No"}
//                 </p>
//                 <p className="text-sm">
//                   Delivery Fee Method: {shop.deli_fees_method}
//                 </p>
//                 <p className="text-sm">
//                   Open Shop: {shop.open_shop ? "Open" : "Closed"}
//                 </p>
//                 <p className="text-sm">
//                   Shop Delivery: {shop.open_shop_deli ? "Enabled" : "Disabled"}
//                 </p>
//               </div>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="space-y-4">
//               {/* IMAGE */}
//               {/* <div className="bg-gray-800 p-4 rounded-lg">
//                 <img
//                   src={`https://api.pwezayshops.com/shop-uploads/${shop.photo}`}
//                   className="w-full h-48 object-cover rounded"
//                   alt="shop"
//                 />
//               </div> */}

//               {/* MAP */}
//               <div className="bg-gray-800 p-4 rounded-lg">
//                 <h3 className="text-[#B476FF] font-semibold mb-2 flex items-center gap-2">
//                   <MapPin size={16} /> Location
//                 </h3>

//                 <iframe
//                   className="w-full h-64 rounded"
//                   src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng},${lat},${lng},${lat}&layer=mapnik&marker=${lat},${lng}`}
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewShopDetail;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

/**
 * ViewShopDetail.jsx
 * - Requires Tailwind CSS for styling.
 * - Props:
 *    - shopId: id string to fetch
 *    - onClose: function to close modal
 *
 * Improvements:
 * - Robust location parsing (accepts Lag/Lat and Log/Lng)
 * - Proper OpenStreetMap bbox & marker
 * - Shows payments list with copy-to-clipboard
 * - Shows categories, items, created_at, permission, delivery flags
 * - Accessible: ESC to close, click outside to close
 * - Loading skeleton / error handling
 */

const statusColors = {
  approved: "bg-green-600 text-white",
  warning: "bg-amber-500 text-black",
  pending: "bg-gray-600 text-white",
  rejected: "bg-red-600 text-white",
};

const PlaceholderImage =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='%2322292b'/><text x='50%' y='50%' fill='%23aaa' font-size='20' font-family='Arial' text-anchor='middle' alignment-baseline='middle'>No Image</text></svg>";

const formatDate = (s) => {
  if (!s) return "-";
  const d = new Date(s);
  if (isNaN(d)) return s;
  return d.toLocaleString();
};

const parseLocation = (text) => {
  if (!text) return null;
  // Accept forms like: "Lag 15.96, Log 97.73" or "Lat 15.96, Lng 97.73" etc.
  const re =
    /(?:Lat|Lag|latitude|lat)\s*[:=]?\s*([-+]?\d+\.?\d*)[,\s;]+(?:Lon|Log|Lng|Long|longitude|lng)\s*[:=]?\s*([-+]?\d+\.?\d*)/i;
  const m = text.match(re);
  if (m) {
    const lat = parseFloat(m[1]);
    const lng = parseFloat(m[2]);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) return { lat, lng };
  }

  // Fallback: any two numbers in the string
  const nums = text.match(/([-+]?\d+\.?\d*)/g);
  if (nums && nums.length >= 2) {
    const lat = parseFloat(nums[0]);
    const lng = parseFloat(nums[1]);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) return { lat, lng };
  }

  return null;
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

const ViewShopDetail = ({ shopId, onClose }) => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(Boolean(shopId));
  const [error, setError] = useState(null);
  const [copiedPhone, setCopiedPhone] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (!shopId) return;
    let cancelled = false;

    const fetchShop = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `https://api.pwezayshops.com/shops/${shopId}`
        );
        // API returns array
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        if (!cancelled) setShop(data || null);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load shop data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchShop();
    return () => {
      cancelled = true;
    };
  }, [shopId]);

  // Click outside to close
  const onBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose?.();
    }
  };

  // Render loading skeleton/modal even if shop is null so user sees modal while loading.
  const location = parseLocation(shop?.location || "");
  const lat = location?.lat ?? null;
  const lng = location?.lng ?? null;

  // Build OSM embed bbox (small box around point)
  const bbox = lat && lng ? (() => {
    const delta = 0.015; // ~1-2 km box; adjust smaller if needed
    const minLon = lng - delta;
    const minLat = lat - delta;
    const maxLon = lng + delta;
    const maxLat = lat + delta;
    return `${minLon},${minLat},${maxLon},${maxLat}`;
  })() : null;

  const imageSrc = shop?.photo
    ? `https://api.pwezayshops.com/shop-uploads/${shop.photo}`
    : PlaceholderImage;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onMouseDown={onBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shop details"
        className="w-full max-w-4xl bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden transform transition-all scale-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div>
            <h3 className="text-xl font-semibold text-[#B476FF]">
              {loading ? "Loading shop…" : shop?.shop_name ?? "Shop details"}
            </h3>
            <p className="text-sm text-gray-400">
              {loading ? "Fetching data" : shop?.shopkeeper_name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {shop && (
              <span
                className={`px-3 py-1 text-sm rounded-full ${statusColors[shop.status] ||
                  "bg-gray-700 text-white"}`}
              >
                {shop.status ?? "unknown"}
              </span>
            )}

            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white rounded p-1"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {loading ? (
            // Simple skeleton
            <div className="animate-pulse">
              <div className="flex gap-6">
                <div className="w-40 h-40 bg-gray-800 rounded" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-800 rounded w-3/4" />
                  <div className="h-4 bg-gray-800 rounded w-1/2" />
                  <div className="h-4 bg-gray-800 rounded w-1/3" />
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : !shop ? (
            <div className="text-gray-300">No shop data found.</div>
          ) : (
            // Content grid
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left: image + basic */}
              <div className="col-span-1">
                <img
                  src={imageSrc}
                  alt={shop.shop_name || "shop image"}
                  onError={(e) => {
                    e.currentTarget.src = PlaceholderImage;
                  }}
                  className="w-full h-48 object-cover rounded mb-4 border border-gray-800"
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Owner</p>
                      <p className="font-medium">{shop.shopkeeper_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Items</p>
                      <p className="font-medium">{shop.items ?? "-"}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Address</p>
                    <p>{shop.address ?? "-"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Permission</p>
                    <p className="inline-block px-2 py-1 text-sm bg-gray-800 rounded">
                      {shop.permission ?? "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Created</p>
                    <p className="text-sm">{formatDate(shop.created_at)}</p>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm text-gray-400">Contact</p>
                    <div className="flex items-center gap-2 mt-1">
                      <a
                        href={`mailto:${shop.email ?? ""}`}
                        className="text-sm text-blue-300 hover:underline"
                      >
                        {shop.email ?? "-"}
                      </a>
                      <span className="text-gray-600">•</span>
                      <button
                        onClick={async () => {
                          const ok = await copyToClipboard(shop.phone ?? "");
                          if (ok) {
                            setCopiedPhone(shop.phone);
                            setTimeout(() => setCopiedPhone(null), 1500);
                          }
                        }}
                        className="text-sm text-blue-300 hover:underline"
                        title="Copy phone"
                      >
                        {shop.phone ?? "-"}
                        {copiedPhone === shop.phone && (
                          <span className="ml-2 text-xs text-green-300">
                            copied
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle: map */}
              <div className="col-span-1 md:col-span-2 space-y-4">
                <div className="w-full h-56 bg-gray-800 rounded overflow-hidden border border-gray-800">
                  {lat && lng && bbox ? (
                    <iframe
                      title="shop map"
                      width="100%"
                      height="100%"
                      className="border-0"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
                        bbox
                      )}&layer=mapnik&marker=${lat},${lng}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No location available
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Payments */}
                  <div className="bg-gray-800 p-4 rounded">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Payments</p>
                      <p className="text-xs text-gray-500">
                        {shop.payments?.length ?? 0} methods
                      </p>
                    </div>

                    <div className="mt-3 space-y-2 max-h-40 overflow-auto pr-2">
                      {Array.isArray(shop.payments) && shop.payments.length > 0 ? (
                        shop.payments.map((p, idx) => (
                          <div
                            key={`${p.phone ?? idx}-${p.method ?? idx}`}
                            className="flex items-center justify-between gap-3"
                          >
                            <div>
                              <div className="text-sm font-medium">
                                {p.method ?? "method"}
                              </div>
                              <div className="text-xs text-gray-400">
                                {p.name ?? "-"}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={async () => {
                                  const ok = await copyToClipboard(p.phone ?? "");
                                  if (ok) {
                                    setCopiedPhone(p.phone);
                                    setTimeout(() => setCopiedPhone(null), 1500);
                                  }
                                }}
                                className="text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
                              >
                                {p.phone ?? "-"}
                              </button>
                            </div>
                          </div>
                        ))
                      ) : shop.payment_method ? (
                        // Backwards-compatible: if API uses payment_method/payment_phone arrays
                        <div className="text-sm">
                          {Array.isArray(shop.payment_method)
                            ? shop.payment_method.join(", ")
                            : shop.payment_method || "-"}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400">No payment data</div>
                      )}
                    </div>
                  </div>

                  {/* Meta / categories / flags */}
                  <div className="bg-gray-800 p-4 rounded space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Categories</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(Array.isArray(shop.categories) && shop.categories.length > 0) ? (
                          shop.categories.map((c) => (
                            <span
                              key={String(c)}
                              className="text-xs px-2 py-1 bg-gray-700 rounded"
                            >
                              {c}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex-1">
                        <p className="text-gray-400 text-xs">Deliverymen</p>
                        <p>{shop.have_deliverymen ? "Yes" : "No"}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-400 text-xs">Delivery fees</p>
                        <p>{shop.deli_fees_method ?? "-"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex-1">
                        <p className="text-gray-400 text-xs">Open Shop</p>
                        <p>{shop.open_shop ? "Open" : "Closed"}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-400 text-xs">Open Delivery</p>
                        <p>{shop.open_shop_deli ? "Yes" : "No"}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Raw Location</p>
                      <p className="text-sm break-words">{shop.location ?? "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Footer actions (closing button already present) */}
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-[#B476FF] text-black rounded hover:opacity-90"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewShopDetail;