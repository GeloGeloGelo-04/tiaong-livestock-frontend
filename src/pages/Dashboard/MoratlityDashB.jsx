import React from "react";
import { PageContainer } from "../../components/layout/PageContainer";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, PieChart } from "@mui/x-charts";
import { TIAONG_BRGY } from "../../utils/constant";
import { Box, Stack } from "@mui/material";
import useData from "../../hooks/useData";

const color = {
  pig: "#D385A0", // Darker version of Pink
  chicken: "#E04E47", // Darker version of Coral Red
  cow: "#E1C25D", // Darker version of Soft Yellow
  duck: "#A0D1B7", // Darker version of Light Green
  goat: "#7FADD9", // Darker version of Sky Blue
  horse: "#C6A891", // Darker version of Sand
  carabao: "#B78888", // Darker version of Dusty Rose
};

const MoratlityDashB = () => {
  const { totalLivestock } = useData();

  const data = totalLivestock
    ? Object.entries(totalLivestock?.mortality).map(([key, value, index]) => ({
        id: index,
        value: value,
        label: key,
        color: color[key],
      }))
    : [];

  return (
    <PageContainer
      titleText="Mortality Records"
      subText="Overview of mortality records."
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

export default MoratlityDashB;
