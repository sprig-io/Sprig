import axios from 'axios';
import { getLargestTransaction } from './utils';

const GET_LARGEST = 'GET_LARGEST';

export const getLargest = props => ({
  type: GET_LARGEST,
  props,
});

const initialState = {
  largest: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LARGEST:
      let largest = getLargestTransaction(action.props);
      return { ...state, largest: largest };
    default:
      return state;
  }
}
