import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import * as protobuf from 'protobufjs';

import { NotificationService } from '../../core';
import { ITask, ITaskAssignedEvent } from '../../domain';
import { IEvent } from './interfaces';

@Injectable()
export class TaskAssignHandlerService {
  private readonly logger = new Logger(TaskAssignHandlerService.name)

  constructor(
    private readonly notificationService: NotificationService
  ) {

  }
  @RabbitRPC({
    exchange: 'tasks',
    routingKey: 'task.assigned',
    queue: 'todo-assigned-tasks'
  })
  public async taskAssignedHandler(msg: IEvent) {
    const { ver, message } = msg;
    let decoded: ITaskAssignedEvent;
    switch(ver) {
      case 1: 
        decoded = await this.decodeTaskAssignedMessage(message.data);
        break;
      default: 
        this.logger.warn('Not supported version', `ver:${ver}`);
        // create notification to an engineer
        return;
    }
    this.logger.log('handle task assigned message', JSON.stringify(decoded));
    return this.notificationService.sendTaskAssigned(decoded);
  }

  private decodeTaskAssignedMessage(msg: Buffer): Promise<ITaskAssignedEvent> {
    return protobuf.load("/usr/src/app/schema-registry/task-assigned/task-assigned.v1.proto")
      .then(root => {
        var TaskAssignedMessage = root.lookupType("main.TaskAssigned");
        var message = TaskAssignedMessage.decode(msg);
        var object = TaskAssignedMessage.toObject(message, {
          enums: String
        });
        return object as ITaskAssignedEvent;
      });
  }
}