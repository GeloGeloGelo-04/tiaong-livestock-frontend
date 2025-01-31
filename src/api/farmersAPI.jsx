import axios from "./axios";

export const fetchFarmersData = async () => {
  try {
    const response = await axios.get("/farmers");

    const row = response.data || [];

    return row;
  } catch (error) {
    console.log(error);
  }
};
export const fetchFarmersArchivedData = async () => {
  try {
    const response = await axios.get("/farmers/archive");

    const row = response.data || [];

    return row;
  } catch (error) {
    console.log(error);
  }
};
