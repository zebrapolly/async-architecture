import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure";
import { TaskService } from "./task.service";

@Module({
  imports: [ InfrastructureModule ],
  exports: [ TaskService ],
  providers: [ TaskService ]
})
export class TaskModule {}