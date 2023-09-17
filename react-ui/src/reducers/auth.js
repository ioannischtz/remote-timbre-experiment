import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SESSION_LOADED,
  AUTH_ERROR,
  LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  session: null
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SESSION_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        session: payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: true
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.clear();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
