import { Transform } from 'class-transformer'
import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn } from 'typeorm';
import { ITask, TASK_STATUS } from '../../../domain';

@Entity('task')
export class TaskEntity implements ITask {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Generated('uuid')
  @Column('uuid')
  readonly publicId: string;

  @Column()
  readonly title: string;

  @Column({ nullable: true })
  readonly assigneeId: string;

  @Column()
  readonly description: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  @Transform(({value}: {value: Date}) => value.toISOString(), {toPlainOnly: true})
  readonly createdAt: string;

  @Column({ nullable: true })
  readonly assignerId: string;

  @Column({ default: TASK_STATUS.NEW })
  readonly status: TASK_STATUS;
}