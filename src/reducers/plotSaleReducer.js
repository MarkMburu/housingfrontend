import { PlotSaleTypes } from "../constants/plotSaleType";

const initialState = {
  plotSales: [],
};

const plotSalesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PlotSaleTypes.ADD_PLOTSALEGET_PLOTSALE:
      return { ...state, plotSales: action.payload };
    case PlotSaleTypes.GET_PLOTSALE:
      console.log("reducer", action.payload);
      return { plotSales: action.payload };
    case PlotSaleTypes.UPDATE_PLOTSALEGET_PLOTSALE:
      return { plotSales: action.payload };
    case PlotSaleTypes.DELETE_PLOTSALEGET_PLOTSALE:
      return { plotSales: action.payload };
    default:
      console.log("reducer");
      return state;
  }
};

export default plotSalesReducer;
