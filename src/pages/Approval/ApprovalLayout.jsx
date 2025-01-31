import React from "react";
import { Outlet } from "react-router-dom";
import { PageContainer } from "../../components/layout/PageContainer";

const ApprovalLayout = () => {
  return (
    <PageContainer
      tabs={[
        { to: "", label: "Approval" },
        { to: "rejected", label: "Rejected" },
      ]}
    >
      <Outlet />
    </PageContainer>
  );
};

export default ApprovalLayout;
