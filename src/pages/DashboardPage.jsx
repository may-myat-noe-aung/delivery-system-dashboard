import React from "react";
import SummaryCards from "../components/Dashboard/SummaryCards";
import TotalSummaryOfSales from "../components/Dashboard/TotalSummaryOfSales";
import TopSellingItems from "../components/Dashboard/TopSellingItems";
import TopDeliveryManList from "../components/Dashboard/TopDeliveryManList";
import ReportDeliveryOrder from "../components/Dashboard/ReportDeliveryOrder";
import CustomerReviews from "../components/Dashboard/CustomerReviews";
const DashboardPage = () => {
  return (
    <section className=" h-[750px] overflow-y-auto  max-w-8xl px-4 py-6">
      <SummaryCards />
      <TotalSummaryOfSales />
      {/* Tables */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <TopSellingItems />
        <TopDeliveryManList />
      </div>
      <ReportDeliveryOrder />
      <CustomerReviews />
    </section>
  );
};

export default DashboardPage;
