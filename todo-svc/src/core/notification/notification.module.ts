import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure";
import { NotificationService } from "./notification.service";

@Module({
  imports: [InfrastructureModule],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}