import { combineReducers } from "redux";
import profile from "../reducers/loginreducer";
import memberReducer from "./memberReducer";
import beneficiaryReducer from "./beneficiaryReducer";
import receiptReducer from "./receiptReducer";
import projectReducer from "./projectReducer";
import phaseReducer from "./phaseReducer";
import plotReducer from "./plotReducer";
import plotSalesReducer from "./plotSaleReducer";
import userReducer from "./loginreducer"
import purchaseReducer from "./purchaseReducer";
// Get project reducer
import housingReducer from "./housingReducer";
// Get House per project
import houseReducer from "./houseReducer"
const rootReducer = combineReducers({
  users: userReducer,
  members: memberReducer,
  beneficiary: beneficiaryReducer,
  receipts: receiptReducer,
  projects: projectReducer,
  phase: phaseReducer,
  plots: plotReducer,
  plotSales: plotSalesReducer,
  houses:housingReducer,
  house:houseReducer,
  purchases:purchaseReducer
  
});

export default rootReducer;
