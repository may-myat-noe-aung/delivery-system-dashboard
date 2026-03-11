// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AddShopCard from "./AddShopCard";
// import ShopDetailModal from "./ShopDetailModal";

// export default function ShopApprove() {
//   const [shops, setShops] = useState([]);
//   const [selectedShop, setSelectedShop] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch API with 500ms delay
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchShops();
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   const fetchShops = async () => {
//     try {
//       const res = await axios.get("http://38.60.244.137:3000/shops-approve");

//       if (res.data.message) {
//         alert(res.data.message);
//       }

//       setShops(res.data);
//     } catch (err) {
//       alert("Failed to load shops");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading…</p>;

//   return (
//     <>
//       <AddShopCard shops={shops} onDetail={(shop) => setSelectedShop(shop)} />

//       {selectedShop && (
//         <ShopDetailModal
//           shop={selectedShop}
//           onClose={() => setSelectedShop(null)}
//         />
//       )}
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddShopCard from "./AddShopCard";
import ShopDetailModal from "./ShopDetailModal";

export default function ShopApprove() {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch shops with 500ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchShops();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const fetchShops = async () => {
    try {
      const res = await axios.get("http://38.60.244.137:3000/shops-approve");

      // Optional: show API message
      if (res.data.message) {
        alert(res.data.message);
      }

      setShops(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load shops");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-[#B476FF] p-6 font-medium text-lg">Loading…</p>
    );

  return (
    <>
      {/* Shop Cards */}
      <AddShopCard
        shops={shops}
        onDetail={(shop) => setSelectedShop(shop)}
      />

      {/* Shop Detail Modal */}
      {selectedShop && (
        <ShopDetailModal
          shop={selectedShop}
          onClose={() => setSelectedShop(null)}
        />
      )}
    </>
  );
}
