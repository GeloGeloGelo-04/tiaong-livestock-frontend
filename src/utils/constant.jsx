import cow from "../assets/images/cow.gif";
import goat from "../assets/images/goat.gif";
import chicken from "../assets/images/chicken.gif";
import duck from "../assets/images/duck.gif";
import carabao from "../assets/images/carabao.gif";
import pig from "../assets/images/pig.gif";
import horse from "../assets/images/horse.gif";

import cowM from "../assets/images/cow-mortality.webp";
import goatM from "../assets/images/goat-mortality.webp";
import chickenM from "../assets/images/chicken-mortality.webp";
import duckM from "../assets/images/duck-mortality.webp";
import carabaoM from "../assets/images/carabao-mortality.webp";
import pigM from "../assets/images/pig-mortality.webp";
import horseM from "../assets/images/horse-mortality.webp";

import logo from "../assets/images/logo.jpg";
import { Avatar, Badge, Button, Stack, styled } from "@mui/material";
import dayjs from "dayjs";
import { getGridStringOperators } from "@mui/x-data-grid";

// export const BASE_URL = "https://tiaong-livestock-backend.onrender.com";
export const BASE_URL = "http://localhost:3500";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -0.6,
      left: -0.7,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  },
}));

export const ALERT_SEV = {
  error: "error",
  info: "info",
  success: "success",
  warning: "warning",
};

export const TIAONG_BRGY = [
  "Anastacia",
  "Aquino",
  "Ayusan I",
  "Ayusan II",
  "Behia",
  "Bukal",
  "Bula",
  "Bulakin",
  "Cabatang",
  "Cabay",
  "Del Rosario",
  "Lagalag",
  "Lalig",
  "Lumingon",
  "Lusacan",
  "Paiisa",
  "Palagaran",
  "Quipot",
  "San Agustin",
  "San Isidro",
  "San Jose",
  "San Juan",
  "San Pedro",
  "Tagbakin",
  "Talisay",
  "Tamisian",
  "San Francisco",
];

export const BRGY_COOR = {
  Anastacia: { lat: 13.976384828723074, lng: 121.35681481313391 },
  Aquino: { lat: 13.96955506011133, lng: 121.28702208227605 },
  "Ayusan I": { lat: 13.952798632445772, lng: 121.30557095063045 },
  "Ayusan II": { lat: 13.978067404356956, lng: 121.31842549490686 },
  Behia: { lat: 13.901749656367745, lng: 121.33965336861887 },
  Bukal: { lat: 13.928997060098197, lng: 121.28598975200084 },
  Bula: { lat: 13.928067927649588, lng: 121.31027877659346 },
  Bulakin: { lat: 13.98844196675556, lng: 121.34558544835204 },
  Cabatang: { lat: 13.969810656195092, lng: 121.38212773899167 },
  Cabay: { lat: 13.887207719747833, lng: 121.3680950063104 },
  "Del Rosario": { lat: 13.859174974972047, lng: 121.38581413117943 },
  Lagalag: { lat: 13.94135281244506, lng: 121.37522845839851 },
  Lalig: { lat: 13.975267332892077, lng: 121.3286903573642 },
  Lumingon: { lat: 13.958400023886455, lng: 121.32987366927173 },
  Lusacan: { lat: 13.957300026085951, lng: 121.3448346365917 },
  Paiisa: { lat: 13.925901132091386, lng: 121.3502876152325 },
  Palagaran: { lat: 13.938441845689342, lng: 121.34450427792069 },
  Quipot: { lat: 13.945313268161001, lng: 121.32247235279266 },
  "San Agustin": { lat: 13.93192683405691, lng: 121.33505896118986 },
  "San Isidro": { lat: 13.943779678880102, lng: 121.3335552488652 },
  "San Jose": { lat: 13.922401399742688, lng: 121.33973794217043 },
  "San Juan": { lat: 13.91051909844004, lng: 121.35090053535988 },
  "San Pedro": { lat: 13.968307036247758, lng: 121.30517502816902 },
  Tagbakin: { lat: 13.916414251250188, lng: 121.3620362605209 },
  Talisay: { lat: 13.946212127968186, lng: 121.36102443240365 },
  Tamisian: { lat: 13.950816017291613, lng: 121.28265446400516 },
  "San Francisco": { lat: 13.889667191150568, lng: 121.35066400613859 },
};

export const LIVESTOCK = [
  { name: "Cow", count: 2, img: cow },
  { name: "Goat", count: 3, img: goat },
  { name: "Chicken", count: 45, img: chicken },
  { name: "Duck", count: 34, img: duck },
  { name: "Carabao", count: 12, img: carabao },
  { name: "Pig", count: 18, img: pig },
  { name: "Horse", count: 1, img: horse },
];

export const MORTALITY = [
  { name: "Cow", count: 2, img: cowM },
  { name: "Goat", count: 3, img: goatM },
  { name: "Chicken", count: 45, img: chickenM },
  { name: "Duck", count: 34, img: duckM },
  { name: "Carabao", count: 12, img: carabaoM },
  { name: "Pig", count: 18, img: pigM },
  { name: "Horse", count: 1, img: horseM },
];

