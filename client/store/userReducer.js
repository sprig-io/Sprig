import axios from 'axios';
const jwtDecode = require('jwt-decode');

//Authorizing user:
const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};
//initialState
const initialState = {
  user: {},
  isLoggedIn: false,
};

//ACTION TYPES
const CREATE_USER = 'CREATE_USER'; // for user registration
const GET_CURRENT_USER = 'GET_CURRENT_USER'; // for getting current user from login
//ACTION CRETORS
const createUser = user => ({
  type: CREATE_USER,
  user,
});

const fetchUser = user => ({
  type: GET_CURRENT_USER,
  user,
});

//Thunk - for user registration
export const createdUser = (user, history) => async dispatch => {
  try {
    const { data } = await axios.post('/api/users/register', user);
    dispatch(createUser(data));
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};
//Thunk - for user login
export const loggedInUser = user => async dispatch => {
  try {
    console.log(user, 'USER');
    const res = await axios.post('/api/users/login', user);
    console.log(res, 'RES');
    const token = res.data.token;
    localStorage.setItem('token', token);
    setAuthToken(token);
    const data = jwtDecode(token);
    dispatch(fetchUser(data));
  } catch (err) {
    console.error(err);
  }
};

//reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, user: action.user, isLoggedIn: true };
    case GET_CURRENT_USER:
      return { ...state, user: action.user, isLoggedIn: true };
    default:
      return state;
  }
}
