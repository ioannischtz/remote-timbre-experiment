import { setAlert } from './alert';
import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SESSION_LOADED,
  AUTH_ERROR
} from './types';

// Load session
export const loadSession = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await api.get('/auth');
    // console.log('res.data', res.data);
    dispatch({
      type: SESSION_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Load session
// export const randomizeStim = () => async (dispatch) => {
//   try {
//     const res = await api.post('/sessions/randomize_stims');
//     // console.log('res.data', res.data);
//     dispatch({
//       type: SESSION_LOADED,
//       payload: res.data
//     });
//   } catch (error) {
//     dispatch({
//       type: AUTH_ERROR
//     });
//   }
// };

// Login session

export const login = (session_id) => async (dispatch) => {
  const body = { session_id };

  try {
    const res = await api.post('/auth', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadSession());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(`${error.msg}`, 'error')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
