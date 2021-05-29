import { MemberTypes } from "../constants/memberType";
import * as memberService from "../services/memberService";

export const MemberActions = {
  addMember: (values) => async (dispatch, getState) => {
    console.log("values in member actions", values);
    try {
      const response = await memberService.insertMember(values);
      console.log("response in member actions", response);
      dispatch({
        type: MemberTypes.ADD_MEMBER,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  getMembers: () => async (dispatch, getState) => {
    try {
      const response = await memberService.getMembers();
      console.log("response from getmembers member actions", response);
      dispatch({
        type: MemberTypes.GET_MEMBERS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },

  updateMember: (values) => async (dispatch, getState) => {
    try {
      const response = await memberService.updateMembers(values);
      console.log("response after update", response);
      dispatch({
        type: MemberTypes.UPDATE_MEMBER,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  deleteMember: (id) => async (dispatch, getState) => {
    try {
      const response = await memberService.deleteMembers(id);
      console.log("response after update", response);
      dispatch({
        type: MemberTypes.DELETE_MEMBER,
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
