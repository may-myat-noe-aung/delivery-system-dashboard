// import React, { useState } from "react";
// import ShopApprove from "../components/Shop/ShopApprove";
// // import ShopForm from '../components/Shop/ShopForm'
// // import AddShopCard from '../components/Shop/AddShopCard';

// const ShopPage = () => {
//   const [shops, setShops] = useState([]);

//   const handleAddShop = (shop) => {
//     setShops([shop, ...shops]);
//   };

//   return (
//     <section className="flex w-full h-[750px] overflow-y-auto max-w-8xl px-4   ">
//       {/* <ShopForm onAdd={handleAddShop} />
//       <AddShopCard shops={shops} /> */}
//       <ShopApprove />
//     </section>
//   );
// };

// export default ShopPage;
// ShopPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddShopCard from "../components/Shop/AddShopCard";
import axios from "axios";

const ShopPage = () => {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get("http://38.60.244.108:3000/shops");
        setShops(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShops();
  }, []);

  // THIS FUNCTION IS CALLED WHEN VIEW MENU BUTTON IS CLICKED
  const handleViewMenu = (shopId) => {
    navigate(`/shop/menu-list/${shopId}`); // <-- go to route
  };

  return (
    <section className="flex w-full h-[750px] overflow-y-auto max-w-8xl px-4">
      <AddShopCard shops={shops} onDetail={handleViewMenu} />
    </section>
  );
};

export default ShopPage;
