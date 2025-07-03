import axios from "axios";

const API_BASE_URL = "https://api.spacexdata.com/v4";

export const getAllLaunches = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/launches`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching launches:", error);
  }
};

export const getLaunchById = async (id:string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/launches/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching launch:", error);
    return null;
  }
};
