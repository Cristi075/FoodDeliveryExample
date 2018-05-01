import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from './http.service';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';

import { Notification } from '../model/notification';

@Injectable()
export class NotificationService {
  private notificationUrl: string = 'notification/';

  constructor(
    private httpService: HttpService
  ) { }

  getNotifications(): Observable<Notification[]> {
    return this.httpService.get(this.notificationUrl);
  }

  getNewNotifications(): Observable<Notification[]> {
    return Observable.interval(1000).switchMap(() => {
      return this.httpService.get(this.notificationUrl + 'new')
    });
  }

  updateNotification(notification: Notification){
    return this.httpService.put(this.notificationUrl+'id='+notification.id, notification);
  }
}
