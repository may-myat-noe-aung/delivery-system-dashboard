import React, { useState } from "react";
import FinanceSummaryCards from "../components/Finance/FinanceSummaryCards";
import FinanceShopDetails from "../components/Finance/FinanceShopDetails";
import FinanceShopList from "../components/Finance/FinanceShopList";

const FinancePage = () => {
    const [selectedShop, setSelectedShop] = useState(null);
  return (
    <div className="">
      {/* Summary Cards */}
      <FinanceSummaryCards />
      {/* Shops */} 
      <FinanceShopList onSelectShop={setSelectedShop} />
      {/* Shop Finance Details */}
      <FinanceShopDetails
        shop={selectedShop}
        onClose={() => setSelectedShop(null)}
      />
    </div>
  );
};

export default FinancePage;
