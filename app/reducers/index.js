import { combineReducers, } from 'redux';

import invite from './invite'

export const reducers = {
    invite,
}

const rootReducer = combineReducers(reducers)

export default rootReducer;
