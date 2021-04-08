import { Module } from "@nestjs/common";
import { ProfileModule } from "./profile";
import { TaskModule } from "./task";
import { TaskAssignModule } from "./task-assign";

@Module({
  imports: [ TaskModule, ProfileModule, TaskAssignModule ],
  exports: [ TaskModule, ProfileModule, TaskAssignModule ]
})
export class CoreModule {}