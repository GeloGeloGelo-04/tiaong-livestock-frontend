import React from "react";
import { PageContainer } from "../../components/layout/PageContainer";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, PieChart } from "@mui/x-charts";
import { TIAONG_BRGY } from "../../utils/constant";
import { Box, Stack } from "@mui/material";
import useData from "../../hooks/useData";

const barangayColors = {
  Anastacia: "#FAD02E", // Yellow
  Aquino: "#F28D35", // Orange
  "Ayusan I": "#6A4C93", // Red
  "Ayusan II": "#F25F5C", // Purple
  Behia: "#F1C6A4", // Light Brown
  Bukal: "#A9D2B4", // Mint Green
  Bula: "#3F88C5", // Blue
  Bulakin: "#36A2EB", // Light Blue
  Cabatang: "#FF6F61", // Coral Red
  Cabay: "#FFDA77", // Soft Yellow
  "Del Rosario": "#B7E4C7", // Light Green
  Lagalag: "#E9CBA7", // Sand
  Lalig: "#F6A4D4", // Soft Pink
  Lumingon: "#A2D2FF", // Sky Blue
  Lusacan: "#D4A5A5", // Dusty Rose
  Paiisa: "#D4E157", // Lime Green
  Palagaran: "#E57373", // Light Red
  Quipot: "#81C784", // Soft Green
  "San Agustin": "#FFB74D", // Amber
  "San Isidro": "#FF8A65", // Soft Orange
  "San Jose": "#7B1FA2", // Deep Purple
  "San Juan": "#4CAF50", // Green
  "San Pedro": "#FF7043", // Deep Orange
  Tagbakin: "#64B5F6", // Light Blue
  Talisay: "#FFB300", // Bright Yellow
  Tamisian: "#9E9D24", // Olive Green
  "San Francisco": "#00BCD4", // Teal
  Manggahan: "#FF8C00", // Dark Orange
  Mabuhay: "#6B8E23", // Olive Green
  Poblacion: "#8B4513", // Saddle Brown
  Mayumi: "#800080", // Purple
};

const FarmersDashB = () => {
  const { farmersPerBarangay } = useData();
  console.log("barangayRecordData");
  console.log(farmersPerBarangay);

  const data = farmersPerBarangay
    ? farmersPerBarangay?.map((item, index) => ({
        id: index,
        value: item?.totalLivestock,
        label: item?.barangay,
      }))
    : [];

  return (
    <PageContainer
      titleText="Barangay Records"
      subText="Number of Farmers per Barangay"
    >
      <PieChart
        labelStyle={{
          fill: "white",
          fontSize: "10px",
        }}
        series={[
          {
            data: data,
            arcLabel: "value",
            highlightScope: { faded: "series", highlighted: "item" },
            faded: {
              innerRadius: 20,
              additionalRadius: -30,
              color: "gray",
            },
            innerRadius: 30,
            cornerRadius: 5,
            startAngle: -180,
            endAngle: 360,
            paddingAngle: 1,
            valueFormatter: (params) =>
              `${params.value} ${params.value > 1 ? "Farmers" : "Farmer"}`,
          },
        ]}
      />
    </PageContainer>
  );
};

export default FarmersDashB;
