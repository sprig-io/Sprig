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
  console.log('in the thunk');
  const { data } = await axios.post('/api/plaid/accounts/add', plaidData);
  console.log('the data', data);
  dispatch(addAccount(data));
};

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNT:
      return [...state, action.accountData];
    default:
      return state;
  }
}
