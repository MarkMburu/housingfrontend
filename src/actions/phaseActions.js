import { PhaseTypes } from "../constants/phaseType";
import * as phaseService from "../services/phaseService";

export const PhaseActions = {
  addPhase: (values) => async (dispatch, getState) => {
    console.log("values in Phase actions", values);
    try {
      const response = await phaseService.insertPhase(values);
      console.log("response in Phase actions", response);
      dispatch({
        type: PhaseTypes.ADD_PHASE,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  getPhase: () => async (dispatch, getState) => {
    try {
      const response = await phaseService.getPhase();
      console.log(
        "response from getPhases Phase actions",
        response
      );
      dispatch({
        type: PhaseTypes.GET_PHASE,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },

  updatePhase: (values) => async (dispatch, getState) => {
    try {
      const response = await phaseService.updatePhase(values);
      console.log("response after update", response);
      dispatch({
        type: PhaseTypes.UPDATE_PHASE,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  deletePhase: (id) => async (dispatch, getState) => {
    try {
      const response = await phaseService.deletePhase(id);
      console.log("response after update", response);
      dispatch({
        type: PhaseTypes.DELETE_PHASE,
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
