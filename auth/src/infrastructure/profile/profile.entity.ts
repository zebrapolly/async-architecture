import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IProfile, PROFILE_ROLE } from "../../domain";

@Entity('profile')
@Unique(['email'])
export class ProfileEntity implements IProfile {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  readonly email: string;

  @Column()
  readonly role: PROFILE_ROLE;

  @Column()
  readonly password: string;
}