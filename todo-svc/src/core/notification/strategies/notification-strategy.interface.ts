import { INotification } from "../notifications";

export interface NotificationStrategy {
  send(notification: INotification): Promise<any>;
}