export const DATA_GRID_STYLE = {
  "& .MuiDataGrid-row": {
    "&:last-child .MuiDataGrid-cell": {
      borderBottom: "none", // Remove bottom border from last row
    },
  },
  ".MuiDataGrid-columnHeaderTitleContainer": {
    bgcolor: "primary.main",
  },

  ".data-grid-header": {
    bgcolor: "primary.main",
    color: "#FFF",
    ".MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold",
    },
    "&.MuiDataGrid-root": {
      border: "none",
      color: "#FFF",
    },
    ".MuiIconButton-sizeSmall": {
      color: "#FFF",
    },
  },
  border: "none", // Add a border
};

export const FARMERS_TABLE_COLUMN = [
  {
    field: "photo",
    headerName: "Photo",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
    headerAlign: "center",
    filterable: false,

    renderCell: (params) => (
      <Stack justifyContent="center" alignItems="center" height="100%">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            alt="Remy Sharp"
            src={params.row?.userImage}
            sx={{ border: "2px solid #007bff" }}
          />
        </StyledBadge>
      </Stack>
    ),
  },
  {
    field: "fullname",
    headerName: "Name",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
  },

  {
    field: "sex",
    headerName: "Sex",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
  },
  {
    field: "barangay",
    headerName: "Address",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
  },
  {
    field: "contactNo",
    headerName: "Contact No.",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
    filterable: false,
  },
  {
    field: "birthDate",
    headerName: "Birth date",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
    filterable: false,
  },
  {
    field: "civilStatus",
    headerName: "Civil Status",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
    align: "center",
    headerAlign: "center",
    filterable: false,
  },
  {
    field: "PWD",
    headerName: "PWD",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
    align: "center",
    headerAlign: "center",
    filterable: false,
  },
  {
    field: "_4ps",
    headerName: "4P's Beneficiary",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
    align: "center",
    headerAlign: "center",
    filterable: false,
  },
  {
    field: "livelihood",
    headerName: "Main Livelihood",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
  },
  {
    field: "contactPersonToNotifyInCaseEmergency",
    headerName: "Emergency Phone No.",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
    filterable: false,
  },
];

export const APPROVAL_TABLE_COLUMN = [
  {
    field: "photo",
    headerName: "Photo",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
    headerAlign: "center",
    filterable: false,
    renderCell: (params) => (
      <Stack justifyContent="center" alignItems="center" height="100%">
        <Avatar
          alt="Remy Sharp"
          src={params.row?.userImage}
          sx={{ border: "2px solid #007bff" }}
        />
      </Stack>
    ),
  },
  {
    field: "fullname",
    headerName: "Name",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
  },

  {
    field: "sex",
    headerName: "Sex",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
  },
  {
    field: "barangay",
    headerName: "Address",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
  },
  {
    field: "contactNo",
    headerName: "Contact No.",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
    filterable: false,
  },
  {
    field: "birthDate",
    headerName: "Birth date",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
    filterable: false,
  },
  {
    field: "civilStatus",
    headerName: "Civil Status",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
    align: "center",
    headerAlign: "center",
    filterable: false,
  },
  {
    field: "PWD",
    headerName: "PWD",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
    align: "center",
    headerAlign: "center",
    filterable: false,
  },
  {
    field: "_4ps",
    headerName: "4P's Beneficiary",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
    align: "center",
    headerAlign: "center",
    filterable: false,
  },
  {
    field: "livelihood",
    headerName: "Main Livelihood",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
  },
  {
    field: "contactPersonToNotifyInCaseEmergency",
    headerName: "Emergency Phone No.",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
    filterable: false,
  },
];

export const REPORTS_TABLE_COLUMN = [
  {
    field: "fullname",
    headerName: "Name of Farmer",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
    // filterOperators: getGridStringOperators().filter(
    //   (operator) => operator.value === "contains"
    // ),
  },

  {
    field: "barangay",
    headerName: "barangay",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
  },
  {
    field: "longitude",
    headerName: "Longitude",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
    filterable: false,
  },
  {
    field: "latitude",
    headerName: "Latitude",
    width: 100,
    editable: false,
    headerClassName: "data-grid-header",
    filterable: false,
  },
  {
    field: "contactNo",
    headerName: "Contact Details",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
    filterable: false,
  },
  {
    field: "typeofFarm",
    headerName: "Type of Form (CM, SC, SH)",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
    align: "center",
  },
  {
    field: "totalFarmPopulation",
    headerName: "Total Farm Population",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
    align: "center",
    filterable: false,
  },
  {
    field: "rsbsaRegistered",
    headerName: "RSBSA Registered",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
    filterable: false,
  },
  {
    field: "referenceNo",
    headerName: "RSBSA Control No.",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
  },
  {
    field: "bioSecLvl",
    headerName: "Biosecurrity Level(0,1,2)",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
    align: "center",
  },
];
