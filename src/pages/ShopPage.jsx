import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShopManagement from "../components/Shop/ShopManagement";
import ViewShopDetail from "../components/Shop/ViewShopDetail";
import ShopSummaryCards from "../components/Shop/ShopSummaryCards";

const ShopPage = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // ✅ modal states
const [selectedShop, setSelectedShop] = useState(null);

  const navigate = useNavigate();

  // ✅ fetch shops
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get(
          "https://api.pwezayshops.com/shops-approve",
          {
            headers: {
              Authorization: `MSHteam ${token}`,
            },
          }
        );
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
  const handleViewMenu = (shop) => {
  navigate(`/shop/menu-list/${shop.id}`, {
    state: {
      shopName: shop.shop_name,
    },
  });
};

  // ✅ open modal (Shop Details)
const handleViewShopDetails = (shop) => {
  setSelectedShop(shop);
};

  // ✅ close modal
const handleCloseDetail = () => {
  setSelectedShop(null);
};
  // ✅ loading UI
  if (loading) {
    return (
      <div className="p-6 text-[#B476FF] text-lg animate-pulse">
        Loading All Shops...
      </div>
    );
  }

  // ✅ empty state
  if (!shops.length) {
    return (
      <p className="text-gray-500 text-lg mt-6 px-4">No shops available.</p>
    );
  }

  return (
    <>
      <ShopSummaryCards />
      <section className="flex w-full ">
        {/* ✅ Shop Cards */}
        <ShopManagement
          shops={shops}
          onDetail={handleViewMenu}
          onViewShopDetails={handleViewShopDetails}
        />

        {/* ✅ Modal */}
       {selectedShop && (
  <ViewShopDetail
    shop={selectedShop}
    onClose={handleCloseDetail}
  />
)}
      </section>
    </>
  );
};

export default ShopPage;
