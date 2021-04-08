import { Injectable } from "@nestjs/common";
import { classToPlain } from 'class-transformer';
import { ICreateTask, ITask, TASK_STATUS } from "../../domain";
import { TaskStore,EventBusService } from "../../infrastructure";

@Injectable()
export class TaskService {
  constructor(
    private readonly taskStore: TaskStore,
    private readonly eventBusService: EventBusService
  ) {

  }
  getTasks() {
    return this.taskStore.getTasks({});
  }

  async createTask(payload: ICreateTask) {
    const task = await this.taskStore.createTask(payload);
    console.log('task', task)
    await this.eventBusService.sendTaskCreated(task);
    return task;
  }

  getTaskById(id:string) {
    return this.taskStore.getTaskById(id)
  }

  async completeTask(id: string) {
    const task = await this.taskStore.updateTaskById(id, { status: TASK_STATUS.DONE });
    await this.eventBusService.sendTaskCompleted({taskId: task.publicId});
  }

  undoneTask(id: string) {
    return this.taskStore.updateTaskById(id, { status: TASK_STATUS.NEW });
  }
}