import { ProjectTypes } from "../constants/projectTypes";
import * as projectService from "../services/ProjectService";

export const ProjectsActions = {
  addProject: (values) => async (dispatch, getState) => {
    console.log("values in Project actions", values);
    try {
      const response = await projectService.insertProject(values);
      console.log("response in Project actions", response);
      dispatch({
        type: ProjectTypes.ADD_PROJECT,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  getProjects: () => async (dispatch, getState) => {
    try {
      const response = await projectService.getProjects();
      console.log("response from getProjects Project actions", response);
      dispatch({
        type: ProjectTypes.GET_PROJECTS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },

  updateProject: (values) => async (dispatch, getState) => {
    try {
      const response = await projectService.updateProject(values);
      console.log("response after update", response);
      dispatch({
        type: ProjectTypes.UPDATE_PROJECT,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  deleteProject: (id) => async (dispatch, getState) => {
    try {
      const response = await projectService.deleteProject(id);
      console.log("response after update", response);
      dispatch({
        type: ProjectTypes.DELETE_PROJECT,
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
