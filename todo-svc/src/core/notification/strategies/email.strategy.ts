import { Injectable, Logger } from "@nestjs/common";
import { IEmailNotification } from "../notifications";

@Injectable()
export class EmailStrategy {
  private readonly logger = new Logger(EmailStrategy.name)
  async send(notification: IEmailNotification): Promise<any> {
    const email = notification.email();
    if (email) {
      this.logger.log('send notification', `${notification.toEmail()}`)
      return;
    }
  };
}