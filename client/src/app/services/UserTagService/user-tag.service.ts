import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../HttpService/http.service";
import {environment} from "../../../environments/environments";
import {UserTag} from "../../models/UserTag";
import {Tag} from "../../models/Tag";

@Injectable({
  providedIn: 'root'
})
export class UserTagService {

  constructor(private http: HttpClient, private httpService: HttpService) { }

  createTag(tag: UserTag) {
    return this.http.post<UserTag>(environment.url + '/usertags', tag, this.httpService.getHttpOptions());
  }

  deleteTag(id: number) {
    return this.http.delete<UserTag>(environment.url + '/usertags/' + id, this.httpService.getHttpOptions());
  }
}
