import { PlotTypes } from "../constants/plotType";

const initialState = {
  plots: [],
};

const plotReducer = (state = initialState, action) => {
  switch (action.type) {
    case PlotTypes.ADD_PLOT:
      return { ...state, plots: action.payload };
    case PlotTypes.GET_PLOT:
      console.log("reducer", action.payload);
      return { plots: action.payload };
    case PlotTypes.UPDATE_PLOT:
      return { plots: action.payload };
    case PlotTypes.DELETE_PLOT:
      return { plots: action.payload };
    default:
      console.log("reducer");
      return state;
  }
};

export default plotReducer;
