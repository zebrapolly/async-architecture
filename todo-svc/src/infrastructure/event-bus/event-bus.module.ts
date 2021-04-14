import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EventBusService } from './event-bus.service';


@Module({
  imports: [RabbitMQModule.forRootAsync(RabbitMQModule, {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get('AMPQ_CONNECTION'),
      exchanges: [
        {
          name: configService.get('TASKS_TOPIC'),
          type: 'topic',
        },
      ],
      connectionInitOptions: {
        wait: false }
    }),
    inject: [ConfigService]
  })],
  providers: [EventBusService],
  exports: [EventBusService]
})
export class EventBusModule {}