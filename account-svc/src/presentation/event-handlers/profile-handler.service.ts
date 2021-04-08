import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import * as protobuf from 'protobufjs';
import { AccountService } from '../../core';
import { ICreateProfileEvent } from '../../domain';

import { IEvent } from './interfaces';

@Injectable()
export class ProfileHandlerService {
  private readonly logger = new Logger(ProfileHandlerService.name)

  constructor(
    private readonly accountService: AccountService
  ) {

  }
  @RabbitRPC({
    exchange: 'profiles',
    routingKey: 'profile.created',
    queue: 'account-profile',
  })
  public async createProfileHandler(msg: IEvent) {
    const { ver, message } = msg;
    let decoded: ICreateProfileEvent;
    switch(ver) {
      case 1: 
        decoded = await this.decodeCreateProfileMessageV1(message.data);
        break;
      default: 
        this.logger.warn('Not supported create-profiled-event version', `ver:${ver}`);
        // create notification to a engineer
        return;
    }
    this.accountService.create(decoded);
    this.logger.log('handle create-profiled-event', JSON.stringify(decoded));
  }

  private decodeCreateProfileMessageV1(msg: Buffer): Promise<ICreateProfileEvent> {
    return protobuf.load("/usr/src/app/schema-registry/profile-created/profile-created.v1.proto")
      .then(root => {
        var ProfileCreatedMessage = root.lookupType("main.ProfileCreated");
        var message = ProfileCreatedMessage.decode(msg);
        var object = ProfileCreatedMessage.toObject(message, {
          enums: String
        });
        return object as ICreateProfileEvent;
      });
  }
}