import { PhaseTypes } from "../constants/phaseType";

const initialState = {
  phase: [],
};

const phaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case PhaseTypes.ADD_PHASE:
      return { ...state, phase: action.payload };
    case PhaseTypes.GET_PHASE:
      console.log("reducer", action.payload);
      return { phase: action.payload };
    case PhaseTypes.UPDATE_PHASE:
      return { phase: action.payload };
    case PhaseTypes.DELETE_PHASE:
      return { phase: action.payload };
    default:
      console.log("reducer");
      return state;
  }
};

export default phaseReducer
