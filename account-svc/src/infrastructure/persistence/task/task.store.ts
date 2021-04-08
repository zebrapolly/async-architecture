import { Injectable } from "@nestjs/common";
import { ITask } from "../../../domain";
import { TaskEntity } from './task.entity'; 
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager } from "typeorm";

@Injectable()
export class TaskStore {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>
  ) {}
  
  create(payload: ITask) {
    return this.repository.save(payload);
  }

  findById(id: string, manager: EntityManager) {
    return manager.getRepository(TaskEntity)
    .createQueryBuilder("task")
    .useTransaction(true)
    .where('"publicId" =:id', { id })
    .getOne()
  }

  update(id: number, payload: Partial<ITask>, manager: EntityManager) {
    return manager.getRepository(TaskEntity)
      .update({ id}, { ...payload });
  }

}