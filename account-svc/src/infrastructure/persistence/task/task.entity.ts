import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ITask, TASK_STATUS } from '../../../domain';


@Entity('task')
export class TaskEntity implements ITask {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'uuid', unique: true })
  readonly publicId: string;

  @Column({ nullable: true })
  readonly assigneeId: string;

  @Column({ type: 'timestamp with time zone' })
  readonly createdAt: string;

  @Column('varchar')
  readonly status: TASK_STATUS;

  @Column({ type: 'int' })
  readonly profit: number;

  @Column({ type: 'int' })
  readonly fee: number;
}