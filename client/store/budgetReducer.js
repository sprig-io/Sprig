import axios from 'axios';
const initialState = {
  budget: 0,
  spendingLimit: 0,
};
const ADD_BUDGET = 'ADD_BUDGET';
const GET_BUDGET = 'GET_BUDGET';

const addBudget = (budgetData, monthlyIncome) => {
  return {
    type: ADD_BUDGET,
    budgetData,
    monthlyIncome,
  };
};

const getBudget = (budget, monthlyIncome) => {
  return {
    type: GET_BUDGET,
    budget,
    monthlyIncome,
  };
};
export const addingBudget = (budgetData, monthlyIncome) => async dispatch => {
  try {
    const { data } = await axios.post('/api/budget', budgetData);
    dispatch(addBudget(data, monthlyIncome));
  } catch (error) {
    console.error(error);
  }
};
export const gettingBudget = (userId, monthlyIncome) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/budget/${userId}`);
    dispatch(getBudget(data.monthlyGoal, monthlyIncome));
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
        spendingLimit:
          Math.round(
            (Number(action.monthlyIncome) - Number(action.budgetData)) * 100
          ) / 100,
      };
    case GET_BUDGET:
      return {
        ...state,
        budget: action.budget,
        spendingLimit:
          Math.round(
            (Number(action.monthlyIncome) - Number(action.budget)) * 100
          ) / 100,
      };

    default:
      return state;
  }
}
