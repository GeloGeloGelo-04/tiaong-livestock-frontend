import React from "react";
import { PageContainer } from "../../components/layout/PageContainer";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, PieChart } from "@mui/x-charts";
import { TIAONG_BRGY } from "../../utils/constant";
import { Box, Stack } from "@mui/material";
import useData from "../../hooks/useData";

const livestockColor = {
  pig: "#F6A4D4",
  chicken: "#FF6F61",
  cow: "#FFDA77",
  duck: "#B7E4C7",
  goat: "#A2D2FF",
  horse: "#E9CBA7",
  carabao: "#D4A5A5",
};

const LivestockDashB = () => {
  const { totalLivestock } = useData();

  const data = totalLivestock
    ? Object.entries(totalLivestock?.livestock).map(([key, value, index]) => ({
        id: index,
        value: value,
        label: key,
        color: livestockColor[key],
      }))
    : [];

  return (
    <PageContainer
      titleText="Livestock Records"
      subText="Overview of livestock records."
    >
      <PieChart
        series={[
          {
            data: data,
            arcLabel: "formattedValue",
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 20, additionalRadius: -30, color: "gray" },
            innerRadius: 30,
            cornerRadius: 5,
            startAngle: -180,
            endAngle: 360,
            paddingAngle: 2,
          },
        ]}
      />
    </PageContainer>
  );
};

export default LivestockDashB;
