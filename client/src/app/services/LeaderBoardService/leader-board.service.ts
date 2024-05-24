import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeaderBoardService {

  constructor(private http: HttpClient) {
  }

  getLeaderBoard() :Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/api/leaderboard/all', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getLeaderBoardByGenre() {
    return this.http.get<Post[]>('http://localhost:8080/api/leaderboard/genre', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getLeaderBoardByArtist() {
    return this.http.get<Post[]>('http://localhost:8080/api/leaderboard/artist', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getLeaderBoardBySong() {
    return this.http.get<Post[]>('http://localhost:8080/api/leaderboard/song', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}
