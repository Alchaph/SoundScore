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
    return this.http.get<Post>('http://localhost:8080/leaderboard/all');
  }

  getLeaderBoardByGenre() {
    return this.http.get<Post>('http://localhost:8080/leaderboard/genre');
  }

  getLeaderBoardByArtist() {
    return this.http.get<Post>('http://localhost:8080/leaderboard/artist');
  }

  getLeaderBoardBySong() {
    return this.http.get<Post>('http://localhost:8080/leaderboard/song');
  }
}
