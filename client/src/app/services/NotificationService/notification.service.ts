import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notification} from "../../models/Notification";
import {HttpService} from "../HttpService/http.service";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  markAsRead(notification: Notification) {
    return this.http.put<Notification>("http://localhost:8080/api/notifications/markAsRead/" + notification.id, null, this.httpService.getHttpOptions())
  }

  markAllAsRead(user: User) {
    return this.http.put<Notification[]>("http://localhost:8080/api/notifications/markAllAsRead.id", user, this.httpService.getHttpOptions())
  }
}
