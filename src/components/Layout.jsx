import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";

const Layout = () => {
  return (
    <main
      className="
        min-h-screen w-full relative
        bg-gray-100 dark:bg-gray-900
        text-gray-900 dark:text-gray-100
      "
    >
      <section className="flex">
        <Aside />

        <div className="w-full flex flex-col px-10">
          <Header />
          <Outlet />
        </div>
      </section>

      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
