import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
// import audio from './audio';

export default combineReducers({ alert, auth });
