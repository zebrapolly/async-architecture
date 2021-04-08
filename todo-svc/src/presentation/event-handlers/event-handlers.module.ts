import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { CoreModule } from '../../core';
import { ProfileHandlerService } from './profile-handler.service';

@Module({
  imports: [
    CoreModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'profiles',
          type: 'topic',
        },
      ],
      uri: 'amqp://user:bitnami:rabbitmq:rabbitmq@rabbitmq:5672',
    }),
    EventHandlersModule,
  ],
  providers: [ ProfileHandlerService],
})
export class EventHandlersModule {}