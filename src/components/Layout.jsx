


// import React from "react";
// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Aside from "./Aside";
// import Footer from "./Footer";

// const Layout = () => {
//   return (
//  <div className="flex h-screen bg-[#0f172a] text-white">
//       <Aside />

//       <div className="flex-1 flex flex-col">
//         <Header />

//         <div className="flex-1 overflow-y-auto p-8">
//           <Outlet />
//         </div>

//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Layout;
//     <main className="w-full relative ">
//       {/* <RoleRedirect />  */}

//       <section className="flex">
//         <Aside />
//         <div className="w-full flex flex-col min-h-screen bg-neutral-950 text-neutral-100">
//           <Header />
//           <Outlet />
//           <Footer />
//         </div>
//       </section>
//     </main>

import { Outlet } from "react-router-dom";
import Aside from "./Aside";
import Header from "./Header";
import Footer from "./Footer";



export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#0f172a] text-white">
      <Aside />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 overflow-y-auto p-6  ">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
}

