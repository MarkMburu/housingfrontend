import { userTypes } from "../constants/userType";
import * as LoginUser from "../services/loginService";

export const ActionCreators = {
  login: (values) => async (dispatch, getState) => {
    console.log("values", values);
    try {
      const response = await LoginUser.Login(values);
      console.log("response.......", response);
      dispatch({
        type: userTypes.LOGIN,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ON_ERROR",
        payload: error,
      });
    }
  },
};
