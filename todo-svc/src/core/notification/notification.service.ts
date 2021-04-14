import { Injectable, Type } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from "@nestjs/core";

import { ITaskAssignedEvent } from "../../domain";
import { FullProfileService } from "../../infrastructure";
import { INotification, TaskAssignedNotification } from "./notifications";
import { NotificationStrategy } from "./strategies";

@Injectable()
export class NotificationService {
  constructor(
    private moduleRef: ModuleRef,
    private readonly profileStore: FullProfileService,
    private configService: ConfigService
  ) {

  }
  async sendTaskAssigned(args: ITaskAssignedEvent) {
    const { profileId, taskId } = args;
    const profile = await this.profileStore.getOneById(profileId);
    const notification = new TaskAssignedNotification(profile, args, this.configService);
    const channels = notification.broadcastOn();
    return Promise.all(
      channels.map((channel: Type<NotificationStrategy>) =>
        this.sendOnChannel(notification, channel),
      ),
    );
  }

  private async sendOnChannel(
    notification: INotification,
    channel: Type<NotificationStrategy>,
  ): Promise<any> {
    const chann = await this.resolveChannel(channel);
    await chann.send(notification);
  }

  private resolveChannel = (channel: Type<NotificationStrategy>) =>
    this.moduleRef.create(channel);
}