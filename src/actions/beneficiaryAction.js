import { beneficiaryTypes } from "../constants/beneficiaryType";
import * as BeneficiaryService from "../services/BeneficiaryService";

export const BeneficiaryActions = {
  addBeneficiary: (values) => async (dispatch, getState) => {
    console.log("values in Beneficiary actions", values);
    try {
      const response = await BeneficiaryService.insertBeneficiary(values);
      console.log("response in Beneficiary actions", response);
      dispatch({
        type: beneficiaryTypes.ADD_BENEFICIARY,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  getBeneficiaries: () => async (dispatch, getState) => {
    try {
      const response = await BeneficiaryService.getBeneficiaries();
      console.log(
        "response from getBeneficiarys Beneficiary actions",
        response
      );
      dispatch({
        type: beneficiaryTypes.GET_BENEFICIARIES,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },

  updateBeneficiary: (values) => async (dispatch, getState) => {
    try {
      const response = await BeneficiaryService.updateBeneficiary(values);
      console.log("response after update", response);
      dispatch({
        type: beneficiaryTypes.UPDATE_BENEFICIARY,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "error",
      });
    }
  },
  deleteBeneficiary: (id) => async (dispatch, getState) => {
    try {
      const response = await BeneficiaryService.deleteBeneficiary(id);
      console.log("response after update", response);
      dispatch({
        type: beneficiaryTypes.DELETE_BENEFICIARY,
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
