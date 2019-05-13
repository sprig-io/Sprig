import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './userReducer';
import accountReducer from './accountReducer';
import insightReducer from './insightReducer';
import budgetReducer from './budgetReducer';
const reducer = combineReducers({
  userReducer,
  accountReducer,
  insightReducer,
  budgetReducer,
  errorReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
