import { uri } from "../constants/uri";
import axios from "axios";
import { headers } from "../constants/headers";

export async function Login(user) {
  try {
    const response = await axios.post(
      `${uri}/login`,
      JSON.stringify({ ...user }),
      { headers: headers }
    );
    console.log(response.data);
    if (response.data.auth === true) {
      console.log(response.data);
      return response.data;
    } else {
       return response.data
    }
  } catch (error) {
    console.error(error);
  }
}
