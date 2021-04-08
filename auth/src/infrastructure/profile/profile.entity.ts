import { Column, Entity, Generated, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IProfile, PROFILE_ROLE } from "../../domain";

import { Transform } from 'class-transformer';

@Entity('profile')
@Unique(['email'])
export class ProfileEntity implements IProfile {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Generated('uuid')
  @Column()
  readonly publicId: string

  @Column()
  readonly email: string;

  @Column()
  @Transform(({value}) => PROFILE_ROLE[value], { toPlainOnly: true })
  readonly role: PROFILE_ROLE;

  @Column()
  readonly password: string;
}