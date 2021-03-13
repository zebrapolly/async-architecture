import { Module } from "@nestjs/common";
import { TaskStore } from "./task.store";

@Module({
  exports: [ TaskStore ],
  providers: [ TaskStore ]
})
export class TaskPersistenceModule {}