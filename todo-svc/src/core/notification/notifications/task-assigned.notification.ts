import { Type } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { IFullProfile, ITaskAssignedEvent } from "../../../domain";
import { EmailStrategy, NotificationStrategy, SlackStrategy } from "../strategies";
import { INotification } from "./notification.interface";

export class TaskAssignedNotification implements INotification {
  constructor(
    private readonly profile: IFullProfile,
    private readonly args: ITaskAssignedEvent,
    private readonly config: ConfigService
    ) {}
  public broadcastOn(): Type<NotificationStrategy>[] {
    return [SlackStrategy, EmailStrategy];
  }

  toSMS() {
    return `SMS template: ${this.linkToTask()} task assigned to you`;
  }

  toSlack() {
    return `SLACK template: ${this.linkToTask()} task assigned to you`;
  }

  toEmail() {
    return `EMAIL template: ${this.linkToTask()} task assigned to you`;
  }

  linkToTask() {
    return `${this.config.get('BOARD_URL')}/tasks/${this.args.taskId}` 
  }

  slackWebhookLink() {
    if (this.profile.slackId) {
      return `${this.config.get('SLACK_URL')}/${this.profile.slackId}`;
    }
  }

  phoneNumber() {
    return this.profile.phone;
  }

  email() {
    return this.profile.email;
  }
}