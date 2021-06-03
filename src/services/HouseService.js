import { uri } from "../constants/uri";
import axios from "axios";
import { headers } from "../constants/headers";

export const insertHouse = async (values) => {
  try {
    const response = await axios.post(
      `${uri}/house`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from House services", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getHouses = async () => {
  try {
    const response = await axios.get(`${uri}/house`, {
      headers: headers,
    });
    console.log("response from getHouse House service", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateHouse = async (values) => {
  try {
    const response = await axios.patch(
      `${uri}/house`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from update House services", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteHouse = async (id) => {
  try {
    const response = await axios.delete(`${uri}/house/${id}`, {
      headers: headers,
    });
    console.log("response from delete House service", response);
    return getHouses();
  } catch (error) {
    console.log(error);
  }
};
