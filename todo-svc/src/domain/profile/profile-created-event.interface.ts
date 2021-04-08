import { PROFILE_ROLE } from "./profile-role.enum";

export interface IProfileCreatedEvent {
  readonly publicId: string;
  readonly role: PROFILE_ROLE;
}