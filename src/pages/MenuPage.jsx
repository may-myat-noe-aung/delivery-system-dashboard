import React, { useState } from "react";
import MenuForm from "../components/Menu/MenuForm";
import AddMenuCard from "../components/Menu/addMenuCard";


const MenuPage = () => {
  const [menus, setMenus] = useState([]);

  const handleAddMenu = (menu) => {
    setMenus([menu, ...menus]);
  };

  return (
    <section className="flex w-full h-[750px] overflow-y-auto mx-auto max-w-8xl px-4  ">
      <MenuForm onAdd={handleAddMenu} />
      <AddMenuCard menus={menus} />
    </section>
  );
};

export default MenuPage;
