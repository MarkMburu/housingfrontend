import { uri } from "../constants/uri";
import axios from "axios";
import { headers } from "../constants/headers";

export const insertPlotSale = async (values) => {
  try {
    const response = await axios.post(
      `${uri}/plotsale`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from PlotSale services", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlotSale = async () => {
  try {
    const response = await axios.get(`${uri}/plotsale`, {
      headers: headers,
    });
    console.log("response from getPlotSale PlotSale service", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePlotSale = async (values) => {
  try {
    const response = await axios.patch(
      `${uri}/plotsale`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from update PlotSale services", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePlotSale = async (id) => {
  try {
    const response = await axios.delete(`${uri}/plotsale/${id}`, {
      headers: headers,
    });
    console.log("response from delete PlotSale service", response);
    return getPlotSale();
  } catch (error) {
    console.log(error);
  }
};
