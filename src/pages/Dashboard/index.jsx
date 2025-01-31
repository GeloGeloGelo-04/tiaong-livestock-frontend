import React, { useEffect, useState } from "react";
import { PageContainer } from "../../components/layout/PageContainer";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, PieChart } from "@mui/x-charts";
import { TIAONG_BRGY } from "../../utils/constant";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import useData from "../../hooks/useData";
import axios from "../../api/axios";
import { useQueryClient } from "react-query";
const Dashboard = () => {
  const queryClient = useQueryClient();

  const [yearlyRecordsData, setYearlyRecordsData] = useState();
  const date = new Date();
  const yearNow = date.getFullYear();
  const [year, setYear] = useState(yearNow);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.post("/livestock/yearly-records", {
          year,
        });

        console.log("response.data");
        console.log(response.data);

        setYearlyRecordsData(response.data);
      } catch (error) {
        console.error("Error fetching yearly records:", error);
      }
    };

    fetch();
  }, [year]);

  const livestockData = [
    2400, 1398, 9800, 3908, 4800, 3800, 4300, 5400, 8398, 9800, 4908, 4800,
  ];
  const mortalityData = [
    4000, 3000, 2000, 2780, 1890, 2390, 3490, 1233, 2342, 4564, 3453, 3455,
  ];
  const xLabels = [
    `Jan ${year}`,
    `Feb ${year}`,
    `March ${year}`,
    `April ${year}`,
    `May ${year}`,
    `June ${year}`,
    `July ${year}`,
    `Aug ${year}`,
    `Sept ${year}`,
    `Oct ${year}`,
    `Nov ${year}`,
    `Dec ${year}`,
  ];
  return (
    <PageContainer>
      <Stack
        direction="row"
        justifyContent="space-between"
        boxSizing="border-box"
        mb={1}
      >
        <Stack>
          <Typography variant="h6" fontWeight={600}>
            Yearly Records
          </Typography>
          <Typography variant="body2" mt={-0.5}>
            Overview of records for the entire year.
          </Typography>
        </Stack>

        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel id="demo-simple-select-label">Select Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="Select Year"
            onChange={(e) => setYear(e.target.value)}
          >
            <MenuItem value={yearNow - 3}>{yearNow - 3}</MenuItem>
            <MenuItem value={yearNow - 2}>{yearNow - 2}</MenuItem>
            <MenuItem value={yearNow - 1}>{yearNow - 1}</MenuItem>
            <MenuItem value={yearNow}>{yearNow}</MenuItem>
            <MenuItem value={yearNow + 1}>{yearNow + 1}</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {yearlyRecordsData && (
        <LineChart
          series={[
            {
              data: yearlyRecordsData?.livestockData,
              label: "Livestock",
              curve: "linear",
            },
            {
              data: yearlyRecordsData?.mortalityData,
              label: "Mortality",
              curve: "linear",
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: xLabels,
            },
          ]}
        />
      )}
    </PageContainer>
  );
};

export default Dashboard;
