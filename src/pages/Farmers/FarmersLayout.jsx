import React from "react";
import { Outlet } from "react-router-dom";
import { PageContainer } from "../../components/layout/PageContainer";

const FarmersLayout = () => {
  return (
    <PageContainer
      tabs={[
        { to: "", label: "Farmers" },
        { to: "archived", label: "Archived" },
        { to: "reports", label: "Reports" },
      ]}
    >
      <Outlet />
    </PageContainer>
  );
};

export default FarmersLayout;
