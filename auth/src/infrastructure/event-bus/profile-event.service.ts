import { Injectable, Logger } from "@nestjs/common";
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IProfileCreatedEvent, IProfile } from "../../domain";
import * as protobuf from 'protobufjs';

@Injectable()
export class ProfileEventService {
  private readonly logger = new Logger(ProfileEventService.name);
  constructor(
    private readonly amqpConnection: AmqpConnection
  ) {}

  async sendCreated(profile: IProfileCreatedEvent) {
    console.log('sendCreated', profile)
    const message = await this.checkAndEncodeMessage((profile));    
    return this.amqpConnection.publish('profiles', 'profile.created', {ver: 1, message})
  }

  private checkAndEncodeMessage(profile: IProfileCreatedEvent) {
    console.log('checkAndEncodeMessage', profile);
    return protobuf.load("/usr/src/app/schema-registry/profile-created/profile-created.v1.proto")
      .then(root => {
        var ProfileCreatedMessage = root.lookupType("main.ProfileCreated");
        var errMsg = ProfileCreatedMessage.verify(profile);
        if (errMsg) {
          this.logger.error('err', errMsg);
          throw Error(errMsg)
        };
        const message = ProfileCreatedMessage.create(profile);
        console.log('checkAndEncodeMessage message', message);
        return ProfileCreatedMessage.encode(message).finish();
      });
  }
}