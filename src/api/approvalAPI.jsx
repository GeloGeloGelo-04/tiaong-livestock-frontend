import dayjs from "dayjs";
import axios from "./axios";

export const fetchApprovalData = async () => {
  try {
    const response = await axios.get("/approval");

    const row = response.data || [];

    return row;
  } catch (error) {
    console.log(error);
  }
};
export const fetchRejectedData = async () => {
  try {
    const response = await axios.get("/approval/reject");

    const row = response.data || [];

    return row;
  } catch (error) {
    console.log(error);
  }
};
