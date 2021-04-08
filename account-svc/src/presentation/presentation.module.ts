import { Module } from "@nestjs/common";
import { CoreModule } from "../core";
import { DayEndAccountingController } from "./day-end-accounting.controller";
import { EventHandlersModule } from "./event-handlers";

@Module({
  imports: [EventHandlersModule, CoreModule],
  exports: [EventHandlersModule],
  controllers: [DayEndAccountingController]
})
export class PresentationModule {}