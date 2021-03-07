import { Injectable } from "@nestjs/common";
import { ICreateTask, TASK_STATUS } from "../../domain";
import { TaskStore } from "../../infrastructure";

@Injectable()
export class TaskService {
  constructor(
    private readonly taskStore: TaskStore
  ) {

  }
  getTasks() {
    return this.taskStore.getTasks({});
  }

  createTask(payload: ICreateTask) {
    return this.taskStore.createTask(payload);
  }

  getTaskById(id:string) {
    return this.taskStore.getTaskById(id)
  }

  completeTask(id: string, ) {
    return this.taskStore.updateTaskById(id, { status: TASK_STATUS.DONE });
  }

  undoneTask(id: string) {
    return this.taskStore.updateTaskById(id, { status: TASK_STATUS.NEW });
  }
}