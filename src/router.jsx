import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import ShopPage from "./pages/ShopPage";
import DeliveryPage from "./pages/DeliveryPage";
import ReportPage from "./pages/ReportPage";
import ManagementPage from "./pages/ManagementPage";
import AddDeliveryMen from "./pages/AddDeliveryMenPage";
import TrackDeliveryMen from "./pages/TrackDeliveryMenPage";
import AssignDeliveryMan from "./pages/AssignDeliveryManPage";
import MenuListPage from "./pages/MenuListPage";
import LoginPage from "./pages/LoginPage";
import ShopDetailsModal from "./components/Management/ShopDetailsModal";
import ReportTable from "./components/Report/ReportTable";
import SettingPage from "./pages/SettingPage";
import ManagementPageForShopManager from "./pages/ManagementPageForShopManager";
import SettingPage2 from "./pages/SettingPage2";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,

    children: [
      {
        index: true,
        element: (
          <ProtectedRoute allowedRoles={["owner"]}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "/shop",
        element: (
          <ProtectedRoute allowedRoles={["owner", "manager", "shopmanager"]}>
            <ShopPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "/shop/details/:id",
        element: (
          <ProtectedRoute allowedRoles={["owner", "manager", "shopmanager"]}>
            <ShopDetailsModal />
          </ProtectedRoute>
        ),
      },

      {
        path: "/shop/menu-list/:shopId",
        element: (
          <ProtectedRoute allowedRoles={["owner", "manager", "shopmanager"]}>
            <MenuListPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "/delivery",
        element: (
          <ProtectedRoute allowedRoles={["owner", "manager", "delimanager"]}>
            <DeliveryPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "/delivery/assignment",
        element: (
          <ProtectedRoute allowedRoles={["owner", "manager", "delimanager"]}>
            <AssignDeliveryMan />
          </ProtectedRoute>
        ),
      },

      {
        path: "/delivery/add-delivery-men",
        element: (
          <ProtectedRoute allowedRoles={["owner", "manager", "delimanager"]}>
            <AddDeliveryMen />
          </ProtectedRoute>
        ),
      },

      {
        path: "/delivery/track-delivery-men",
        element: (
          <ProtectedRoute allowedRoles={["owner", "manager", "delimanager"]}>
            <TrackDeliveryMen />
          </ProtectedRoute>
        ),
      },

      {
        path: "/report",
        element: (
          <ProtectedRoute allowedRoles={["owner"]}>
            <ReportPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "/reports/:shopId",
        element: (
          <ProtectedRoute allowedRoles={["owner"]}>
            <ReportTable />
          </ProtectedRoute>
        ),
      },

      {
        path: "/management",
        element: (
          <ProtectedRoute allowedRoles={["owner","manager"]}>
            <ManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/shop-management",
        element: (
          <ProtectedRoute allowedRoles={["shopmanager"]}>
            <ManagementPageForShopManager />
          </ProtectedRoute>
        ),
      },

      {
        path: "/setting",
        element: (
          <ProtectedRoute allowedRoles={["owner"]}>
            <SettingPage />
          </ProtectedRoute>
        ),
      },
       {
        path: "/settingForManager",
        element: (
          <ProtectedRoute allowedRoles={["manager","shopmanager","delimanager"]}>
            <SettingPage2 />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
