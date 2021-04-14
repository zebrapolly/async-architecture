import { Module } from "@nestjs/common";
import { NotificationModule } from "./notification";
import { ProfileModule } from "./profile";
import { TaskModule } from "./task";
import { TaskAssignModule } from "./task-assign";

@Module({
  imports: [ TaskModule, ProfileModule, TaskAssignModule, NotificationModule ],
  exports: [ TaskModule, ProfileModule, TaskAssignModule, NotificationModule ]
})
export class CoreModule {}