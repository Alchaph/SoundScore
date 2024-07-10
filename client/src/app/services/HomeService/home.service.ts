import {Injectable} from '@angular/core';
import {Post} from "../../models/Post";
import {Song} from "../../models/Song";
import {Genre} from "../../models/Genre";
import {Artist} from "../../models/Artist";
import {PostService} from "../PostService/post.service";
import {LeaderBoardService} from "../LeaderBoardService/leader-board.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  posts: Post[] = [];

  topSongs: Song[] = [];
  topGenres: Genre[] = [];
  topArtists: Artist[] = [];

  constructor(private postService: PostService, private leaderBoardService: LeaderBoardService) {
  }

  getPosts() {
    return this.posts;
  }

  getTopSongs() {
    return this.topSongs;
  }

  getTopGenres() {
    return this.topGenres;
  }

  getTopArtists() {
    return this.topArtists;
  }


  loadPosts() {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data.reverse();
    });
    this.leaderBoardService.getLeaderBoardByGenre().subscribe((data: Genre[]) => {
      this.topGenres = data.reverse().slice(0, 5);
    });
    this.leaderBoardService.getLeaderBoardByArtist().subscribe((data: Artist[]) => {
      this.topArtists = data.reverse().slice(0, 5);
    });
    this.leaderBoardService.getLeaderBoardBySong().subscribe((data: Song[]) => {
      this.topSongs = data.reverse().slice(0, 5);
    });
  }
}
