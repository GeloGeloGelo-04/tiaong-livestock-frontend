import dayjs from "dayjs";
import axios from "./axios";

export const fetchAnnouncementData = async () => {
  try {
    const response = await axios.get("/announcement");

    const row = response.data || [];

    return row;
  } catch (error) {
    console.log(error);
  }
};
