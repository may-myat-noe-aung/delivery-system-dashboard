import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import ShopPage from "./pages/ShopPage";
import MenuPage from "./pages/MenuPage";
import DeliveryPage from "./pages/DeliveryPage";
import SaleHistoryPage from "./pages/SaleHistoryPage";
import ReportPage from "./pages/ReportPage";
import ManagementPage from "./pages/ManagementPage";
import SettingPage from "./pages/SettingPage";
import AddDeliveryMen from "./pages/AddDeliveryMen";
import TrackDeliveryMen from "./pages/TrackDeliveryMen";
import Account from "./components/Setting/Account";
import Preference from "./components/Setting/Preference";
import OrderReceivePage from "./pages/OrderReceivePage";
import AssignDeliveryMan from "./pages/AssignDeliveryMan";
import ChatPage from "./pages/ChatPage";
import MenuListPage from "./pages/MenuListPage";
import MenuDetail from "./components/Shop/MenuDetail";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/menu",
        element: <MenuPage />,
      },
      {
        path: "shop/menu-list/:shopId",
        element: <MenuListPage />,
      },
      // {
      //   path: "shop/menu-list/:shopId/detail/:menuId",
      //   element: <MenuDetail />,
      // },

      {
        path: "/orders/received",
        element: <OrderReceivePage />,
      },
      {
        path: "/delivery",
        element: <DeliveryPage />,
      },
      {
        path: "/orders/assignment",
        element: <AssignDeliveryMan />,
      },
      {
        path: "/delivery/add-delivery-men",
        element: <AddDeliveryMen />,
      },
      {
        path: "/delivery/track-delivery-men",
        element: <TrackDeliveryMen />,
      },
      // {
      //   path: "/salehistory",
      //   element: <SaleHistoryPage />,
      // },
      {
        path: "/report",
        element: <ReportPage />,
      },
      {
        path: "/management",
        element: <ManagementPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/setting",
        element: <SettingPage />,
        children: [
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "preference",
            element: <Preference />,
          },
        ],
      },
    ],
  },
]);

export default router;
