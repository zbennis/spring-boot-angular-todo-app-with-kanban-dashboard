import {Injectable} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {InternNotificationType} from '../entity/InternNotificationType';

@Injectable({
  providedIn: 'root'
})
export class TriggerNotificationService {

  constructor(private notification: NotificationsService) {
  }

  triggerNotification(type: InternNotificationType, loginMessage: string, content: string, timeout: number): void {
    if (type === InternNotificationType.SUCCESS) {
      this.notification.success(loginMessage, content, {
        timeOut: timeout,
      });
    } else if (type === InternNotificationType.ERROR) {
      this.notification.error(loginMessage, content, {
        timeOut: timeout,
      });
    } else if (type === InternNotificationType.WARN) {
      this.notification.warn(loginMessage, content, {
        timeOut: timeout,
      });
    } else { // default to info
      this.notification.info(loginMessage, content, {
        timeOut: timeout,
      });
    }

  }
}
