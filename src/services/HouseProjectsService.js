import { uri } from "../constants/uri";
import axios from "axios";
import { headers } from "../constants/headers";

export const insertHouseProject = async (values) => {
  try {
    const response = await axios.post(
      `${uri}/housing`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from housing services", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getHouseProjects = async () => {
  try {
    const response = await axios.get(`${uri}/housing`, { headers: headers });
    console.log("response from getMemmbers housing service", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateHouseProject = async (values) => {
  try {
    const response = await axios.patch(
      `${uri}/housing`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from update housing services", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteHouseProject = async (id) => {
  try {
    const response = await axios.delete(`${uri}/housing/${id}`, {
      headers: headers,
    });
    console.log("response from delete housing service", response);
    return getHouseProjects();
  } catch (error) {
    console.log(error);
  }
};
