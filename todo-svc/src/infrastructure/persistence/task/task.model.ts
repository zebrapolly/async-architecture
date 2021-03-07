import { ITask, TASK_STATUS } from '../../../domain';

export class TaskModel implements ITask {
  readonly id: string;
  readonly title: string;
  readonly assigneeId: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly assignerId: string;
  readonly status: TASK_STATUS;
}