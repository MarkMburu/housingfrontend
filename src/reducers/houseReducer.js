import { HouseTypes } from "../constants/houseType";

const initialState = {
  house: [],
};

const houseReducer = (state = initialState, action) => {
  switch (action.type) {
    case HouseTypes.ADD_HOUSE:
      return { ...state, house: action.payload };
    case HouseTypes.GET_HOUSES:
      console.log("reducer", action.payload);
      return { house: action.payload };
    case HouseTypes.UPDATE_HOUSE:
      return { house: action.payload };
    case HouseTypes.DELETE_HOUSE:
      return { house: action.payload };
    default:
      console.log("reducer");
      return state;
  }
};

export default houseReducer;
