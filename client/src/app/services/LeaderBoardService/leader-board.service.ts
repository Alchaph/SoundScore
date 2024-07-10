import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";
import {Observable} from "rxjs";
import {Song} from "../../models/Song";
import {Artist} from "../../models/Artist";
import {Genre} from "../../models/Genre";
import {environment} from "../../../environments/environments";
import {HttpService} from "../HttpService/http.service";

@Injectable({
  providedIn: 'root'
})
export class LeaderBoardService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  getLeaderBoard(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.url + '/leaderboard/all', this.httpService.getHttpOptions());
  }

  getLeaderBoardByGenre(): Observable<Genre[]> {
    return this.http.get<Genre[]>(environment.url + '/leaderboard/genre', this.httpService.getHttpOptions());
  }

  getLeaderBoardByArtist(): Observable<Artist[]> {
    return this.http.get<Artist[]>(environment.url + '/leaderboard/artist', this.httpService.getHttpOptions());
  }

  getLeaderBoardBySong(): Observable<Song[]> {
    return this.http.get<Song[]>(environment.url + '/leaderboard/song', this.httpService.getHttpOptions())
  }

}
