import { Injectable, Logger } from "@nestjs/common";
import { ITask } from "../../domain";
import { TaskStore } from "../../infrastructure";
import { PriceService } from "./price.service";

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    private readonly taskStore: TaskStore,
    private readonly priceStore: PriceService
  ) {

  }

  create(payload: ITask) {
    const profit = this.priceStore.getProfit();
    const fee = this.priceStore.getFee();
    const task = {
      ...payload, fee, profit
    }
    this.logger.log('task created', JSON.stringify(task));
    return this.taskStore.create(task);
  }
}