import { Module } from "@nestjs/common";
import { EventBusModule } from "./event-bus";
import { FullProfileModule } from "./full-profile";
import { PersistenceModule } from "./persistence";

@Module({
  imports: [ PersistenceModule, EventBusModule, FullProfileModule ],
  exports: [ PersistenceModule, EventBusModule, FullProfileModule ]
})
export class InfrastructureModule {}