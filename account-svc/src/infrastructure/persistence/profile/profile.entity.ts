import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAccount, IProfile, PROFILE_ROLE } from '../../../domain';
import { AccountEntity } from '../account/account.entity';


@Entity('profile')
export class ProfileEntity implements IProfile {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('uuid')
  readonly publicId: string;

  @Column()
  readonly role: PROFILE_ROLE;

  @OneToOne(() => AccountEntity, account => account.profile)
  readonly account: IAccount
}