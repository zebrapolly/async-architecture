import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import * as protobuf from 'protobufjs';

import { ProfitAccountingService } from '../../core';
import { ITaskCompletedEvent } from '../../domain';
import { IEvent } from './interfaces';

@Injectable()
export class TaskCompletedHandlerService {
  private readonly logger = new Logger(TaskCompletedHandlerService.name)

  constructor(
    private readonly service: ProfitAccountingService
  ) {

  }
  @RabbitRPC({
    exchange: 'tasks',
    routingKey: 'task.completed',
    queue: 'account-completed-tasks'
  })
  public async taskCompletedHandler(msg: IEvent) {
    const { ver, message } = msg;
    let decoded: ITaskCompletedEvent;
    switch(ver) {
      case 1: 
        decoded = await this.decodeTaskCompletedMessage(message.data);
        break;
      default: 
        this.logger.warn('Not supported version', `ver:${ver}`);
        // create notification to an engineer and send to deadLetterExchange
        return;
    }
    this.logger.log('handle task completed message', JSON.stringify(decoded));
    return this.service.process(decoded);
  }

  private decodeTaskCompletedMessage(msg: Buffer): Promise<ITaskCompletedEvent> {
    return protobuf.load("/usr/src/app/schema-registry/task-completed/task-completed.v1.proto")
      .then(root => {
        var TaskCompletedMessage = root.lookupType("main.TaskCompleted");
        var message = TaskCompletedMessage.decode(msg);
        var object = TaskCompletedMessage.toObject(message, {
          enums: String
        });
        return object as ITaskCompletedEvent;
      });
  }
}