import { Injectable } from "@nestjs/common";
import { EntityManager, Transaction, TransactionManager } from "typeorm";
import { ITaskCompletedEvent } from "../../domain";
import { AccountStore, AuditStore, TaskStore } from "../../infrastructure";

@Injectable()
export class ProfitAccountingService {
  constructor(
    private readonly accountStore: AccountStore,
    private readonly taskStore: TaskStore,
    private readonly auditStore: AuditStore
  ) {

  }
  
  @Transaction({ isolation: "READ COMMITTED" })
  async process(args: ITaskCompletedEvent, @TransactionManager() manager?: EntityManager) {
    const { taskId } = args;
    const task = await this.taskStore.findById(taskId, manager);
    if (!task) throw new Error('task not found');

    const { assigneeId, profit } = task;
    if (!assigneeId) {
      throw new Error('task not assigned');
    }

    await this.auditStore.create({ 
      credit: 0,
      debit: profit,
      profileId: assigneeId,
      reason: 'TASK_COMPLETED'
    }, manager);

    const account = await this.accountStore.findByProfileId(assigneeId, manager);

    await this.accountStore.increaseBalance(account.id, task.profit, manager);
  }
}
