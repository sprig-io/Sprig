import axios from 'axios';
//initial state
const initialState = {
  accounts: [],
  transactions: [],
  balance: [],
};

//ACTION TYPES
const ADD_ACCOUNT = 'ADD_ACCOUNT';
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
const GET_ACCOUNTS = 'GET_ACCOUNTS';
const GET_BALANCE = 'GET_BALANCE';

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

const getBalance = plaidAccountData => {
  return {
    type: GET_BALANCE,
    plaidAccountData,
  };
};

//Thunk

export const gettingAccounts = () => async dispatch => {
  const { data } = await axios.get('/accounts/transactions/monthly');
  dispatch(getAccounts(data));
};
export const addingAccount = plaidAccountData => async dispatch => {
  const { data } = await axios.post(
    '/api/plaid/accounts/add',
    plaidAccountData
  );
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
  dispatch(getTransactions(data));
};

export const gettingBalance = plaidAccountData => async dispatch => {
  const { data } = await axios.post(
    '/api/plaid/accounts/balance',
    plaidAccountData
  );
  console.log('BALANCE DATA', data);
  dispatch(getBalance(data));
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
    case GET_BALANCE:
      return { ...state, balance: [...action.plaidAccountData] };
    default:
      return state;
  }
}
