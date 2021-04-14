import { Injectable, Logger } from "@nestjs/common";
import { ISlackNotification } from "../notifications";

@Injectable()
export class SlackStrategy {
  private readonly logger = new Logger(SlackStrategy.name)
  async send(notification: ISlackNotification): Promise<any> {
    const slackWebHook = notification.slackWebhookLink();
    if (slackWebHook) {
      this.logger.log('send notification', `${notification.toSlack()}`)
      return;
    }
  };
}