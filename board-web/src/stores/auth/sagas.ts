import axios, { AxiosResponse } from "axios";
import { call, put, takeEvery } from 'redux-saga/effects'
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST } from "./actions";
import { ILoginAction } from "./types";

function* login(action: ILoginAction) {
  try {
    console.log('action', action)
     const res: AxiosResponse = yield axios.post('/auth/login', action.payload);
     console.log('res', res);
     localStorage.setItem('user', JSON.stringify(res.data));
     yield put({type: LOGIN_SUCCESS, payload: res.data});
  } catch (e) {
    console.log(e)
     yield put({type: LOGIN_FAILURE, message: e.message});
  }
}

function* logout() {
  try {
    localStorage.removeItem('user');
 } catch (e) {
 }
}

function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, login);
  yield takeEvery(LOGOUT_REQUEST, logout);
}

export default authSaga;