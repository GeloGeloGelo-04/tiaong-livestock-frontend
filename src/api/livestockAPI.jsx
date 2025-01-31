import dayjs from "dayjs";
import axios from "./axios";

export const fetchLivestockData = async () => {
  try {
    const response = await axios.get("/livestock");
    console.log("response.data");
    console.log(response.data);

    const row = response.data || [];

    return row;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTotalLivestock = async () => {
  try {
    const response = await axios.get("/livestock/total");
    console.log("response.data");
    console.log(response.data);

    const row = response.data || [];

    return row;
  } catch (error) {
    console.log(error);
  }
};

export const fetchYearlyRecordData = async () => {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const response = await axios.post("/livestock/yearly-records", { year });
    console.log("response.data");
    console.log(response.data);

    const row = response.data || [];

    return row;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBarangayRecordData = async () => {
  try {
    const response = await axios.get("/livestock/barangay-records");
    console.log("response.data");
    console.log(response.data);

    const row = response.data || [];

    return row;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFarmersRecordData = async () => {
  try {
    const response = await axios.get("/livestock/farmers-per-brgy");
    console.log("response.data");
    console.log(response.data);

    const row = response.data || [];

    return row;
  } catch (error) {
    console.log(error);
  }
};
