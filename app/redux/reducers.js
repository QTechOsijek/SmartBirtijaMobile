import { ADD_CATALOG, ADD_ITEM, CLEAR_UP } from './types';
import _ from 'lodash'
import { combineReducers } from 'redux';

const catalog = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATALOG:
      return {
        ...action.payload,
      }
    default:
      return state;
  }
};

const cart = (state = {}, action) => {
  console.log(state)
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        [action.item]: (state[action.item] || 0) + action.quantity,
      }
    case CLEAR_UP:
      return {}
    default:
      return state;
  }
};

const root = combineReducers({catalog: catalog, cart: cart});
export default root;
