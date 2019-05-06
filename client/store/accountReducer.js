import axios from 'axios';
//ACTION TYPES
const ADD_ACCOUNT = 'ADD_ACCOUNT';

//ACTION CREATOR

const addAccount = accountData => {
  return {
    type: ADD_ACCOUNT,
    accountData,
  };
};

export const addingAccount = plaidData => async dispatch => {
  const accounts = plaidData.accounts;
  const { data } = await axios.post('/api/plaid/accounts/add', plaidData);
  console.log('the data', data);
  dispatch(addAccount(data));
};

const initialState = {
  accounts: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [action.accountData, ...state.accounts],
      };
    default:
      return state;
  }
}
