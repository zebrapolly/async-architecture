import { Injectable, Logger } from "@nestjs/common";
import { ISMSNotification } from "../notifications";

@Injectable()
export class SMSStrategy {
  private readonly logger = new Logger(SMSStrategy.name)
  async send(notification: ISMSNotification): Promise<any> {
    const phoneNumber = notification.phoneNumber();
    if (phoneNumber) {
      this.logger.log('send notification', `${notification.toSMS()}`)
      return;
    }
  };
}