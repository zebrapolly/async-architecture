import { PROFILE_ROLE } from "./profile-role.enum";

export interface ICreateProfile {
  readonly email: string;
  readonly password: string;
  readonly role: PROFILE_ROLE;
}