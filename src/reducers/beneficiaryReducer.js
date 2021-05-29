import { beneficiaryTypes } from "../constants/beneficiaryType";

const initialState = {
  beneficiary: [],
};

const beneficiaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case beneficiaryTypes.ADD_BENEFICIARY:
      return { ...state, beneficiary: action.payload };
    case beneficiaryTypes.GET_BENEFICIARIES:
      console.log("reducer", action.payload);
      return { beneficiary: action.payload };
    case beneficiaryTypes.UPDATE_BENEFICIARY:
      return { beneficiary: action.payload };
    case beneficiaryTypes.DELETE_BENEFICIARY:
      return { beneficiary: action.payload };
    default:
      console.log("reducer");
      return state;
  }
};

export default beneficiaryReducer;
