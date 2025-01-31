import React, { createContext, useRef } from "react";
import { useQuery } from "react-query";
import { fetchApprovalData, fetchRejectedData } from "../api/approvalAPI";
import { fetchFarmersArchivedData, fetchFarmersData } from "../api/farmersAPI";
import { fetchAnnouncementData } from "../api/announcementAPI";
import {
  fetchLivestockData,
  fetchTotalLivestock,
  fetchYearlyRecordData,
  fetchBarangayRecordData,
  fetchFarmersRecordData,
} from "../api/livestockAPI";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const { data: approvalData, isLoading: approvalDataLoading } = useQuery(
    "approvalData",
    fetchApprovalData
  );
  const { data: rejectedData, isLoading: rejectedDataLoading } = useQuery(
    "rejectedData",
    fetchRejectedData
  );
  const { data: farmersData, isLoading: farmersDataLoading } = useQuery(
    "farmersData",
    fetchFarmersData
  );
  const { data: farmersArchivedData, isLoading: farmersArchivedDataLoading } =
    useQuery("farmersArchivedData", fetchFarmersArchivedData);

  const { data: announcementData } = useQuery(
    "announcementData",
    fetchAnnouncementData
  );
  const { data: livestockData } = useQuery("livestockData", fetchLivestockData);
  const { data: totalLivestock } = useQuery(
    "totalLivestock",
    fetchTotalLivestock
  );
  const { data: yearlyRecordsData } = useQuery(
    "yearlyRecordsData",
    fetchYearlyRecordData
  );
  const { data: barangayRecordData } = useQuery(
    "barangayRecordData",
    fetchBarangayRecordData
  );
  const { data: farmersPerBarangay } = useQuery(
    "farmersPerBarangay",
    fetchFarmersRecordData
  );

  const contentRef = useRef(null);

  return (
    <DataContext.Provider
      value={{
        approvalData,
        approvalDataLoading,
        rejectedData,
        rejectedDataLoading,
        farmersData,
        farmersDataLoading,
        farmersArchivedData,
        farmersArchivedDataLoading,
        announcementData,
        livestockData,
        totalLivestock,
        yearlyRecordsData,
        barangayRecordData,
        contentRef,
        farmersPerBarangay,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
