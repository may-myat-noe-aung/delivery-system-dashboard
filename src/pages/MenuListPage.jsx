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
  

//   useEffect(() => {
//     if (!shopId) return;

//     const timeout = setTimeout(() => {
//       const fetchData = async () => {
//         try {
//           const url = `http://38.60.244.108:3000/menu/${shopId}`;
//           console.log("Fetching menu from:", url);

//           const res = await axios.get(url);
//           console.log("API RESPONSE:", res.data);

//           setMenus(res.data.menus || []);
//           setShopInfo(res.data.shop || {});
//         } catch (err) {
//           console.error("Failed to fetch menu:", err);
//           setError("Failed to fetch menu data");
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     }, 500);
//     return () => clearTimeout(timeout);
//   }, [shopId]);

//   const getPhotoUrl = (photo) => {
//     if (!photo) return null;
//     return `http://38.60.244.108:3000/menu-uploads/${photo}`;
//   };

//   if (loading) return <p className="p-6 text-[#B476FF]">Loading...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!Array.isArray(menus) || menus.length === 0)
//     return (
//       <div className="p-6">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-[#B476FF] mb-5"
//         >
//           ← Back
//         </button>

//         {/* No menus message */}
//         <p className="text-gray-500">No menus found.</p>
//       </div>
//     );

//   return (
//     <div className="p-6">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center text-[#B476FF] mb-5"
//       >
//         ← Back
//       </button>

//       {/* Menu Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-5">
//         {menus.map((m) => (
//           <div
//             key={m.id}
//             className="border border-[#B476FF] rounded-xl p-4 bg-white flex flex-col gap-1 shadow-md hover:shadow-lg transition-shadow"
//           >
//             {/* Photo */}
//             {m.photo ? (
//               <img
//                 src={getPhotoUrl(m.photo)}
//                 alt={m.name}
//                 className="w-full h-40 object-cover rounded-lg"
//               />
//             ) : (
//               <div className="w-full h-40 flex items-center justify-center bg-purple-100 border-2 border-dashed border-[#B476FF] rounded-lg">
//                 <p className="text-[#B476FF] text-sm">No Image</p>
//               </div>
//             )}

//             {/* Name */}
//             <h4 className="text-lg font-bold text-[#B476FF]">{m.name}</h4>

//             {/* Price */}
//             <p className="text-sm text-gray-700">
//               Price: <span className="font-medium">{m.prices} Ks</span>
//             </p>

//             {/* See Details Button */}
//             <button
//               onClick={() => setSelectedMenu(m)}
//               className="mt-2 bg-[#B476FF] text-white py-1 px-3 rounded-md text-sm font-semibold hover:bg-purple-700 transition-colors"
//             >
//               See Details
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Popup */}
//       {selectedMenu && (
//         <MenuDetailPopup
//           menu={selectedMenu}
//           onClose={() => setSelectedMenu(null)}
//         />
//       )}
//       {/* {selectedMenu && (
//         <MenuDetailPopup
//           menu={selectedMenu}
//           onClose={() => setSelectedMenu(null)}
//         />
//       )} */}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MenuDetailPopup from "../components/Shop/MenuDetailPopup";

export default function MenuListPage() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [shopInfo, setShopInfo] = useState({});
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(null);

  // ✅ NEW: fetchMenus function (centralized)
  const fetchMenus = async () => {
    try {
      const url = `http://38.60.244.108:3000/menu/${shopId}?t=${Date.now()}`;
      console.log("Fetching menu from:", url);

      const res = await axios.get(url);
      console.log("API RESPONSE:", res.data);

      // force re-render
      setMenus([...(res.data.menus || [])]);
      setShopInfo(res.data.shop || {});
    } catch (err) {
      console.error("Failed to fetch menu:", err);
      setError("Failed to fetch menu data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial fetch (page load / shopId change)
  useEffect(() => {
    if (!shopId) return;
    setLoading(true);
    fetchMenus();
  }, [shopId]);

  // ✅ LIVE polling (auto update without reload)
  useEffect(() => {
    if (!shopId) return;

    const interval = setInterval(() => {
      fetchMenus();
    }, 500); // every 3 seconds

    return () => clearInterval(interval);
  }, [shopId]);

  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    return `http://38.60.244.108:3000/menu-uploads/${photo}`;
  };

  if (loading) return <p className="p-6 text-[#B476FF]">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  if (!Array.isArray(menus) || menus.length === 0)
    return (
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#B476FF] mb-5"
        >
          ← Back
        </button>
        <p className="text-gray-500">No menus found.</p>
      </div>
    );

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#B476FF] mb-5"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-5">
        {menus.map((m) => (
          <div
            key={m.id}
            className="border border-[#B476FF] rounded-xl p-4 bg-white flex flex-col gap-1 shadow-md hover:shadow-lg transition-shadow"
          >
            {m.photo ? (
              <img
                src={`${getPhotoUrl(m.photo)}?t=${Date.now()}`}
                alt={m.name}
                className="w-full h-40 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-purple-100 border-2 border-dashed border-[#B476FF] rounded-lg">
                <p className="text-[#B476FF] text-sm">No Image</p>
              </div>
            )}

            <h4 className="text-lg font-bold text-[#B476FF]">{m.name}</h4>

            <p className="text-sm text-gray-700">
              Price: <span className="font-medium">{m.prices} Ks</span>
            </p>

            <button
              onClick={() => setSelectedMenu(m)}
              className="mt-2 bg-[#B476FF] text-white py-1 px-3 rounded-md text-sm font-semibold hover:bg-purple-700 transition-colors"
            >
              See Details
            </button>
          </div>
        ))}
      </div>

      {selectedMenu && (
        <MenuDetailPopup
          menu={selectedMenu}
          onClose={() => {
            setSelectedMenu(null);
            fetchMenus(); // refresh after close
          }}
        />
      )}
    </div>
  );
}
