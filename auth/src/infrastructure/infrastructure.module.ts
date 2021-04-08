import { Module } from "@nestjs/common";
import { EventBusModule } from "./event-bus";
import { ProfilePersistenceModule } from "./profile";

@Module({
  imports: [ ProfilePersistenceModule, EventBusModule ],
  exports: [ ProfilePersistenceModule, EventBusModule ]
})
export class InfrastructureModule {}