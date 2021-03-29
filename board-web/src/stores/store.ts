import { createStore, combineReducers, applyMiddleware } from 'redux'
import { task } from './task/reducers';
import { auth } from './auth/reducers'; 
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import taskSaga from './task/sagas';
import { ITasksState } from './task';
import authSaga from './auth/sagas';

interface IStore {
  tasks: ITasksState
}

const sagaMiddleware = createSagaMiddleware<IStore>()

const rootReducer = combineReducers({
  tasks: task,
  auth
})

export const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(taskSaga);
sagaMiddleware.run(authSaga);