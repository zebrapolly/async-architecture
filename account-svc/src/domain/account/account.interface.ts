import { IProfile } from "../profile";

export interface IAccount {
  readonly id?: number;
  readonly balance?: number;
  readonly profile: IProfile;
}