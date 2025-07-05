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

export const getRocketById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rockets/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rocket:", error);
    return null;
  }
};

export const getLaunchpadById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/launchpads/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching launchpad:", error);
    return null;
  }
};


export const getLaunchById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/launches/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching launch:", error);
    return null;
  }
};


export const getPayloadById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payloads/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching launch:", error);
    return null;
  }
};
