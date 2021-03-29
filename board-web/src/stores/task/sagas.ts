import { call, put, takeEvery } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios';
import { COMPLETE_TASK, COMPLETE_TASK_ERROR, COMPLETE_TASK_SUCCESS, CREATE_TASK, CREATE_TASK_ERROR, CREATE_TASK_SUCCESS, GET_TASKS, GET_TASKS_ERROR, GET_TASKS_SUCCESS } from './actions';
import { ICreateTaskAction, ICompleteTaskAction } from './types';



function* fetchTasks() {
   try {
      const res: AxiosResponse = yield axios.get('/todo/task');
      yield put({type: GET_TASKS_SUCCESS, payload: res.data});
   } catch (e) {
      yield put({type: GET_TASKS_ERROR, message: e.message});
   }
}

function* createTask(action: ICreateTaskAction) {
   try {
      const res: AxiosResponse = yield axios.post('/todo/task', action.payload );
      yield put({type: CREATE_TASK_SUCCESS, payload: res.data});
      yield put({type: GET_TASKS});
   } catch (e) {
      yield put({type: CREATE_TASK_ERROR, message: e.message});
   }
}

function* completeTask(action: ICompleteTaskAction) {
   try {
      const res: AxiosResponse = yield axios.put(`/todo/task/complete/${action.payload}`);
      yield put({type: COMPLETE_TASK_SUCCESS, payload: res.data});
      yield call(fetchTasks);
   } catch (e) {
      yield put({type: COMPLETE_TASK_ERROR, message: e.message});
   }
}

function* taskSaga() {
  yield takeEvery(GET_TASKS, fetchTasks);
  yield takeEvery(CREATE_TASK, createTask);
  yield takeEvery(COMPLETE_TASK, completeTask);
}

export default taskSaga;