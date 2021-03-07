import { Action } from "redux";


export interface ITasksState {
  list: ITask[],
  isLoading: boolean,
  error: any,
}

export interface TaskAction extends Action {
  payload: any;
  // error: Error;
}

export enum TASK_STATUS {
  NEW = 'NEW',
  DONE = 'DONE'
}

export interface ITask {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly assigneeId: string;
  readonly assignerId: string;
  readonly status: TASK_STATUS;
}

export interface ICreateTaskAction extends Action {
  payload: ITask
}

export interface ICompleteTaskAction extends Action {
  payload: string
}