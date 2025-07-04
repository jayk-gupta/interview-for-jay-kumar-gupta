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

/*
The queryLaunches function builds a dynamic query based on the status filter (upcoming, failed, successful) and date range.
The date_utc field is filtered using $gte (greater than or equal) and $lte (less than or equal) for the date range.
The options object sorts results by date_utc in descending order and limits to 100 launches for performance.
*/ 
// export const queryLaunches = async (statusFilter, dateRange) => {
//   try {
//     const query = {};
//     if (statusFilter === "upcoming") {
//       query.upcoming = true;
//     } else if (statusFilter === "failed") {
//       query.upcoming = false;
//       query.success = false;
//     } else if (statusFilter === "successful") {
//       query.upcoming = false;
//       query.success = true;
//     }

//     if (dateRange) {
//       query.date_utc = {
//         $gte: dateRange.startDate.toISOString(),
//         $lte: dateRange.endDate.toISOString(),
//       };
//     }

//     const response = await axios.post(`${API_BASE_URL}/launches/query`, {
//       query,
//       options: { sort: { date_utc: "desc" }, limit: 100 },
//     });
//     return response.data.docs;
//   } catch (error) {
//     console.error("Error querying launches:", error);
//     return [];
//   }
// };


