import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainMenuList from "../components/MainMenu/MainMenuList";

const MainMenuShopMenuPage = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-gray-900">
      <MainMenuList
        shop={{ shop_id: shopId }}
        onBack={() => navigate("/main-menu-management")}
      />
    </div>
  );
};

export default MainMenuShopMenuPage;