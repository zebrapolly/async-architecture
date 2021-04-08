import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { CoreModule } from '../../core';
import { ProfileHandlerService } from './profile-handler.service';
import { TaskAssignHandlerService } from './task-assign-handler';
import { TaskCompletedHandlerService } from './task-completed-handler';
import { TaskHandlerService } from './task-cud-handler.service';

@Module({
  imports: [
    CoreModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'tasks',
          type: 'topic',
        },
      ],
      uri: 'amqp://user:bitnami:rabbitmq:rabbitmq@rabbitmq:5672',
    }),
    EventHandlersModule,
  ],
  providers: [TaskHandlerService, ProfileHandlerService, TaskAssignHandlerService, TaskCompletedHandlerService],
})
export class EventHandlersModule {}