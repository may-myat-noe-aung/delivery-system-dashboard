// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AddShopCard from "../components/Shop/AddShopCard";
// import axios from "axios";

// const ShopPage = () => {
//   const [shops, setShops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch shops on mount
//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         const res = await axios.get("http://38.60.244.137:3000/shops");
//         setShops(res.data);
//       } catch (err) {
//         console.error("Failed to fetch shops:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchShops();
//   }, []);

//   // Called when "View Menu" button in AddShopCard is clicked
//   const handleViewMenu = (shopId) => {
//     navigate(`/shop/menu-list/${shopId}`);
//   };

//   if (loading)
//     return (
//       <p className="p-6 text-[#B476FF] text-lg">
//         Loading shops...
//       </p>
//     );

//   return (
//     <section className="flex w-full h-[750px] overflow-y-auto max-w-8xl px-4">
//       {shops.length > 0 ? (
//         <AddShopCard shops={shops} onDetail={handleViewMenu} />
//       ) : (
//         <p className="text-gray-500 text-lg mt-6">No shops available.</p>
//       )}
//     </section>
//   );
// };

// export default ShopPage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AddShopCard from "../components/Shop/AddShopCard";

// const ShopPage = () => {
//   const [shops, setShops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         const res = await axios.get("http://38.60.244.137:3000/shops");
//         setShops(res.data);
//       } catch (err) {
//         console.error("Failed to fetch shops:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchShops();
//   }, []);

//   const handleViewMenu = (shopId) => {
//     navigate(`/shop/menu-list/${shopId}`);
//   };

//   const handleViewShopDetails = (shopId) => {
//     navigate(`/shop/details/${shopId}`);
//   };

//   if (loading)
//     return <p className="p-6 text-[#B476FF] text-lg">Loading shops...</p>;

//   return (
//     <section className="flex w-full  overflow-y-auto max-w-8xl px-4">
//       {shops.length > 0 ? (
//         <AddShopCard
//           shops={shops}
//           onDetail={handleViewMenu}
//           onViewShopDetails={handleViewShopDetails}
//         />
//       ) : (
//         <p className="text-gray-500 text-lg mt-6">No shops available.</p>
//       )}
//     </section>
//   );
// };

// export default ShopPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddShopCard from "../components/Shop/AddShopCard";
import ViewShopDetail from "../components/Shop/ViewShopDetail";

const ShopPage = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ modal states
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const navigate = useNavigate();

  // ✅ fetch shops
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get("http://38.60.244.137:3000/shops-approve");
        setShops(res.data);
      } catch (err) {
        console.error("Failed to fetch shops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  // ✅ open menu page
  const handleViewMenu = (shopId) => {
    navigate(`/shop/menu-list/${shopId}`);
  };

  // ✅ open modal (Shop Details)
  const handleViewShopDetails = (shopId) => {
    setSelectedShopId(shopId);
    setShowDetail(true);
  };

  // ✅ close modal
  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedShopId(null);
  };

  // ✅ loading UI
  if (loading) {
    return (
      <div className="p-6 text-[#B476FF] text-lg animate-pulse">
        Loading shops...
      </div>
    );
  }

  // ✅ empty state
  if (!shops.length) {
    return (
      <p className="text-gray-500 text-lg mt-6 px-4">
        No shops available.
      </p>
    );
  }

  return (
    <section className="flex w-full overflow-y-auto max-w-8xl px-4">

      {/* ✅ Shop Cards */}
      <AddShopCard
        shops={shops}
        onDetail={handleViewMenu}
        onViewShopDetails={handleViewShopDetails}
      />

      {/* ✅ Modal */}
      {showDetail && selectedShopId && (
        <ViewShopDetail
          shopId={selectedShopId}
          onClose={handleCloseDetail}
        />
      )}
    </section>
  );
};

export default ShopPage;
