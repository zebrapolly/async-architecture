import { TASK_STATUS } from "./status.enum";

export interface ITask {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly assigneeId: string;
  readonly assignerId: string;
  readonly status: TASK_STATUS;
}