import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";

const Layout = () => {
  return (
    <main className="min-h-screen bg-[#f5f5f5] w-full relative ">
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
