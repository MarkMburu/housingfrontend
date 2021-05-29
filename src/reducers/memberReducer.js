import { MemberTypes } from "../constants/memberType";

const initialState = {
  members: [],
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case MemberTypes.ADD_MEMBER:
      return { ...state, members: action.payload };
    case MemberTypes.GET_MEMBERS:
      console.log("reducer", action.payload);
      return { members: action.payload };
    case MemberTypes.UPDATE_MEMBER:
      return { members: action.payload };
    case MemberTypes.DELETE_MEMBER:
      return { members: action.payload };
    default:
      console.log("reducer");
      return state;
  }
};

export default memberReducer;
