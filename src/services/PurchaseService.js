import { uri } from "../constants/uri";
import axios from "axios";
import { headers } from "../constants/headers";

export const insertPurchase = async (values) => {
  try {
    const response = await axios.post(
      `${uri}/Purchase`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from Purchase services", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPurchases = async () => {
  try {
    const response = await axios.get(`${uri}/Purchase`, { headers: headers });
    console.log("response from getMemmbers Purchase service", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePurchase = async (values) => {
  try {
    const response = await axios.patch(
      `${uri}/Purchase`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from update Purchase services", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePurchase = async (id) => {
  try {
    const response = await axios.delete(`${uri}/Purchase/${id}`, {
      headers: headers,
    });
    console.log("response from delete Purchase service", response);
    return getPurchases();
  } catch (error) {
    console.log(error);
  }
};
