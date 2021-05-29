import { PlotSaleTypes } from "../constants/plotSaleType";
import * as plotSaleService from "../services/plotSaleService";

export const PlotSaleActions = {
  addPlotSale: (values) => async (dispatch, getState) => {
    console.log("values in plotSale actions", values);
    try {
      const response = await plotSaleService.insertPlotSale(values);
      console.log("response in plotSale actions", response);
      dispatch({
        type: PlotSaleTypes.ADD_PLOTSALE,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  getPlotSale: () => async (dispatch, getState) => {
    try {
      const response = await plotSaleService.getPlotSale();
      console.log(
        "response from getplotSales plotSale actions",
        response
      );
      dispatch({
        type: PlotSaleTypes.GET_PLOTSALE,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },

  updatePlotSale: (values) => async (dispatch, getState) => {
    try {
      const response = await plotSaleService.updatePlotSale(values);
      console.log("response after update", response);
      dispatch({
        type: PlotSaleTypes.UPDATE_PLOTSALE,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  deletePlotSale: (id) => async (dispatch, getState) => {
    try {
      const response = await plotSaleService.deletePlotSale(id);
      console.log("response after update", response);
      dispatch({
        type: PlotSaleTypes.DELETE_PLOTSALE,
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
