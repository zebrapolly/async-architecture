import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure";
import { TaskAssignService } from "./task-assign.service";

@Module({
  imports: [InfrastructureModule],
  exports: [TaskAssignService],
  providers: [TaskAssignService]
})
export class TaskAssignModule {}