import { Module } from "@nestjs/common";
import { TaskModule } from "./task";

@Module({
  imports: [ TaskModule ],
  exports: [ TaskModule ]
})
export class CoreModule {}