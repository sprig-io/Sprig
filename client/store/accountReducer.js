import axios from 'axios';
//initial state
const initialState = {
  accounts: [],
  transactions: [],
};

//ACTION TYPES
const ADD_ACCOUNT = 'ADD_ACCOUNT';
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
const GET_ACCOUNTS = 'GET_ACCOUNTS';

//ACTION CREATOR

const addAccount = plaidAccountData => {
  return {
    type: ADD_ACCOUNT,
    plaidAccountData,
  };
};

const getAccounts = plaidAccountData => {
  return { type: GET_ACCOUNTS, plaidAccountData };
};

const deleteAccount = accountId => {
  return {
    type: DELETE_ACCOUNT,
    accountId,
  };
};

const getTransactions = plaidAccountData => {
  return {
    type: GET_TRANSACTIONS,
    plaidAccountData,
  };
};

//Thunk

export const gettingAccounts = () => async dispatch => {
  console.log('in the thunk');
  const { data } = await axios.get('/api/plaid/accounts');
  console.log('the accounts', data);
  dispatch(getAccounts(data));
};
export const addingAccount = plaidAccountData => async dispatch => {
  const accounts = plaidAccountData.accounts;
  console.log('PLAID ACCOUNT DATA', plaidAccountData);
  const { data } = await axios.post(
    '/api/plaid/accounts/add',
    plaidAccountData
  );
  console.log('the data', data);
  dispatch(addAccount(data));
};

export const deletingAccount = accountId => async dispatch => {
  await axios.delete(`/api/plaid/accounts/${accountId}`);
  dispatch(deleteAccount(accountId));
};

export const gettingTransactions = plaidAccountData => async dispatch => {
  // const accountTransactions = plaidAccountData.accounts;
  const { data } = await axios.post(
    '/api/plaid/accounts/transactions',
    plaidAccountData
  );
  console.log('the data', data);
  dispatch(getTransactions(data));
};

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [action.plaidAccountData, ...state.accounts],
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: [
          ...state.accounts.filter(
            account => account.accountId !== action.accountId
          ),
        ],
      };
    case GET_TRANSACTIONS:
      return { ...state, transactions: [...action.plaidAccountData] };
    case GET_ACCOUNTS:
      return { ...state, accounts: [...action.plaidAccountData] };
    default:
      return state;
  }
}
