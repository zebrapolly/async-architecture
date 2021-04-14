import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { classToPlain } from 'class-transformer'; 
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ITask, ITaskAssignedEvent, ITaskCompleterEvent } from "../../domain";
import * as protobuf from 'protobufjs';


@Injectable()
export class EventBusService {
  private exchange: string; 
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly config: ConfigService
  ) {
    this.exchange = this.config.get('TASKS_TOPIC');
  }

  async sendTaskCreated(task: ITask) {
    const message = await this.checkAndEncodeMessage(task);    
    return this.amqpConnection.publish(this.exchange, 'task.created', {ver: 1, message})
  }

  async sendTaskAssigned(event: ITaskAssignedEvent) {
    const message = await this.checkAndEncodeTaskAssignedMessage(event);
    return this.amqpConnection.publish(this.exchange, 'task.assigned', {ver: 1, message})
  }

  async sendTaskCompleted(event: ITaskCompleterEvent) {
    const message = await this.checkAndEncodeTaskCompletedMessage(event);
    return this.amqpConnection.publish(this.exchange, 'task.completed', {ver: 1, message})
  }

  private checkAndEncodeTaskCompletedMessage(event: ITaskCompleterEvent) {
    return protobuf.load("/usr/src/app/schema-registry/task-completed/task-completed.v1.proto")
      .then(root => {
        var TaskCompletedMessage = root.lookupType("main.TaskCompleted");
        var errMsg = TaskCompletedMessage.verify(event);
        if (errMsg) throw Error(errMsg);
        const message = TaskCompletedMessage.create(event);
        return TaskCompletedMessage.encode(message).finish();
      });
  }

  private checkAndEncodeTaskAssignedMessage(event: ITaskAssignedEvent) {
    return protobuf.load("/usr/src/app/schema-registry/task-assigned/task-assigned.v1.proto")
      .then(root => {
        var TaskAssignedMessage = root.lookupType("main.TaskAssigned");
        var errMsg = TaskAssignedMessage.verify(event);
        if (errMsg) throw Error(errMsg);
        const message = TaskAssignedMessage.create(event);
        return TaskAssignedMessage.encode(message).finish();
      });
  }

  private checkAndEncodeMessage(task: ITask) {
    return protobuf.load("/usr/src/app/schema-registry/task-created/task-created.v1.proto")
      .then(root => {
        var CreateTaskMessage = root.lookupType("main.TaskCreated");
        var errMsg = CreateTaskMessage.verify(classToPlain(task));
        console.log(errMsg);
        if (errMsg) throw Error(errMsg);
        const message = CreateTaskMessage.create(classToPlain(task));
        return CreateTaskMessage.encode(message).finish();
      });
  }
}
