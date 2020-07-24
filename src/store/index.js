import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import postReducer from './Post/reducer';
import authReducer from './Auth/reducer';
const rootReducer = combineReducers({
  post: postReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
