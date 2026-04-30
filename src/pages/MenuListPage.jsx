// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import MenuDetailPopup from "../components/Shop/MenuDetailPopup";

// export default function MenuListPage() {
//   const { shopId } = useParams();
//   const navigate = useNavigate();

//   const [shopInfo, setShopInfo] = useState({});
//   const [menus, setMenus] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedMenu, setSelectedMenu] = useState(null);

//   // ✅ format price helper (NEW API FIX)
//   const formatPrices = (prices) => {
//     if (!Array.isArray(prices)) return "N/A";
//     return prices.map((p) => `${p.size}: ${p.price} Ks`).join(" | ");
//   };

//   // ✅ fetch menus
//   const fetchMenus = async () => {
//     try {
//       const url = `http://38.60.244.137:3000/menu/${shopId}?t=${Date.now()}`;
//       const res = await axios.get(url);

//       setMenus([...(res.data.menus || [])]);
//       setShopInfo(res.data.shop || {});
//     } catch (err) {
//       console.error("Failed to fetch menu:", err);
//       setError("Failed to fetch menu data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ initial load
//   useEffect(() => {
//     if (!shopId) return;

//     setLoading(true);
//     fetchMenus();
//   }, [shopId]);

//   // ✅ polling (FIXED - not too fast)
//   useEffect(() => {
//     if (!shopId) return;

//     const interval = setInterval(() => {
//       fetchMenus();
//     }, 5000); // 🔥 5 seconds (safe)

//     return () => clearInterval(interval);
//   }, [shopId]);

//   const getPhotoUrl = (photo) => {
//     if (!photo) return null;
//     return `http://38.60.244.137:3000/menu-uploads/${photo}`;
//   };

//   // ================= LOADING =================
//   if (loading)
//     return <p className="p-6 text-[#B476FF]">Loading menus...</p>;

//   // ================= ERROR =================
//   if (error)
//     return <p className="p-6 text-red-500">{error}</p>;

//   // ================= EMPTY =================
//   if (!Array.isArray(menus) || menus.length === 0)
//     return (
//       <div className="p-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-[#B476FF] mb-4"
//         >
//           ← Back
//         </button>
//         <p className="text-gray-500">No menus found.</p>
//       </div>
//     );

//   return (
//     <div className="p-6">

//       {/* BACK BUTTON */}
//       <button
//         onClick={() => navigate(-1)}
//         className="text-[#B476FF] mb-5"
//       >
//         ← Back
//       </button>

//       {/* SHOP INFO HEADER */}
//       <div className="mb-6">
//         <h2 className="text-xl font-bold text-[#B476FF]">
//           {shopInfo.shop_name}
//         </h2>
//         <p className="text-gray-500 text-sm">
//           {shopInfo.address}
//         </p>
//       </div>

//       {/* MENU GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-5">

//         {menus.map((m) => (
//           <div
//             key={m.id}
//             className="border border-[#B476FF] rounded-xl p-4 bg-white flex flex-col gap-2 shadow-md hover:shadow-lg transition-all"
//           >

//             {/* IMAGE */}
//             {m.photo ? (
//               <img
//                 src={`${getPhotoUrl(m.photo)}?t=${Date.now()}`}
//                 alt={m.name}
//                 className="w-full h-40 object-cover rounded-lg"
//               />
//             ) : (
//               <div className="w-full h-40 flex items-center justify-center bg-purple-100 border-2 border-dashed border-[#B476FF] rounded-lg">
//                 <p className="text-[#B476FF] text-sm">No Image</p>
//               </div>
//             )}

//             {/* NAME */}
//             <h4 className="text-lg font-bold text-[#B476FF]">
//               {m.name}
//             </h4>

//             {/* PRICE (FIXED) */}
//             <p className="text-sm text-gray-700">
//               Price:{" "}
//               <span className="font-medium">
//                 {formatPrices(m.prices)}
//               </span>
//             </p>

//             {/* CATEGORY */}
//             <p className="text-xs text-gray-500">
//               Category: {m.category}
//             </p>

//             {/* RATING */}
//             <p className="text-sm text-yellow-500">
//               ⭐ {m.rating} ({m.rating_count})
//             </p>

//             {/* STATUS */}
//             <p
//               className={
//                 m.open_menu
//                   ? "text-green-600 text-sm"
//                   : "text-red-500 text-sm"
//               }
//             >
//               {m.open_menu ? "Active" : "Inactive"}
//             </p>

//             {/* INGREDIENTS (NEW) */}
//             {m.relate_ingredients?.length > 0 && (
//               <p className="text-xs text-gray-500">
//                 Ingredients:{" "}
//                 {m.relate_ingredients.map((i) => i.name).join(", ")}
//               </p>
//             )}

//             {/* RELATED MENU (NEW) */}
//             {m.relate_menu?.length > 0 && (
//               <p className="text-xs text-purple-500">
//                 Related:{" "}
//                 {m.relate_menu.map((r) => r.name).join(", ")}
//               </p>
//             )}

//             {/* BUTTON */}
//             <button
//               onClick={() => setSelectedMenu(m)}
//               className="mt-2 bg-[#B476FF] text-white py-1 px-3 rounded-md text-sm font-semibold hover:bg-purple-700 transition-colors"
//             >
//               See Details
//             </button>
//           </div>
//         ))}

//       </div>

