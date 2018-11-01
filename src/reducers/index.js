import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import activePage from './activePage';

export default combineReducers({
    errors: errorReducer,
    page: activePage
});