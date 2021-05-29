import { userTypes } from "../constants/userType";

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.LOGIN:
      return { users: action.payload };
    default:
      console.log("reducer");
      return state;
  }
};

export default userReducer;