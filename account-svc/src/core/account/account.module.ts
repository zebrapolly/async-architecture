import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure";
import { AccountService } from "./account.service";

@Module({
  imports: [InfrastructureModule],
  exports: [AccountService],
  providers: [AccountService]
})
export class AccountModule {}