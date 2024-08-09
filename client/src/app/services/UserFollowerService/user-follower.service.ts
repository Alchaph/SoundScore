import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../HttpService/http.service";
import {environment} from "../../../environments/environments";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserFollowerService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  followUser(user: User) {
    return this.http.post(environment.url + '/followers/follow', user, this.httpService.getHttpOptions());
  }

  unfollowUser(user: User) {
    return this.http.post(environment.url + '/followers/unfollow', user, this.httpService.getHttpOptions());
  }
}
