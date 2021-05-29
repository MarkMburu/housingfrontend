import { uri } from "../constants/uri";
import axios from "axios";
import { headers } from "../constants/headers";

export const insertMember = async (values) => {
  try {
    const response = await axios.post(
      `${uri}/member`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from member services", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMembers = async () => {
  try {
    const response = await axios.get(`${uri}/member`, { headers: headers });
    console.log("response from getMemmbers member service", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateMembers = async (values) => {
  try {
    const response = await axios.patch(
      `${uri}/member`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from update member services", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMembers = async(id)=>{
try {
  const response = await axios.delete(`${uri}/member/${id}`,{headers: headers});
  console.log("response from delete members service",response);
  return getMembers()
} catch (error) {
  console.log(error)
}
}
