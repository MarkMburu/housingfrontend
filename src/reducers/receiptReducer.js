import { receiptTypes } from "../constants/receiptTypes";

const initialState = {
  receipts: [],
};

const receiptReducer = (state = initialState, action) => {
  switch (action.type) {
    case receiptTypes.ADD_RECEIPT:
      return {receipts: action.payload };
    case receiptTypes.GET_RECEIPTS:
      console.log("reducer", action.payload);
      return { receipts: action.payload };
    case receiptTypes.UPDATE_RECEIPT:
      return { receipts: action.payload };
    case receiptTypes.DELETE_RECEIPT:
      return { receipts: action.payload };
    default:
      console.log("reducer");
      return state;
  }
};

export default receiptReducer;
