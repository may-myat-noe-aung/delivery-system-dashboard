import React from "react";
import { useNavigate } from "react-router-dom";
import MainMenuShopList from "../components/MainMenu/MainMenuShopList";
import MainMenuSlots from "../components/MainMenu/MainMenuSlots";

const MainMenuManagementPage = () => {
  const navigate = useNavigate();

  const handleSelectShop = (item) => {
    const shopId =
      item?.shop?.shop_id ??
      item?.shop?.id ??
      item?.shop_id ??
      item?.id;

    if (!shopId) {
      console.error("Shop ID not found:", item);
      return;
    }

    navigate(`/main-menu-management/${shopId}`);
  };

  return (
    <div className="min-h-full bg-gray-900">
      <MainMenuSlots />

      <MainMenuShopList onSelectShop={handleSelectShop} />
    </div>
  );
};

export default MainMenuManagementPage;