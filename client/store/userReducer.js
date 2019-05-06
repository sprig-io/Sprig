import axios from 'axios';
const jwtDecode = require('jwt-decode');
import setAuthToken from '../utils/setAuthToken';

//initialState
const initialState = {
  isAuthenticated: false,
  user: {},
  isLoggedIn: false,
};

const isEmpty = require('is-empty');
//ACTION TYPES
const CREATE_USER = 'CREATE_USER'; // for user registration
const GET_CURRENT_USER = 'GET_CURRENT_USER'; // for getting current user from login
export const GET_ERRORS = 'GET_ERRORS';

//ACTION CRETORS
const createUser = user => ({
  type: CREATE_USER,
  user,
});

const fetchUser = user => ({
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
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};
//Thunk - for user login
export const loggedInUser = user => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', user);
    console.log(res, 'RES');
    const token = res.data.token;
    localStorage.setItem('token', token);
    setAuthToken(token);
    const data = jwtDecode(token);
    console.log(data);
    dispatch(fetchUser(data));
  } catch (err) {
    console.error(err);
  }
};

//reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        isAuthenticated: !isEmpty(action.payload),
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        isAuthenticated: !isEmpty(action.payload),
      };
    default:
      return state;
  }
}
