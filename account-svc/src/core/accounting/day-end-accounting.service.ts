import { Injectable } from "@nestjs/common";
import { TransactionManager, Transaction, EntityManager } from "typeorm";
import { ITaskAssignedEvent } from "../../domain";
import { AccountStore, AuditStore, TaskStore } from "../../infrastructure";

@Injectable()
export class DayEndAccountingService {
  constructor(
    private readonly accountStore: AccountStore,
    private readonly auditStore: AuditStore
  ) {
  }

  @Transaction({ isolation: "READ COMMITTED" })
  async process(@TransactionManager() manager?: EntityManager) {
    const accounts = await this.accountStore.getAll(manager);

    for (const account of accounts) {
      const { profile: { publicId: profileId}, balance } = account;
      if (balance>0) {
        await this.auditStore.create({ 
          credit: balance,
          debit: 0,
          profileId,
          reason: 'DAY_END_ACCOUNTING'
        }, manager);
        await this.accountStore.decreaseBalance(account.id, balance, manager);
      } else {
        // send notification 
      } 
    }
  }
}