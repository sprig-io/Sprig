import axios from 'axios';
const initialState = {
  budget: {},
};
const ADD_BUDGET = 'ADD_BUDGET';

const addBudget = budgetData => {
  return {
    type: ADD_BUDGET,
    budgetData,
  };
};
export const addingBudget = budgetData => async dispatch => {
  try {
    console.log('in the thunk');
    const { data } = await axios.post('/api/budget', budgetData);
    console.log('the data', data);
    dispatch(addBudget(data));
  } catch (error) {
    console.error(error);
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BUDGET:
      return {
        ...state,
        budget: action.budgetData,
      };
    default:
      return state;
  }
}
