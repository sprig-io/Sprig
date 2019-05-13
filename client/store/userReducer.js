import axios from 'axios';
const jwtDecode = require('jwt-decode');
import setAuthToken from '../utils/setAuthToken';

//initialState
const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {},
};

const isEmpty = require('is-empty');
//ACTION TYPES
const CREATE_USER = 'CREATE_USER'; // for user registration
const GET_CURRENT_USER = 'GET_CURRENT_USER'; // for getting current user from login
export const GET_ERRORS = 'GET_ERRORS';

//ACTION CRETORS
export const createUser = user => ({
  type: CREATE_USER,
  user,
});

export const fetchUser = user => ({
  type: GET_CURRENT_USER,
  user,
});

export const getErrors = err => ({
  type: GET_ERRORS,
  err,
});

//Thunk - for user registration
export const createdUser = user => async dispatch => {
  try {
    const { data } = await axios.post('/api/users/register', user);
    dispatch(createUser(data));
    dispatch(getErrors('No errors'));
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};
//Thunk - for user login
export const loggedInUser = user => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', user);

    const token = res.data.token;
    localStorage.setItem('jwt', token);
    setAuthToken(token);
    const data = jwtDecode(token);
    dispatch(fetchUser(data));
  } catch (err) {
    console.error(err);
  }
};

export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwt');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(fetchUser({}));
};

//reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: action.user,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: !isEmpty(action.user),
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.err,
      };
    default:
      return state;
  }
}
