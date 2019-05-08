import axios from 'axios';
import { simplifyMonthly } from './utils';
const GET_MONTHLY = 'GET_MONTHLY';

const gotMonthly = plaidAccountData => ({
  type: GET_MONTHLY,
  plaidAccountData,
});

const initialState = {
  monthly: [],
};

export const gettingMonthlyTransactions = plaidAccountData => async dispatch => {
  // const accountTransactions = plaidAccountData.accounts;
  const { data } = await axios.post(
    '/api/plaid/accounts/transactions/monthly',
    plaidAccountData
  );
  console.log('the data monthly', data);
  dispatch(gotMonthly(data));
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MONTHLY:
      let simplified = simplifyMonthly([...action.plaidAccountData]);
      return { ...state, monthly: simplified };
    default:
      return state;
  }
}
