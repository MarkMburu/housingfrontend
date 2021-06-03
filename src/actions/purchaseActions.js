import { PurchaseTypes } from "../constants/purchaseTypes";
import * as PurchaseService from "../services/PurchaseService";

export const PurchaseActions = {
  addPurchase: (values) => async (dispatch, getState) => {
    console.log("values in Purchase actions", values);
    try {
      const response = await PurchaseService.insertPurchase(values);
      console.log("response in Purchase actions", response);
      dispatch({
        type: PurchaseTypes.ADD_PURCHASE,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  getPurchases: () => async (dispatch, getState) => {
    try {
      const response = await PurchaseService.getPurchases();
      console.log("response from getPurchases Purchase actions", response);
      dispatch({
        type: PurchaseTypes.GET_PURCHASES,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },

  updatePurchase: (values) => async (dispatch, getState) => {
    try {
      const response = await PurchaseService.updatePurchase(values);
      console.log("response after update", response);
      dispatch({
        type: PurchaseTypes.UPDATE_PURCHASE,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  deletePurchase: (id) => async (dispatch, getState) => {
    try {
      const response = await PurchaseService.deletePurchase(id);
      console.log("response after update", response);
      dispatch({
        type: PurchaseTypes.DELETE_PURCHASE,
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
