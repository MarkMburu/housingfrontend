import { ProjectTypes } from "../constants/projectTypes";

const initialState = {
  projects: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProjectTypes.ADD_PROJECT:
      return { ...state, projects: action.payload };
    case ProjectTypes.GET_PROJECTS:
      console.log("reducer", action.payload);
      return { projects: action.payload };
    case ProjectTypes.UPDATE_PROJECT:
      return { projects: action.payload };
    case ProjectTypes.DELETE_PROJECT:
      return { projects: action.payload };
    default:
      console.log("reducer");
      return state;
  }
};

export default projectReducer;
