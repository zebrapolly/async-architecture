import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IProfile, PROFILE_ROLE } from '../../../domain';


@Entity('profile')
export class ProfileEntity implements IProfile {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('uuid')
  readonly publicId: string;

  @Column()
  readonly role: PROFILE_ROLE;
}