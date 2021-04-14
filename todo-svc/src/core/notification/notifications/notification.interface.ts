export interface INotification {

}

export interface ISlackNotification extends INotification {
  toSlack(): string;
  slackWebhookLink(): string;
}

export interface IEmailNotification extends INotification {
  toEmail(): string;
  email(): string;
}

export interface ISMSNotification extends INotification {
  toSMS(): string;
  phoneNumber(): string;
}