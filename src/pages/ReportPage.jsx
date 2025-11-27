import React from "react";
import RevenueAndOrderCards from "../components/Report/RevenueAndOrderCards";
import TopCards from "../components/Report/TopCards";
import StatusCards from "../components/Report/StatusCards";
import TopComplaintsAndTodo from "../components/Report/TopComplaintsAndTodo";
import PerformanceAndSatisfaction from "../components/Report/PerformanceAndSatisfaction";

const ReportPage = () => {
  return (
    <section className="h-[750px] overflow-y-auto max-w-8xl px-4 py-6 space-y-6">
      <TopCards />
      <RevenueAndOrderCards />
      <StatusCards />
      <TopComplaintsAndTodo />
      <PerformanceAndSatisfaction />
    </section>
  );
};

export default ReportPage;
