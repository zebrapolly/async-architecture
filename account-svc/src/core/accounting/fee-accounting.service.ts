import { Injectable } from "@nestjs/common";
import { TransactionManager, Transaction, EntityManager } from "typeorm";
import { ITaskAssignedEvent } from "../../domain";
import { AccountStore, AuditStore, TaskStore } from "../../infrastructure";

@Injectable()
export class FeeAccountingService {
  constructor(
    private readonly accountStore: AccountStore,
    private readonly taskStore: TaskStore,
    private readonly auditStore: AuditStore
  ) {

  }

  @Transaction({ isolation: "READ COMMITTED" })
  async process(params: ITaskAssignedEvent, @TransactionManager() manager?: EntityManager) {
    const { profileId, taskId } = params;
    const account = await this.accountStore.findByProfileId(profileId, manager);
    if (!account) throw new Error('account not found');
    const task = await this.taskStore.findById(taskId, manager);
    if (!task) throw new Error('task not found');
    await this.taskStore.update(task.id, { assigneeId: profileId }, manager);

    await this.auditStore.create({ 
      credit: task.fee,
      debit: 0,
      profileId,
      reason: 'TASK_ASSIGN'
    }, manager);

    await this.accountStore.decreaseBalance(account.id, task.fee, manager);
  }
}