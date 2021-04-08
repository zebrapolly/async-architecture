import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAccount, IProfile } from '../../../domain';
import { ProfileEntity } from '../profile/profile.entity';


@Entity('account')
export class AccountEntity implements IAccount {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('int', { default: 0 })
  readonly balance: number;

  @OneToOne(() => ProfileEntity, profile => profile.account, { cascade: true })
  @JoinColumn()
  readonly profile: IProfile;
}