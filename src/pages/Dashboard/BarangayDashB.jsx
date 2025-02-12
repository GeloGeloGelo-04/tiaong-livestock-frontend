import React from "react";
import { PageContainer } from "../../components/layout/PageContainer";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, PieChart } from "@mui/x-charts";
import { TIAONG_BRGY } from "../../utils/constant";
import { Box, Stack, Typography } from "@mui/material";
import useData from "../../hooks/useData";

const barangayColors = {
  Anastacia: "#FFD700", // Gold
  Aquino: "#FF4500", // Orange Red
  "Ayusan I": "#DC143C", // Crimson
  "Ayusan II": "#800080", // Purple
  Behia: "#8B4513", // Saddle Brown
  Bukal: "#008000", // Green
  Bula: "#0000FF", // Blue
  Bulakin: "#4682B4", // Steel Blue
  Cabatang: "#FF1493", // Deep Pink
  Cabay: "#FFA500", // Orange
  "Del Rosario": "#32CD32", // Lime Green
  Lagalag: "#D2691E", // Chocolate
  Lalig: "#FF69B4", // Hot Pink
  Lumingon: "#87CEFA", // Light Sky Blue
  Lusacan: "#A52A2A", // Brown
  Paiisa: "#ADFF2F", // Green Yellow
  Palagaran: "#B22222", // Firebrick
  Quipot: "#556B2F", // Dark Olive Green
  "San Agustin": "#FF6347", // Tomato
  "San Isidro": "#DAA520", // Goldenrod
  "San Jose": "#4B0082", // Indigo
  "San Juan": "#228B22", // Forest Green
  "San Pedro": "#CD5C5C", // Indian Red
  Tagbakin: "#1E90FF", // Dodger Blue
  Talisay: "#FFD700", // Gold
  Tamisian: "#8B0000", // Dark Red
  "San Francisco": "#00CED1", // Dark Turquoise
  Manggahan: "#FF7F50", // Coral
  Mabuhay: "#556B2F", // Dark Olive Green
  Poblacion: "#2F4F4F", // Dark Slate Gray
  Mayumi: "#9932CC", // Dark Orchid
};

const BarangayDashB = () => {
  const { barangayRecordData } = useData();

  const data = barangayRecordData
    ? barangayRecordData?.map((item, index) => ({
      id: index,
      value: item?.totalLivestock,
      label: item?.barangay,
      color: barangayColors[item?.barangay] || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }))
    : [];

  return (
    <PageContainer
      titleText="Barangay Records"
      subText="Overview of livestock distribution across barangays"
    >
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
        <PieChart
          labelStyle={{
            fill: "white",
            fontSize: "10px",
          }}
          slotProps={{ legend: { hidden: true } }}
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
                `${params.value} ${params.value > 1 ? "Livestocks" : "Livestocks"
                }`,
            },
          ]}
        />
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          mt={2}
          sx={{
            width: "30%",
            maxHeight: "600px",
            overflowY: "auto",
          }}
        >
          {data.map((item, index) => (
            <Stack key={index} direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: item.color,
                }}
              />
              <Typography fontSize={16} variant="caption">{item.label}</Typography>
            </Stack>
          ))}
        </Box>

      </Box>
    </PageContainer>
  );
};

export default BarangayDashB;
