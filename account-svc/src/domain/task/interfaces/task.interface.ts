import { TASK_STATUS } from "./status.enum";

export interface ITask {
  readonly id: number;
  readonly publicId: string;
  readonly assigneeId?: string;
  readonly status: TASK_STATUS;
  readonly profit: number;
  readonly fee: number;
  readonly createdAt: string;
}