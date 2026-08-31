import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import ShopReportList from "../components/Report/ShopReportList";

import ViewShopDetail from "../components/Shop/ViewShopDetail";

import ReportSummaryCards from "../components/Report/ReportSummaryCards";

import ServerToggle from "../components/Report/ServerToggle";

import { apiFetch } from "../api";

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
        const res = await apiFetch(
          "https://api.pwezayshops.com/shops-approve"
        );

        if (!res) return;

        const data = await res.json();

        setShops(data);
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
      state: { shopName: shop.shop_name },
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

  return (
    <>
      {/* ✅ Report Summary Cards
          This component handles its own API + loading */}
      <ReportSummaryCards />

      {/* ✅ Server Toggle stays visible */}
      <ServerToggle />

      <section className="">
        {loading ? (
          /* ✅ Shop Report List loading only */
          <div className="p-6 text-[#B476FF] text-lg animate-pulse">
            Loading shops...
          </div>
        ) : !shops.length ? (
          /* ✅ Shop Report List empty state */
          <p className="text-gray-500 text-lg mt-6 px-4">
            No shops available.
          </p>
        ) : (
          /* ✅ Shop Cards */
          <ShopReportList
            shops={shops}
            onDetail={handleViewReport}
            onViewShopDetails={handleViewShopDetails}
          />
        )}
      </section>
    </>
  );
};

export default ReportPage;