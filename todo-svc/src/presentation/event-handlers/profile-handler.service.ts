import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import * as protobuf from 'protobufjs';
import { ProfileService } from '../../core';
import { IProfileCreatedEvent } from '../../domain';

import { IEvent } from './interfaces';

@Injectable()
export class ProfileHandlerService {
  private readonly logger = new Logger(ProfileHandlerService.name)

  constructor(
    private readonly profileService: ProfileService
  ) {

  }
  @RabbitRPC({
    exchange: 'profiles',
    routingKey: 'profile.created',
    queue: 'todo-profile',
  })
  public async createProfileHandler(msg: IEvent) {
    const { ver, message } = msg;
    let decoded: IProfileCreatedEvent;
    switch(ver) {
      case 1: 
        decoded = await this.decodeCreateProfileMessageV1(message.data);
        break;
      default: 
        this.logger.warn('Not supported create-profile-event version', `ver:${ver}`);
        // create notification to a engineer
        return;
    }
    this.profileService.create(decoded);
    this.logger.log('handle create-profile-event', JSON.stringify(decoded));
  }

  private decodeCreateProfileMessageV1(msg: Buffer): Promise<IProfileCreatedEvent> {
    return protobuf.load("/usr/src/app/schema-registry/profile-created/profile-created.v1.proto")
      .then(root => {
        var ProfileCreatedMessage = root.lookupType("main.ProfileCreated");
        var message = ProfileCreatedMessage.decode(msg);
        var object = ProfileCreatedMessage.toObject(message, {
          enums: String
        });
        return object as IProfileCreatedEvent;
      });
  }
}