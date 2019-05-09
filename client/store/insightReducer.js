import axios from 'axios';
import {
  getLargestTransaction,
  simplifyTransactions,
  getCategorySpend,
  largestByMerchant,
} from '../components/dashboard/utils';

const GET_LARGEST = 'GET_LARGEST';
const GET_RESTAURANT = 'GET_RESTAURANT';
const GET_MERCHANT = 'GET_MERCHANT';
const GET_TRANSPO = 'GET_TRANSPO';
const GET_FEES = 'GET_FEES';

export const getLargest = props => ({
  type: GET_LARGEST,
  props,
});
export const getRestaurantSpend = props => ({
  type: GET_RESTAURANT,
  props,
});

export const getTranspoSpend = props => ({
  type: GET_TRANSPO,
  props,
});

export const getMerchantSpend = props => ({
  type: GET_MERCHANT,
  props,
});

export const getFees = props => ({
  type: GET_FEES,
  props,
});

const initialState = {
  largest: {},
  merchantSpend: {},
  restaurantSpend: '',
  transpoSpend: '',
  fees: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LARGEST:
      let largest = getLargestTransaction(action.props);
      return { ...state, largest: largest };
    case GET_RESTAURANT:
      let simplified = simplifyTransactions(action.props);
      let rest = getCategorySpend(simplified, 'Food and Drink');
      return { ...state, restaurantSpend: rest };
    case GET_FEES:
      let simplified3 = simplifyTransactions(action.props);
      let fees = getCategorySpend(simplified3, 'Fees');
      return { ...state, fees: fees };
    case GET_MERCHANT:
      let merchant = largestByMerchant(action.props);
      return { ...state, merchantSpend: merchant };
    case GET_TRANSPO:
      let simplified2 = simplifyTransactions(action.props);
      let transpo = getCategorySpend(simplified2, 'Travel');
      return { ...state, transpoSpend: transpo };
    default:
      return state;
  }
}
