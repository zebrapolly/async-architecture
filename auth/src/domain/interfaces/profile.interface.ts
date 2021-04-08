import { PROFILE_ROLE } from './profile-role.enum';

export interface IProfile {
  id: number;
  publicId: string;
  email: string;
  role: PROFILE_ROLE
}