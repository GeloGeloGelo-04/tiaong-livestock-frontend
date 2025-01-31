import React from "react";
import { Outlet } from "react-router-dom";
import { PageContainer } from "../../components/layout/PageContainer";

const DashboardLayout = () => {
  return (
    <PageContainer
      tabs={[
        { to: "", label: "Yearly Records" },
        { to: "barangay", label: "Barangay Records" },
        { to: "farmers-per-brgy", label: "Farmers" },
        { to: "livestock", label: "Livestock" },
        { to: "mortality", label: "Mortality" },
      ]}
    >
      <Outlet />
    </PageContainer>
  );
};

export default DashboardLayout;
