import { PurchaseTypes } from "../constants/purchaseTypes";

const initialState = {
  purchases: [],
};

const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case PurchaseTypes.ADD_PURCHASE:
      return { ...state, purchases: action.payload };
    case PurchaseTypes.GET_PURCHASES:
      console.log("reducer", action.payload);
      return { purchases: action.payload };
    case PurchaseTypes.UPDATE_PURCHASE:
      return { purchases: action.payload };
    case PurchaseTypes.DELETE_PURCHASE:
      return { purchases: action.payload };
    default:
      console.log("reducer");
      return state;
  }
};

export default purchaseReducer;
