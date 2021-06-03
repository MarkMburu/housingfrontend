import { HouseProjectsTypes } from "../constants/HouseProjectsTypes";

const initialState = {
  houses: [],
};

const housingReducer = (state = initialState, action) => {
  switch (action.type) {
    case HouseProjectsTypes.ADD_HOUSEPROJECT:
      return { ...state, houses: action.payload };
    case HouseProjectsTypes.GET_HOUSEPROJECTS:
      console.log("reducer", action.payload);
      return { houses: action.payload };
    case HouseProjectsTypes.UPDATE_HOUSEPROJECT:
      return { houses: action.payload };
    case HouseProjectsTypes.DELETE_HOUSEPROJECT:
      return { houses: action.payload };
    default:
      console.log("reducer");
      return state;
  }
};

export default housingReducer;
