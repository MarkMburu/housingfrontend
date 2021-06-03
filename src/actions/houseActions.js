import { HouseTypes } from "../constants/houseType";
import * as HouseService from "../services/HouseService";

export const HouseActions = {
  addHouse: (values) => async (dispatch, getState) => {
    console.log("values in House actions", values);
    try {
      const response = await HouseService.insertHouse(values);
      console.log("response in House actions", response);
      dispatch({
        type: HouseTypes.ADD_HOUSE,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  getHouse: () => async (dispatch, getState) => {
    try {
      const response = await HouseService.getHouses();
      console.log(
        "response from getHouses House actions",
        response
      );
      dispatch({
        type: HouseTypes.GET_HOUSES,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },

  updateHouse: (values) => async (dispatch, getState) => {
    try {
      const response = await HouseService.updateHouse(values);
      console.log("response after update", response);
      dispatch({
        type: HouseTypes.UPDATE_HOUSE,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  deleteHouse: (id) => async (dispatch, getState) => {
    try {
      const response = await HouseService.deleteHouse(id);
      console.log("response after update", response);
      dispatch({
        type: HouseTypes.DELETE_HOUSE,
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
