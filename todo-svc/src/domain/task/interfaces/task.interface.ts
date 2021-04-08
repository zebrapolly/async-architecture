import { TASK_STATUS } from "./status.enum";

export interface ITask {
  readonly id: number;
  readonly publicId: string;
  readonly title: string;
  readonly description: string;
  readonly createdAt: string;
  readonly assigneeId: string;
  readonly assignerId: string;
  readonly status: TASK_STATUS;
}