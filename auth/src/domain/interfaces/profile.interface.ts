import { PROFILE_ROLE } from './profile-role.enum';

export interface IProfile {
  id: string;
  email: string;
  role: PROFILE_ROLE
}