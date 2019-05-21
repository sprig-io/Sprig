import axios from "axios";
//initial state
const initialState = {
  accounts: [],
  transactions: [],
  balance: [],
  income: [],
  monthlyIncome: 1
};

import { simplifyMonthly, getIncomeTotal } from "./utils";
//ACTION TYPES
const ADD_ACCOUNT = "ADD_ACCOUNT";
const GET_TRANSACTIONS = "GET_TRANSACTIONS";
const DELETE_ACCOUNT = "DELETE_ACCOUNT";
const GET_ACCOUNTS = "GET_ACCOUNTS";
const GET_BALANCE = "GET_BALANCE";
const GET_INCOME = "GET_INCOME";
//ACTION CREATOR

const addAccount = plaidAccountData => {
  return {
    type: ADD_ACCOUNT,
    plaidAccountData
  };
};

const getIncome = income => {
  return {
    type: GET_INCOME,
    income
  };
};

const getAccounts = plaidAccountData => {
  return { type: GET_ACCOUNTS, plaidAccountData };
};

const deleteAccount = accountId => {
  return {
    type: DELETE_ACCOUNT,
    accountId
  };
};

const getTransactions = plaidAccountData => {
  return {
    type: GET_TRANSACTIONS,
    plaidAccountData
  };
};

const getBalance = plaidAccountData => {
  return {
    type: GET_BALANCE,
    plaidAccountData
  };
};

//Thunk

export const gettingAccounts = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/plaid/accounts");
    dispatch(getAccounts(data));
  } catch (error) {
    console.error(error);
  }
};

export const addingAccount = plaidAccountData => async dispatch => {
  try {
    const { data } = await axios.post(
      "/api/plaid/accounts/add",
      plaidAccountData
    );
    dispatch(addAccount(data));
  } catch (error) {
    console.error(error);
  }
};

export const deletingAccount = accountId => async dispatch => {
  try {
    await axios.delete(`/api/plaid/accounts/${accountId}`);
    dispatch(deleteAccount(accountId));
  } catch (error) {
    console.error(error);
  }
};

export const gettingTransactions = plaidAccountData => async dispatch => {
  try {
    const { data } = await axios.post(
      "/api/plaid/accounts/transactions/monthly",
      plaidAccountData
    );

    dispatch(getTransactions(data));
  } catch (error) {
    console.error(error);
  }
};

export const gettingBalance = plaidAccountData => async dispatch => {
  try {
    const { data } = await axios.post(
      "/api/plaid/accounts/balance",
      plaidAccountData
    );
    dispatch(getBalance(data));
  } catch (error) {
    console.error(error);
  }
};
export const gettingIncome = plaidAccountData => async dispatch => {
  try {
    const { data } = await axios.post("/api/plaid/income", plaidAccountData);
    dispatch(getIncome(data));
  } catch (error) {
    console.error(error);
  }
};

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [action.plaidAccountData, ...state.accounts]
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: [
          ...state.accounts.filter(
            account => account.accountId !== action.accountId
          )
        ]
      };
    case GET_TRANSACTIONS:
      let simplified = simplifyMonthly([...action.plaidAccountData]);
      return { ...state, transactions: simplified };
    case GET_ACCOUNTS:
      return { ...state, accounts: [...action.plaidAccountData] };
    case GET_BALANCE:
      return { ...state, balance: [...action.plaidAccountData] };
    case GET_INCOME:
      const monthlyIncome = getIncomeTotal([...action.income]);
      return { ...state, income: [...action.income], monthlyIncome };
    default:
      return state;
  }
}
