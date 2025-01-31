import React, { useEffect, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DATA_GRID_STYLE, REPORTS_TABLE_COLUMN } from "../../utils/constant";
import { TableToolbar } from "../../components/form/table/TableToolbar";
import { Box, Button, Stack } from "@mui/material";
import TableFilterBtn from "../../components/form/table/TableFilterBtn";
import TableQuickFilter from "../../components/form/table/TableQuickFilter";
import useData from "../../hooks/useData";
import { PrintOutlined } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/images/favicon.svg";
import header1 from "../../assets/images/header1.jpg";
import header2 from "../../assets/images/header2.jpg";

const CustomToolbar = () => {
  const { contentRef } = useData();
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <TableToolbar
      titleText="Farmer's Report"
      subText="Insights into farmers' data and activities"
      actionBtn={
        <>
          <Button
            variant="outlined"
            startIcon={<PrintOutlined />}
            onClick={reactToPrintFn}
            sx={{
              padding: "5.5px 20px",
              border: "1px solid #007bff",
            }}
          >
            Print
          </Button>
          <TableFilterBtn />
          <TableQuickFilter />
        </>
      }
    />
  );
};

const FarmersReports = () => {
  // const contentRef = useRef(null);
  // const reactToPrintFn = useReactToPrint({ contentRef });
  const { farmersData, farmersDataLoading, contentRef } = useData();
  const [filterModel, setFilterModel] = useState({
    items: [],
    quickFilterValues: [],
  });
  const [filteredRows, setFilteredRows] = useState(farmersData); // assuming farmersData is fetched from API or state

  const handleFilterChange = (newFilterModel) => {
    setFilterModel(newFilterModel);
  };
  useEffect(() => {
    const filterableFields = [
      "fullname",
      "barangay",
      "longitude",
      "latitude",
      "contactNo",
      "typeofFarm",
      "totalFarmPopulation",
      "rsbsaRegistered",
      "referenceNo",
      "bioSecLvl",
    ];

    if (
      filterModel.items?.length > 0 ||
      filterModel.quickFilterValues?.length > 0
    ) {
      const filteredData = farmersData.filter((row) => {
        // Advanced filter logic (only for filterable fields)
        const advancedFiltersMatch = filterModel.items?.every((filter) => {
          if (!filter.value) return true;
          if (!filterableFields.includes(filter.field)) return true; // Skip non-filterable fields

          const rowValue = row[filter.field]?.toString().toLowerCase() || "";
          return rowValue.includes(filter.value.toLowerCase());
        });

        // Quick filter logic (only for filterable fields)
        const quickFilterMatch = filterModel.quickFilterValues?.every(
          (searchValue) => {
            const lowerCasedSearch = searchValue.toLowerCase();

            // Recursive function to search through object fields
            function searchObject(obj) {
              for (let key in obj) {
                if (filterableFields.includes(key)) {
                  if (typeof obj[key] === "object" && obj[key] !== null) {
                    if (searchObject(obj[key])) {
                      return true;
                    }
                  } else if (
                    String(obj[key]).toLowerCase().includes(lowerCasedSearch)
                  ) {
                    return true;
                  }
                }
              }
              return false;
            }

            return searchObject(row);
          }
        );

        return advancedFiltersMatch && quickFilterMatch;
      });

      setFilteredRows(filteredData);
    } else {
      setFilteredRows(farmersData);
    }
  }, [filterModel, farmersData]);

  return (
    <>
      <DataGrid
        componen
        loading={farmersDataLoading}
        rows={farmersData}
        columns={REPORTS_TABLE_COLUMN}
        initialState={{
          filter: {
            filterModel: { items: [] },
          },
          pagination: {
            paginationModel: {
              pageSize: 100,
              page: 0,
            },
          },
        }}
        pageSizeOptions={[10, 50, 100]}
        disableRowSelectionOnClick
        onFilterModelChange={handleFilterChange}
        sx={DATA_GRID_STYLE}
        disableColumnResize
        slots={{
          toolbar: CustomToolbar,
        }}
      />

      <div style={{ display: "none" }}>
        <div
          ref={contentRef}
          style={{
            width: "100%",
            height: "100vh",
            borderRadius: "5px",
            backgroundColor: "#fff",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <img
            src={header1}
            style={{
              width: "100%",
              zIndex: -1,
            }}
          />
          <table
            width="100%"
            style={{
              borderCollapse: "collapse",
              textAlign: "left",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5", color: "#333" }}>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Name of Farmer
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Barangay
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Longitude
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Latitude
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Contact Details
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Type of Farm (CM, SC, SH)
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Total Farm Population
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  RSBSA Registered
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  RSBSA Control No.
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Biosecurity Level (0,1,2)
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRows?.map((obj, key) => (
                <tr key={key}>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {obj?.fullname}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    Maria {obj?.barangay}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {obj?.longitude}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {obj?.latitude}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {obj?.contactNo}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {obj?.typeofFarm}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {obj?.totalFarmPopulation}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {obj?.rsbsaRegistered}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {obj?.referenceNo}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {obj?.bioSecLvl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              zIndex: 1,
              width: "100%",
              fontFamily: "serif",
              display: "flex",
              justifyContent: "center",
              paddingBottom: "64px",
            }}
          >
            <p style={{ maxWidth: 600 }}>
              2nd Flr., Tiaong Municipal Hall, Don V. Robles St., Brgy.
              Poblacion III, Tiaong, Quezon Email: TiaongQuezon.PIO@gmail.com |
              Facebook: Tiaong Public Information Office
            </p>
          </div>

          <img
            src={header2}
            style={{
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default FarmersReports;
