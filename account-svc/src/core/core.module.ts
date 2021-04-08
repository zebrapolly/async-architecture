import { Module } from "@nestjs/common";
import { AccountModule } from "./account";
import { AccountingModule } from "./accounting";
import { TaskModule } from "./task";

@Module({
  imports: [TaskModule, AccountModule, AccountingModule ],
  exports: [TaskModule, AccountModule, AccountingModule ]
})
export class CoreModule {}