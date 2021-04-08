import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure";
import { PriceService } from "./price.service";
import { TaskService } from "./task.service";

@Module({
  imports: [InfrastructureModule],
  providers: [TaskService, PriceService],
  exports: [TaskService]
})
export class TaskModule {}