import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}

  success(title: string, content: string): void {
    this.notification.success(title, content);
  }

  error(title: string, content: string): void {
    this.notification.error(title, content);
  }

  info(title: string, content: string): void {
    this.notification.info(title, content);
  }

  warning(title: string, content: string): void {
    this.notification.warning(title, content);
  }
}
