import { uri } from "../constants/uri";
import axios from "axios";
import { headers } from "../constants/headers";

export const insertPlot = async (values) => {
  try {
    const response = await axios.post(
      `${uri}/plot`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from Plot services", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlot = async () => {
  try {
    const response = await axios.get(`${uri}/plot`, {
      headers: headers,
    });
    console.log("response from getPlot Plot service", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePlot = async (values) => {
  try {
    const response = await axios.patch(
      `${uri}/plot`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from update Plot services", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePlot = async (id) => {
  try {
    const response = await axios.delete(`${uri}/plot/${id}`, {
      headers: headers,
    });
    console.log("response from delete Plot service", response);
    return getPlot();
  } catch (error) {
    console.log(error);
  }
};
