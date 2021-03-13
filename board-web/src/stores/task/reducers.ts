import { ITasksState, TaskAction } from "./types";

export const initialState: ITasksState = {
  list: [],
  isLoading: false,
  error: null,
}

export function task(state = initialState, action: TaskAction) {
  switch (action.type) {
    case 'GET_TASKS':
      // return state.concat([action.text])
      return {...state, isLoading: true}
      case 'GET_TASKS_SUCCESS':
      // return state.concat([action.text])
      return {...state, isLoading: false, list: action.payload}
      case 'GET_TASKS_ERROR':
      return {...state, isLoading: false, error: action.payload} // action: {type: string, payload: any}
    default:
      return state
  }
}