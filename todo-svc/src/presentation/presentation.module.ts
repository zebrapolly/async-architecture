import { Module } from "@nestjs/common";
import { ApiModule } from "./api/api.module";
import { EventHandlersModule } from "./event-handlers";

@Module({
  imports: [ ApiModule, EventHandlersModule ],
  exports: [ ApiModule, EventHandlersModule ]
})
export class PresentationModule {}