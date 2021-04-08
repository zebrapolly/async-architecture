import { IAccount } from "../../account";
import { PROFILE_ROLE } from "./profile-role.enum";

export interface IProfile {
  readonly publicId: string;
  readonly role: PROFILE_ROLE;
  readonly account: IAccount
}