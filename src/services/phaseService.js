import { uri } from "../constants/uri";
import axios from "axios";
import { headers } from "../constants/headers";

export const insertPhase = async (values) => {
  try {
    const response = await axios.post(
      `${uri}/phase`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from Phase services", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPhase = async () => {
  try {
    const response = await axios.get(`${uri}/phase`, {
      headers: headers,
    });
    console.log("response from getPhase Phase service", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePhase = async (values) => {
  try {
    const response = await axios.patch(
      `${uri}/phase`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from update Phase services", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePhase = async (id) => {
  try {
    const response = await axios.delete(`${uri}/phase/${id}`, {
      headers: headers,
    });
    console.log("response from delete Phase service", response);
    return getPhase();
  } catch (error) {
    console.log(error);
  }
};
