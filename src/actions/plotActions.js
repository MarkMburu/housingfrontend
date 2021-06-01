import { PlotTypes } from "../constants/plotType";
import * as plotService from "../services/plotService";

export const PlotActions = {
  addPlot: (values) => async (dispatch, getState) => {
    console.log("values in Plot actions", values);
    try {
      const response = await plotService.insertPlot(values);
      console.log("response in Plot actions", response);
      dispatch({
        type: PlotTypes.ADD_PPLOT,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  getPlot: () => async (dispatch, getState) => {
    try {
      const response = await plotService.getPlot();
      console.log("response from getPlots Plot actions", response);
      dispatch({
        type: PlotTypes.GET_PLOTS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },

  updatePlot: (values) => async (dispatch, getState) => {
    try {
      const response = await plotService.updatePlot(values);
      console.log("response after update", response);
      dispatch({
        type: PlotTypes.UPDATE_PLOT,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  deletePlot: (id) => async (dispatch, getState) => {
    try {
      const response = await plotService.deletePlot(id);
      console.log("response after update", response);
      dispatch({
        type: PlotTypes.DELETE_PLOT,
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
