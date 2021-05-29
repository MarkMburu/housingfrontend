import { uri } from "../constants/uri";
import axios from "axios";
import { headers } from "../constants/headers";

export const insertFees = async (values) => {
  try {
    const response = await axios.post(
      `${uri}/fees`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from fees services", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEntranceFees = async () => {
  try {
    const response = await axios.get(`${uri}/fees`, {
      headers: headers,
    });
    console.log("response from getfees fees service", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateFees = async (values) => {
  try {
    const response = await axios.patch(
      `${uri}/fees`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from update fees services", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const deleteFees = async (id) => {
  try {
    const response = await axios.delete(`${uri}/fees/${id}`, {
      headers: headers,
    });
    console.log("response from delete fees service", response);
    return getEntranceFees();
  } catch (error) {
    console.log(error);
  }
};

