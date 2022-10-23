import randomString from "@/services/common/randomString";

export type NotificationOptions = {
  closeAfter: Number
}

export enum NotificationType {
  Success = 1,
  Warning = 2,
  Error = 3
}

export type NotificationState = {
  list: Array<Notification>
}

export class Notification {
  id: string;
  message: string;
  type: NotificationType;
  closeAfter: number;

  constructor(id: string, type: NotificationType, message: string, closeAfter: number) {
    this.id = id
    this.message = message
    this.type = type
    this.closeAfter = closeAfter
  }

  static Success(message: string, closeAfter: number = 5): Notification {
    return new Notification (randomString(10), NotificationType.Success, message, closeAfter)
  }

  static Error(message: string, closeAfter: number = 5): Notification {
    return new Notification (randomString(10), NotificationType.Error, message, closeAfter)
  }
}
