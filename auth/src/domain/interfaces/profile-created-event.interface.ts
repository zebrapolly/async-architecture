import { PROFILE_ROLE } from "./profile-role.enum";

export interface IProfileCreatedEvent {
  readonly role: PROFILE_ROLE;
  readonly publicId: string;
}