import { uri } from "../constants/uri";
import axios from "axios";
import { headers } from "../constants/headers";

export const insertProject = async (values) => {
  try {
    const response = await axios.post(
      `${uri}/project`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from project services", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProjects = async () => {
  try {
    const response = await axios.get(`${uri}/project`, { headers: headers });
    console.log("response from getMemmbers project service", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProject = async (values) => {
  try {
    const response = await axios.patch(
      `${uri}/project`,
      JSON.stringify({ ...values }),
      { headers: headers }
    );
    console.log("response from update project services", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`${uri}/project/${id}`, {
      headers: headers,
    });
    console.log("response from delete Project service", response);
    return getProjects();
  } catch (error) {
    console.log(error);
  }
};
