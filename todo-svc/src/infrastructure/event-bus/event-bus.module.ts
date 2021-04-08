import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { EventBusService } from './event-bus.service';


@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, {
    exchanges: [
      {
        name: 'tasks',
        type: 'topic',
      },
    ],
    uri: 'amqp://user:bitnami:rabbitmq:rabbitmq@rabbitmq:5672',
    connectionInitOptions: {
      wait: false },
  })],
  providers: [EventBusService],
  exports: [EventBusService]
})
export class EventBusModule {}