// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import MenuDetailPopup from "../components/Shop/MenuDetailPopup";

// export default function MenuListPage() {
//   const { shopId } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [selectedMenu, setSelectedMenu] = useState(null);

//   useEffect(() => {
//     if (!shopId) return;

//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`http://38.60.244.108:3000/menu/${shopId}`);
//         setData(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch menu data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [shopId]);

//   // Updated photo URL for menu items
//   const getPhotoUrl = (photo) => {
//     if (!photo) return null;
//     return photo.startsWith("http")
//       ? photo
//       : `http://38.60.244.108:3000/menu-uploads/${photo}`;
//   };

//   if (loading) return <p className="p-6 text-[#B476FF]">Loading...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!data || !data.menus.length)
//     return <p className="p-6 text-gray-500">No menus found.</p>;

//   const { shop, menus } = data;

//   return (
//     <div className="p-6">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center text-[#B476FF] mb-5"
//       >
//         ← Back
//       </button>

//       {/* Menu Grid - Responsive */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
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

//             {/* OPEN POPUP */}
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
//           onClose={() => setSelectedMenu(null)}
//         />
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import MenuDetailPopup from "../components/Shop/MenuDetailPopup";

// export default function MenuListPage() {
//   const { shopId } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [selectedMenu, setSelectedMenu] = useState(null);

//   useEffect(() => {
//     if (!shopId) return;

//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`http://38.60.244.108:3000/menu/${shopId}`);
//         setData(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch menu data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [shopId]);

//   // Correct photo URL
//   const getPhotoUrl = (photo) => {
//     if (!photo) return null;
//     return `http://38.60.244.108:3000/menu-uploads/${photo}`;

//   };

//   if (loading) return <p className="p-6 text-[#B476FF]">Loading...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!data || !data.menus.length)
//     return <p className="p-6 text-gray-500">No menus found.</p>;

//   const { shop, menus } = data;

//   return (
//     <div className="p-6">

//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center text-[#B476FF] mb-5"
//       >
//         ← Back
//       </button>

//       {/* Shop Info */}
//       <div className="mb-6 p-4 border border-[#B476FF] rounded-xl bg-white shadow-sm">
//         <h2 className="text-xl font-bold text-[#B476FF]">{shop.shop_name }</h2>
//         <p className="text-gray-700">📞 {shop.phone}</p>
//         <p className="text-gray-700">📍 {shop.address}</p>
//         <p className="text-gray-700">📌 {shop.location}</p>
//       </div>

//       {/* Menu Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
//         {menus.map((m) => (
//           <div
//             key={m.id}
//             className="border border-[#B476FF] rounded-xl p-4 bg-white flex flex-col gap-1 shadow-md hover:shadow-lg transition-shadow"
//           >
//             {/* Image */}
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

//             {/* Button */}
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

  useEffect(() => {
    if (!shopId) return;

    const fetchData = async () => {
      try {
        const url = `http://38.60.244.108:3000/menu/${shopId}`;
        console.log("Fetching menu from:", url);

        const res = await axios.get(url);
        console.log("API RESPONSE:", res.data);

        // ✅ FIX: Set menus and shop info correctly
        setMenus(res.data.menus || []);
        setShopInfo(res.data.shop || {});
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        setError("Failed to fetch menu data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId]);

  // Correct photo URL
  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    return `http://38.60.244.108:3000/menu-uploads/${photo}`;
  };

  if (loading) return <p className="p-6 text-[#B476FF]">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
if (!Array.isArray(menus) || menus.length === 0)
  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#B476FF] mb-5"
      >
        ← Back
      </button>

      {/* No menus message */}
      <p className="text-gray-500">No menus found.</p>
    </div>
  );

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#B476FF] mb-5"
      >
        ← Back
      </button>

      {/* Shop Info */}
      {/* <div className="mb-6 p-4 border border-[#B476FF] rounded-xl bg-white shadow-sm">
        <h2 className="text-xl font-bold text-[#B476FF]">
          {shopInfo.shop_name}
        </h2>
        <p className="text-gray-700">📞 {shopInfo.phone}</p>
        <p className="text-gray-700">📍 {shopInfo.address}</p>
        <p className="text-gray-700">📌 {shopInfo.location}</p>
      </div> */}

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-5">
        {menus.map((m) => (
          <div
            key={m.id}
            className="border border-[#B476FF] rounded-xl p-4 bg-white flex flex-col gap-1 shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Photo */}
            {m.photo ? (
              <img
                src={getPhotoUrl(m.photo)}
                alt={m.name}
                className="w-full h-40 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-purple-100 border-2 border-dashed border-[#B476FF] rounded-lg">
                <p className="text-[#B476FF] text-sm">No Image</p>
              </div>
            )}

            {/* Name */}
            <h4 className="text-lg font-bold text-[#B476FF]">{m.name}</h4>

            {/* Price */}
            <p className="text-sm text-gray-700">
              Price: <span className="font-medium">{m.prices} Ks</span>
            </p>

            {/* See Details Button */}
            <button
              onClick={() => setSelectedMenu(m)}
              className="mt-2 bg-[#B476FF] text-white py-1 px-3 rounded-md text-sm font-semibold hover:bg-purple-700 transition-colors"
            >
              See Details
            </button>
          </div>
        ))}
      </div>

      {/* Popup */}
      {selectedMenu && (
        <MenuDetailPopup
          menu={selectedMenu}
          onClose={() => setSelectedMenu(null)}
        />
      )}
      {/* {selectedMenu && (
        <MenuDetailPopup
          menu={selectedMenu}
          onClose={() => setSelectedMenu(null)}
        />
      )} */}
    </div>
  );
}
