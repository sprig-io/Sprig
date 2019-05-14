import axios from 'axios';
const initialState = {
  budget: {},
};
const ADD_BUDGET = 'ADD_BUDGET';
const GET_BUDGET = 'GET_BUDGET';

const addBudget = budgetData => {
  return {
    type: ADD_BUDGET,
    budgetData,
    monthlyIncome,
  };
};

const getBudget = budget => {
  return {
    type: GET_BUDGET,
    budget,
  };
};
export const addingBudget = budgetData => async dispatch => {
  try {
    const { data } = await axios.post('/api/budget', budgetData);
    dispatch(addBudget(data, monthlyIncome));
  } catch (error) {
    console.error(error);
  }
};
export const gettingBudget = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/budget/${userId}`);
    console.log(data, 'budgetttt');
    dispatch(getBudget(data));
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
        m,
      };
    case GET_BUDGET:
      return {
        ...state,
        budget: action.budget,
      };

    default:
      return state;
  }
}