//       {/* POPUP */}
//       {selectedMenu && (
//         <MenuDetailPopup
//           menu={selectedMenu}
//           onClose={() => {
//             setSelectedMenu(null);
//             fetchMenus(); // refresh after close
//           }}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MenuDetailPopup from "../components/Shop/MenuDetailPopup";
import { Utensils } from "lucide-react";

export default function MenuListPage() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  const [shopInfo, setShopInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);

  // ================= FORMAT PRICE =================
  const formatPrices = (prices) => {
    if (!Array.isArray(prices)) return "N/A";
    return prices.map((p) => `${p.size}: ${p.price} Ks`).join(" • ");
  };

  // ================= FETCH =================
  const fetchMenus = async () => {
    try {
      const res = await axios.get(
        `http://38.60.244.137:3000/menu/${shopId}?t=${Date.now()}`,
      );

      setMenus(res.data.menus || []);
      setShopInfo(res.data.shop || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!shopId) return;
    setLoading(true);
    fetchMenus();
  }, [shopId]);

  // ================= POLLING =================
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMenus();
    }, 5000);

    return () => clearInterval(interval);
  }, [shopId]);

  const getPhotoUrl = (photo) =>
    photo ? `http://38.60.244.137:3000/menu-uploads/${photo}` : null;

  // ================= LOADING =================
  if (loading)
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-[#B476FF] animate-pulse text-lg">Loading menus...</p>
      </div>
    );

  return (
    <div className="min-h-screen  text-white p-6">
      {/* BACK + SHOP HEADER */}
      {/* <div className="mb-6 flex flex-col items-start justify-between">
       <div className="flex items-center gap-3 justify-between">
         <button
          onClick={() => navigate(-1)}
          className="text-[#B476FF] hover:text-purple-300 transition"
        >
          ← Back
        </button>

        <div className="text-right">
          <h1 className="text-xl font-bold text-[#B476FF]">
            {shopInfo.shop_name}
          </h1>
          <p className="text-gray-400 text-sm">{shopInfo.address}</p>
        </div>
       </div>

        <div>
          There is no Menu yet!
        </div>
      </div> */}
      {/* BACK + SHOP HEADER */}
{/* BACK + SHOP HEADER */}
<div className="mb-6">

  {/* HEADER CARD */}
  <div className="flex items-center justify-between bg-[#0f172a] border border-slate-700 rounded-2xl px-5 py-4 shadow-lg">

    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-[#B476FF] hover:text-purple-300 transition font-medium"
    >
      <span className="text-lg">←</span>
      Back
    </button>

    <div className="text-right">
      <h1 className="text-xl font-bold text-slate-100">
        {shopInfo.shop_name}
      </h1>
      <p className="text-slate-400 text-sm">
        {shopInfo.address}
      </p>
    </div>

  </div>

  {/* ✅ EMPTY STATE (ONLY WHEN NO MENU) */}
  {menus.length === 0 && (
    <div className="mt-6 flex flex-col items-center justify-center py-12 bg-[#0f172a] border border-slate-700 rounded-2xl shadow-md">

      <Utensils
        size={44}
        className="text-[#B476FF] mb-3 drop-shadow-[0_0_10px_rgba(180,118,255,0.6)]"
      />

      <h2 className="text-lg font-semibold text-slate-200">
        No Menu Available
      </h2>

      <p className="text-sm text-slate-400 mt-1">
        This shop hasn’t added any menu items yet.
      </p>

    </div>
  )}

</div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
        {menus.map((m) => (
          <div
            key={m.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all hover:-translate-y-1"
          >
            {/* IMAGE */}
            <div className="relative">
              {m.photo ? (
                <img
                  src={`${getPhotoUrl(m.photo)}?t=${Date.now()}`}
                  alt={m.name}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 flex items-center justify-center bg-gray-800 text-gray-500">
                  No Image
                </div>
              )}

              {/* STATUS BADGE */}
              <span
                className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${
                  m.open_menu
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {m.open_menu ? "Active" : "Inactive"}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col gap-2">
              {/* NAME */}
              <h3 className="text-lg font-bold text-white">{m.name}</h3>

              {/* CATEGORY */}
              <p className="text-xs text-gray-400">#{m.category}</p>

              {/* PRICE */}
              <p className="text-sm text-gray-300">
                <span className="text-[#B476FF] font-semibold">Price:</span>{" "}
                {formatPrices(m.prices)}
              </p>

              {/* RATING */}
              <p className="text-sm text-yellow-400">
                ⭐ {m.rating} ({m.rating_count})
              </p>

              {/* INGREDIENTS */}
              {/* {m.relate_ingredients?.length > 0 && (
                <p className="text-xs text-gray-500">
                  Ingredients:{" "}
                  {m.relate_ingredients.map((i) => i.name).join(", ")}
                </p>
              )} */}
              <p className="text-md text-gray-500">
                Ingredients:{" "}
                {m.relate_ingredients?.length > 0 ? (
                  <span className="text-gray-300">
                    {m.relate_ingredients.map((i) => i.name).join(", ")}
                  </span>
                ) : (
                  <span className="text-red-400">None</span>
                )}
              </p>

              {/* BUTTON */}
              <button
                onClick={() => setSelectedMenu(m)}
                className="mt-2 bg-[#B476FF] hover:bg-purple-600 transition text-white py-2 rounded-lg text-sm font-semibold"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedMenu && (
        <MenuDetailPopup
          menu={selectedMenu}
          onClose={() => {
            setSelectedMenu(null);
            fetchMenus();
          }}
        />
      )}
    </div>
  );
}
