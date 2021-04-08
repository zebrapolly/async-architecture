import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@Entity('audit')
export class AuditEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('uuid')
  readonly profileId: string;

  @Column()
  readonly debit: number;

  @Column()
  readonly credit: number;

  @Column()
  readonly reason: string;

  @Column({ nullable: true })
  readonly comment: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  readonly createdAt: Date;
}