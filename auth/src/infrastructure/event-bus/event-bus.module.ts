import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ProfileEventService } from './profile-event.service';


@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, {
    exchanges: [
      {
        name: 'profiles',
        type: 'topic',
      },
    ],
    uri: 'amqp://user:bitnami:rabbitmq:rabbitmq@rabbitmq:5672',
    connectionInitOptions: {
      wait: false },
  })],
  providers: [ProfileEventService],
  exports: [ProfileEventService]
})
export class EventBusModule {}