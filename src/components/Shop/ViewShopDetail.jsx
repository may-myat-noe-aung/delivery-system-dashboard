// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ViewShopDetail = ({ shopId, onClose }) => {
//   const [shop, setShop] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchShop = async () => {
//       try {
//         const res = await axios.get(
//           `http://38.60.244.137:3000/shops/${shopId}`
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
//               src={`http://38.60.244.137:3000/shop-uploads/${shop.photo}`}
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Phone,
  Mail,
  Package,
  MapPin,
  CheckCircle,
  Shield,
  Calendar,
  CreditCard,
  Truck,
  Store,
} from "lucide-react";

const ViewShopDetail = ({ shopId, onClose }) => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(
          `http://38.60.244.137:3000/shops/${shopId}`,
        );
        setShop(res.data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (shopId) fetchShop();
  }, [shopId]);

  if (!shop) return null;

  // location parse
  const match = shop.location?.match(/Lag\s*([\d.-]+),\s*Log\s*([\d.-]+)/);
  const lat = match ? match[1] : 0;
  const lng = match ? match[2] : 0;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white w-[95%] max-w-5xl rounded-xl shadow-lg overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-[#B476FF] flex items-center gap-2">
            <Store /> Shop Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <p className="p-6">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* LEFT SIDE */}
            <div className="md:col-span-2 space-y-4">
              {/* BASIC INFO */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#B476FF] mb-3">
                  Basic Information
                </h3>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <p className="flex items-center gap-2">
                    <User size={16} /> {shop.shopkeeper_name}
                  </p>

                  <p className="flex items-center gap-2">
                    <Store size={16} /> {shop.shop_name}
                  </p>

                  <p className="flex items-center gap-2">
                    <Mail size={16} /> {shop.email}
                  </p>

                  <p className="flex items-center gap-2">
                    <Phone size={16} /> {shop.phone}
                  </p>

                  <p className="flex items-center gap-2">
                    <Package size={16} /> Items: {shop.items}
                  </p>

                  <p className="flex items-center gap-2">
                    <CheckCircle size={16} /> Status: {shop.status}
                  </p>

                  <p className="flex items-center gap-2">
                    <Shield size={16} /> Permission: {shop.permission}
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar size={16} /> {shop.created_at}
                  </p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-[#B476FF] font-semibold mb-2">Address</h3>
                <p className="text-sm text-gray-300">{shop.address}</p>
              </div>

              {/* PAYMENT INFO */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-[#B476FF] font-semibold mb-2 flex items-center gap-2">
                  <CreditCard size={16} /> Payment Info
                </h3>

                <p className="text-sm">
                  Method: {shop.payment_method?.join(", ")}
                </p>
                <p className="text-sm">Name: {shop.payment_name?.join(", ")}</p>
                <p className="text-sm">
                  Phone: {shop.payment_phone?.join(", ")}
                </p>
              </div>

              {/* DELIVERY SETTINGS */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-[#B476FF] font-semibold mb-2 flex items-center gap-2">
                  <Truck size={16} /> Delivery Settings
                </h3>

                <p className="text-sm">
                  Have Deliverymen: {shop.have_deliverymen ? "Yes" : "No"}
                </p>
                <p className="text-sm">
                  Delivery Fee Method: {shop.deli_fees_method}
                </p>
                <p className="text-sm">
                  Open Shop: {shop.open_shop ? "Open" : "Closed"}
                </p>
                <p className="text-sm">
                  Shop Delivery: {shop.open_shop_deli ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-4">
              {/* IMAGE */}
              {/* <div className="bg-gray-800 p-4 rounded-lg">
                <img
                  src={`http://38.60.244.137:3000/shop-uploads/${shop.photo}`}
                  className="w-full h-48 object-cover rounded"
                  alt="shop"
                />
              </div> */}

              {/* MAP */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-[#B476FF] font-semibold mb-2 flex items-center gap-2">
                  <MapPin size={16} /> Location
                </h3>

                <iframe
                  className="w-full h-64 rounded"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng},${lat},${lng},${lat}&layer=mapnik&marker=${lat},${lng}`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewShopDetail;
