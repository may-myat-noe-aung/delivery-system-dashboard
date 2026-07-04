import React from "react";
import SummaryCards from "../components/Dashboard/SummaryCards";
import TopDeliveryManList from "../components/Dashboard/TopDeliveryManList";
import ShopMenus from "../components/Dashboard/ShopMenus";
import TopShopsThisMonth from "../components/Dashboard/TopShopsThisMonth";
import TopLessShopsThisMonth from "../components/Dashboard/TopLessShopsThisMonth";
import TopMenusThisMonth from "../components/Dashboard/TopMenusThisMonth";
import TopLessMenusThisMonth from "../components/Dashboard/TopLessMenusThisMonth";
import SystemOrderChart from "../components/Dashboard/SystemOrderChart";

const DashboardPage = () => {
  return (
    <section className="min-h-screen overflow-y-auto  text-gray-100">
      <SummaryCards />

      <SystemOrderChart />
      <div className="grid grid-cols-1  gap-6 my-6">
        <TopMenusThisMonth className="col-span-1" />
        <TopLessMenusThisMonth className="col-span-1" />
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 mb-6">
        <TopShopsThisMonth className="col-span-1" />
        <TopLessShopsThisMonth className="col-span-1" />
      </div>
  <div className="mb-6">

      <TopDeliveryManList />
  </div>


      <ShopMenus />
    </section>
  );
};

export default DashboardPage;
