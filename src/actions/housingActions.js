import { HouseProjectsTypes } from "../constants/HouseProjectsTypes";
import * as HouseProjectsService from "../services/HouseProjectsService";

export const HousingActions = {
  addHouseProject: (values) => async (dispatch, getState) => {
    console.log("values in HouseProjects actions", values);
    try {
      const response = await HouseProjectsService.insertHouseProject(values);
      console.log("response in HouseProjects actions", response);
      dispatch({
        type: HouseProjectsTypes.ADD_HOUSEPROJECT,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  getHouseProjects: () => async (dispatch, getState) => {
    try {
      const response = await HouseProjectsService.getHouseProjects();
      console.log("response from getHouseProjectss HouseProjects actions", response);
      dispatch({
        type: HouseProjectsTypes.GET_HOUSEPROJECTS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },

  updateHouseProject: (values) => async (dispatch, getState) => {
    try {
      const response = await HouseProjectsService.updateHouseProject(values);
      console.log("response after update", response);
      dispatch({
        type: HouseProjectsTypes.UPDATE_HOUSEPROJECT,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  deleteHouseProject: (id) => async (dispatch, getState) => {
    try {
      const response = await HouseProjectsService.deleteHouseProject(id);
      console.log("response after update", response);
      dispatch({
        type: HouseProjectsTypes.DELETE_HOUSEPROJECT,
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
