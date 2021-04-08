import { PROFILE_ROLE } from "./profile-role.enum";

export interface ICreateProfileEvent {
  readonly publicId: string;
  readonly role: PROFILE_ROLE;
}