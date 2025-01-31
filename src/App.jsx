import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import "./styles/global.scss";
import LoginPage from "./pages/LoginPage/";
import Heatmap from "./pages/Heatmap/index.jsx";
import RequireAuth from "./components/auth/RequireAuth.jsx";
import PersistLogin from "./components/auth/PersistLogin.jsx";
import Missing from "./pages/404.jsx";
import Farmers from "./pages/Farmers/index.jsx";
import FarmersLayout from "./pages/Farmers/FarmersLayout.jsx";
import FarmersArchived from "./pages/Farmers/FarmersArchived.jsx";
import FarmersReports from "./pages/Farmers/FarmersReports.jsx";
import Approval from "./pages/Approval/index.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import Announcement from "./pages/Announcement/index.jsx";
import ApprovalLayout from "./pages/Approval/ApprovalLayout.jsx";
import RejectedPage from "./pages/Approval/RejectedPage.jsx";
import DashboardLayout from "./pages/Dashboard/DashboardLayout.jsx";
import BarangayDashB from "./pages/Dashboard/BarangayDashB.jsx";
import LivestockDashB from "./pages/Dashboard/LivestockDashB.jsx";
import MoratlityDashB from "./pages/Dashboard/MoratlityDashB.jsx";
import FarmersDashB from "./pages/Dashboard/FarmersDashB.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="dashboard" replace />} />

              <Route path="dashboard" element={<DashboardLayout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="barangay" element={<BarangayDashB />} />
                <Route path="farmers-per-brgy" element={<FarmersDashB />} />
                <Route path="livestock" element={<LivestockDashB />} />
                <Route path="mortality" element={<MoratlityDashB />} />
              </Route>
              <Route path="heatmap" element={<Heatmap />} />
              <Route path="approval" element={<ApprovalLayout />}>
                <Route path="" element={<Approval />} />
                <Route path="rejected" element={<RejectedPage />} />
              </Route>
              <Route path="farmers" element={<FarmersLayout />}>
                <Route path="" element={<Farmers />} />
                <Route path="archived" element={<FarmersArchived />} />
                <Route path="reports" element={<FarmersReports />} />
              </Route>
              <Route path="announcement" element={<Announcement />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
