import { uri } from "../constants/uri";
import axios from "axios";
import { headers } from "../constants/headers";

export const insertReceipt = async (values) => {
  try {
    const response = await axios.post(
      `${uri}/receipt`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from Receipt services", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getReceipts = async () => {
  try {
    const response = await axios.get(`${uri}/receipt`, {
      headers: headers,
    });
    console.log("response from getReceipt Receipt service", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateReceipt = async (values) => {
  try {
    const response = await axios.patch(
      `${uri}/receipt`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from update Receipt services", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReceipt = async (id) => {
  try {
    const response = await axios.delete(`${uri}/receipt/${id}`, {
      headers: headers,
    });
    console.log("response from delete Receipt service", response);
    return getReceipts();
  } catch (error) {
    console.log(error);
  }
};
