import { IAuthState, IAuthAction } from "./types";

let user = JSON.parse(localStorage.getItem('user') || '{}');

export const initialState: IAuthState = {
  loggedIn: false,
  loggingIn: false,
  authParams: null,
  error: null,
}

export function auth(state = initialState, action: IAuthAction) {
  console.log('aurh reduser', action)
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {loggingIn: true, authParams: action.authParams}
      case 'LOGIN_SUCCESS':
      return {loggedIn: true, loggingIn: false, authParams: action.authParams};
      case 'LOGIN_FAILURE':
      return {}
    default:
      return state
  }
}