import { IsEmail, IsEnum, IsString } from "class-validator";
import { ICreateProfile, PROFILE_ROLE } from "../../../domain";

export class CreateProfileDto implements ICreateProfile{
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsEnum(PROFILE_ROLE)
  readonly role: PROFILE_ROLE
}