import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure";
import { DayEndAccountingService } from "./day-end-accounting.service";
import { FeeAccountingService } from "./fee-accounting.service";
import { ProfitAccountingService } from "./profit-accounting.service";

@Module({
  imports: [InfrastructureModule],
  providers: [FeeAccountingService, ProfitAccountingService, DayEndAccountingService],
  exports: [FeeAccountingService, ProfitAccountingService, DayEndAccountingService]
})
export class AccountingModule {}