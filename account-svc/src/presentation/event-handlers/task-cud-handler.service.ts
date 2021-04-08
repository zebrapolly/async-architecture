import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import * as protobuf from 'protobufjs';

import { TaskService } from '../../core';
import { ITask } from '../../domain';
import { IEvent } from './interfaces';

@Injectable()
export class TaskHandlerService {
  private readonly logger = new Logger(TaskHandlerService.name)

  constructor(
    private readonly taskService: TaskService
  ) {

  }
  @RabbitRPC({
    exchange: 'tasks',
    routingKey: 'task.created',
    queue: 'account-tasks',
  })
  public async taskCreatedHandler(msg: IEvent) {
    const { ver, message } = msg;
    let decoded: ITask;
    switch(ver) {
      case 1: 
        decoded = await this.decodeTaskCreatedMessageV1(message.data);
        break;
      default: 
        this.logger.warn('Not supported version', `ver:${ver}`);
        // create notification to a engineer
        return;
    }
    return this.taskService.create(decoded);
  }

  private decodeTaskCreatedMessageV1(msg: Buffer): Promise<ITask> {
    return protobuf.load("/usr/src/app/schema-registry/task-created/task-created.v1.proto")
      .then(root => {
        var TaskCreatedMessage = root.lookupType("main.TaskCreated");
        var message = TaskCreatedMessage.decode(msg);
        var object = TaskCreatedMessage.toObject(message, {
          enums: String
        });
        return object as ITask;
      });
  }
}