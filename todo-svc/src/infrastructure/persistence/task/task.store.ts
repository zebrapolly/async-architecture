import { Injectable, NotFoundException } from "@nestjs/common";
import { ICreateTask, ITask, TASK_STATUS } from "../../../domain";
import { TaskModel } from './task.model'; 
import { v4 } from 'uuid';

@Injectable()
export class TaskStore {
  private store: TaskModel [] = [
    {
      assigneeId: '',
      assignerId: '',
      createdAt: new Date(),
      description: 'test description1',
      id: '6812b7d1-b8bf-45ee-84f4-c276932e7847',
      status: TASK_STATUS.NEW,
      title: 'task title 2'
    },
    {
      assigneeId: '',
      assignerId: '',
      createdAt: new Date(),
      description: 'test description2',
      id: '6a9421b0-cdd6-4d35-8747-91696f1d0a5a',
      status: TASK_STATUS.DONE,
      title: 'task title 1'
    }
  ];

  getTasks(params: Partial<ITask>) {
    return this.store;
  }

  getTaskById(id: string) {
    const task = this.store.find(t => t.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  updateTaskById(id: string, payload: Partial<ITask>) {
    let task = this.store.find(t => t.id ===id);
    task = Object.assign(task, payload);
    return task;
  }

  createTask(payload: ICreateTask) {
    const task: ITask = {
      ...payload,
      createdAt: new Date(),
      id: v4(),
      status: TASK_STATUS.NEW
    }
    this.store.push(task);

    return task;
  }
}