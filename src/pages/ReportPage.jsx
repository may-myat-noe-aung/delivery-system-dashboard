import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShopReportList from "../components/Report/ShopReportList";
import ViewShopDetail from "../components/Shop/ViewShopDetail";
import ReportSummaryCards from "../components/Report/ReportSummaryCards";


const ReportPage = () => {
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
        const res = await axios.get("https://api.pwezayshops.com/shops-approve");
        setShops(res.data);
      } catch (err) {
        console.error("Failed to fetch shops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  // ✅ open shop report page
const handleViewReport = (shop) => {
  navigate(`/reports/${shop.id}`, {
    state: { shopName: shop.shop_name }
  });
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
<>
      <ReportSummaryCards/>

    <section className="">

      {/* ✅ Shop Cards */}
      <ShopReportList
        shops={shops}
        onDetail={handleViewReport}
        onViewShopDetails={handleViewShopDetails}
      />

    </section>
</>
  );
};

export default ReportPage;
