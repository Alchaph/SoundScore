import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notification} from "../../models/Notification";
import {HttpService} from "../HttpService/http.service";
import {User} from "../../models/User";
import {environment} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  markAsRead(notification: Notification) {
    return this.http.put<Notification>(environment.url + "/notifications/markAsRead/" + notification.id, null, this.httpService.getHttpOptions())
  }

  markAllAsRead(user: User) {
    return this.http.put<Notification[]>(environment.url + "/notifications/markAllAsRead", user, this.httpService.getHttpOptions())
  }
}
