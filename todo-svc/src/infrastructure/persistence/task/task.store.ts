import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from 'class-transformer';
import { Repository } from "typeorm";
import { ICreateTask, ITask, TASK_STATUS } from "../../../domain";
import { TaskEntity } from './task.entity'; 

@Injectable()
export class TaskStore {

  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>
  ) {}

  getTasks(params: Partial<ITask>) {
    return this.repository.find(params);
  }

  getTaskById(publicId: string) {
    const task = this.repository.findOne({publicId});
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async updateTaskById(publicId: string, payload: Partial<ITask>) {
    await this.repository.update({ publicId }, { ...payload});
    const task = await this.repository.findOne({ publicId })
    return task;
  }

  createTask(payload: ICreateTask) {
    const task = this.repository.save(payload);
    return plainToClass(TaskEntity ,task);
  }
}
