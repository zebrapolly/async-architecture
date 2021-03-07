import { Module } from "@nestjs/common";
import { CoreModule } from "../../core";
import { TaskController } from "./task.controller";

@Module({
  imports: [CoreModule],
  controllers: [
    TaskController,
    
  ]
})
export class ApiModule {}