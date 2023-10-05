import { createStore, combineReducers } from 'redux';
import itemReducer from './itemReducer';

const rootReducer = combineReducers({
  itemsUse: itemReducer,
});

const store = createStore(rootReducer);

export default store;
