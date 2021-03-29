import { Action } from "redux";

export interface IAuthState {

}

export interface IAuthAction extends Action {
  authParams: any;
}

export interface ILoginAction extends Action {
  payload: {
    email: string,
    password: string
  }
}