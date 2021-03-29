import { ITasksState, TaskAction } from "./types";

export const initialState: ITasksState = {
  list: [],
  isLoading: false,
  error: null,
}

export function task(state = initialState, action: TaskAction) {
  switch (action.type) {
    case 'GET_TASKS':
      return {...state, isLoading: true}
      case 'GET_TASKS_SUCCESS':
      return {...state, isLoading: false, list: action.payload}
      case 'GET_TASKS_ERROR':
      return {...state, isLoading: false, error: action.payload}
    default:
      return state
  }
}