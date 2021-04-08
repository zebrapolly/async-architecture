import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskStore } from "./task.store";
import { TaskEntity } from './task.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([TaskEntity]) ],
  exports: [ TaskStore ],
  providers: [ TaskStore ]
})
export class TaskPersistenceModule {}