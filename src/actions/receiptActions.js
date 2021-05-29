import { receiptTypes } from "../constants/receiptTypes";
import * as receiptService from "../services/ReceiptService";

export const receiptActions = {
  addReceipt: (values) => async (dispatch, getState) => {
    console.log("values in Receipt actions", values);
    try {
      const response = await receiptService.insertReceipt(values);
      console.log("response in Receipt actions", response);
      dispatch({
        type: receiptTypes.ADD_RECEIPT,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  getReceipts: () => async (dispatch, getState) => {
    try {
      const response = await receiptService.getReceipts();
      console.log("response from getReceipts Receipt actions", response);
      dispatch({
        type: receiptTypes.GET_RECEIPTS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },

  updateReceipt: (values) => async (dispatch, getState) => {
    try {
      const response = await receiptService.updateReceipt(values);
      console.log("response after update", response);
      dispatch({
        type: receiptTypes.UPDATE_RECEIPT,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  deleteReceipt: (id) => async (dispatch, getState) => {
    try {
      const response = await receiptService.deleteReceipt(id);
      console.log("response after update", response);
      dispatch({
        type: receiptTypes.DELETE_RECEIPT,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
};
