import { uri } from "../constants/uri";
import axios from "axios";
import { headers } from "../constants/headers";

export const insertBeneficiary = async (values) => {
  try {
    const response = await axios.post(
      `${uri}/beneficiary`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from Beneficiary services", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBeneficiaries = async () => {
  try {
    const response = await axios.get(`${uri}/beneficiary`, {
      headers: headers,
    });
    console.log("response from getBeneficiary Beneficiary service", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBeneficiary = async (values) => {
  try {
    const response = await axios.patch(
      `${uri}/beneficiary`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from update Beneficiary services", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBeneficiary = async (id) => {
  try {
    const response = await axios.delete(`${uri}/beneficiary/${id}`, {
      headers: headers,
    });
    console.log("response from delete Beneficiary service", response);
    return getBeneficiaries();
  } catch (error) {
    console.log(error);
  }
};

