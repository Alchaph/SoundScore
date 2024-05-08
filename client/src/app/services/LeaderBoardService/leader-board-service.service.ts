import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";

@Injectable({
  providedIn: 'root'
})
export class LeaderBoardServiceService {

  constructor(private http: HttpClient) {
  }

  getLeaderBoard() {
    return this.http.get<Post>('http://localhost:8080/leaderboard/all', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  getLeaderBoardByGenre() {
    return this.http.get<Post>('http://localhost:8080/leaderboard/genre', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  getLeaderBoardByArtist() {
    return this.http.get<Post>('http://localhost:8080/leaderboard/artist', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  getLeaderBoardBySong() {
    return this.http.get<Post>('http://localhost:8080/leaderboard/song', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }
}
