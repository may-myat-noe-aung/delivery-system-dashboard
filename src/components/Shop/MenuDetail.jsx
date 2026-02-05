// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function MenuDetail() {
//   const { shopId, menuId } = useParams();
//   const navigate = useNavigate();
//   const [menu, setMenu] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!shopId) return;

//     const fetchMenu = async () => {
//       try {
//         const res = await axios.get(`http://38.60.244.108:3000/menu/${shopId}`);
//         // Find the clicked menu by menuId
//         const foundMenu = res.data.menus.find((m) => m.id === menuId);
//         setMenu(foundMenu);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch menu details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenu();
//   }, [shopId, menuId]);

//   const getPhotoUrl = (photo) => {
//     if (!photo) return null;
//     return photo.startsWith("http")
//       ? photo
//       : `http://38.60.244.108:3000/uploads/${photo}`;
//   };

//   if (loading) return <p className="p-6 text-[#B476FF]">Loading...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   if (!menu) return <p className="p-6 text-gray-500">Menu not found.</p>;

//   return (
//     <div className="p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center text-[#B476FF] mb-5"
//       >
//         ← Back
//       </button>

//       <div className="max-w-lg mx-auto border border-[#B476FF] rounded-xl p-5 bg-white shadow-sm">
//         {menu.photo && (
//           <img
//             src={getPhotoUrl(menu.photo)}
//             alt={menu.name}
//             className="w-full h-60 object-cover rounded-lg mb-4"
//           />
//         )}

//         <h2 className="text-2xl font-bold text-[#B476FF] mb-2">{menu.name}</h2>

//         <p className="text-sm text-gray-700 mb-1">
//           Category: <span className="font-medium">{menu.category}</span>
//         </p>

//         <p className="text-sm text-gray-700 mb-1">
//           Price: <span className="font-medium">{menu.prices} Ks</span>
//         </p>

//         <p className="text-sm text-gray-600 mb-2">{menu.description}</p>

//         <p className="text-sm text-gray-600 mb-1">
//           Rating: ⭐ {menu.rating} ({menu.rating_count})
//         </p>

//         {menu.get_months && (
//           <p className="text-sm text-gray-600">
//             Months Available: {menu.get_months.join(", ")}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MenuDetail() {
  const { shopId, menuId } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shopId) return;

    const fetchMenu = async () => {
      try {
        const res = await axios.get(`http://38.60.244.108:3000/menu/${shopId}`);
        // Find the clicked menu by menuId
        const foundMenu = res.data.menus.find((m) => m.id === menuId);
        setMenu(foundMenu);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch menu details");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [shopId, menuId]);

  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    return photo.startsWith("http")
      ? photo
      : `http://38.60.244.108:3000/uploads/${photo}`;
  };

  if (loading)
    return (
      <p className="p-6 text-[#B476FF] font-medium text-center">Loading...</p>
    );
  if (error)
    return (
      <p className="p-6 text-red-500 font-medium text-center">{error}</p>
    );
  if (!menu)
    return (
      <p className="p-6 text-gray-500 font-medium text-center">
        Menu not found.
      </p>
    );

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#B476FF] font-semibold mb-5 hover:underline"
      >
        ← Back
      </button>

      {/* Menu Details Card */}
      <div className="max-w-lg mx-auto border border-[#B476FF] rounded-xl p-5 bg-white shadow-md">
        {/* Menu Image */}
        {menu.photo && (
          <img
            src={getPhotoUrl(menu.photo)}
            alt={menu.name}
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
        )}

        {/* Menu Info */}
        <h2 className="text-2xl font-bold text-[#B476FF] mb-2">{menu.name}</h2>

        <p className="text-sm text-gray-700 mb-1">
          Category: <span className="font-medium">{menu.category}</span>
        </p>

        <p className="text-sm text-gray-700 mb-1">
          Price: <span className="font-medium">{menu.prices} Ks</span>
        </p>

        <p className="text-sm text-gray-600 mb-2">{menu.description}</p>

        <p className="text-sm text-gray-600 mb-1">
          Rating: ⭐ {menu.rating} ({menu.rating_count})
        </p>

        {menu.get_months && menu.get_months.length > 0 && (
          <p className="text-sm text-gray-600">
            Months Available: {menu.get_months.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
