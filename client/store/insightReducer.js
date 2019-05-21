/* eslint-disable no-case-declarations */
import axios from "axios";
import {
  getLargestTransaction,
  getCategorySpend,
  largestByMerchant,
  totalMonthly,
  finalLineGraphData
} from "../components/dashboard/utils";
import { simplifyMonthly } from "./utils";

const GET_LARGEST = "GET_LARGEST";
const GET_RESTAURANT = "GET_RESTAURANT";
const GET_MERCHANT = "GET_MERCHANT";
const GET_TRANSPO = "GET_TRANSPO";
const GET_FEES = "GET_FEES";
const GET_THREE_MONTHS = "GET_THREE_MONTHS ";
const GET_THREE_MONTHS_CATEGORY = "GET_THREE_MONTHS_CATEGORY ";

export const getLargest = props => ({
  type: GET_LARGEST,
  props
});
export const getRestaurantSpend = props => ({
  type: GET_RESTAURANT,
  props
});

export const getTranspoSpend = props => ({
  type: GET_TRANSPO,
  props
});

export const getMerchantSpend = props => ({
  type: GET_MERCHANT,
  props
});

export const getFees = props => ({
  type: GET_FEES,
  props
});

export const getThreeMonths = threeMonthsData => ({
  type: GET_THREE_MONTHS,
  threeMonthsData
});

export const getThreeMonthsCategory = threeMonthsData => ({
  type: GET_THREE_MONTHS_CATEGORY,
  threeMonthsData
});

const initialState = {
  largest: {},
  merchantSpend: {},
  restaurantSpend: "",
  transpoSpend: "",
  fees: 0,
  threeMonthsData: {},
  threeMonthsCategory: {}
};

export const getThreeMonthsData = plaidAccountData => async dispatch => {
  try {
    const { data } = await axios.post(
      "api/plaid/accounts/transactions/monthly",
      plaidAccountData
    );
    dispatch(getThreeMonths(data));
  } catch (error) {
    console.error(error);
  }
};

export const getThreeMonthsDataCategory = plaidAccountData => async dispatch => {
  try {
    const { data } = await axios.post(
      "api/plaid/accounts/transactions/monthly",
      plaidAccountData
    );

    dispatch(getThreeMonthsCategory(data));
  } catch (error) {
    console.error(error);
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LARGEST:
      let largest = getLargestTransaction(action.props);
      return { ...state, largest: largest };
    case GET_RESTAURANT:
      let rest = getCategorySpend(action.props, "Food and Drink");
      return { ...state, restaurantSpend: rest };
    case GET_FEES:
      let fees = getCategorySpend(action.props, "Fees");
      return { ...state, fees: fees };
    case GET_MERCHANT:
      let merchant = largestByMerchant(action.props);
      return { ...state, merchantSpend: merchant };
    case GET_TRANSPO:
      let transpo = getCategorySpend(action.props, "Travel");
      return { ...state, transpoSpend: transpo };
    case GET_THREE_MONTHS:
      let threeMonthsData = totalMonthly(action.threeMonthsData);
      return { ...state, threeMonthsData: threeMonthsData };
    case GET_THREE_MONTHS_CATEGORY:
      let threeMonthsCategory = finalLineGraphData(
        simplifyMonthly(action.threeMonthsData)
      );

      return { ...state, threeMonthsCategory: threeMonthsCategory };
    default:
      return state;
  }
}
