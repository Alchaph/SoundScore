import {Injectable, OnDestroy} from '@angular/core';
import {Post} from "../../models/Post";
import {Song} from "../../models/Song";
import {Genre} from "../../models/Genre";
import {Artist} from "../../models/Artist";
import {PostService} from "../PostService/post.service";
import {LeaderBoardService} from "../LeaderBoardService/leader-board.service";
import {Router} from "@angular/router";
import {JwtService} from "../JwtService/jwt.service";
import {User} from "../../models/User";
import {UserInformationService} from "../UserInformationService/user-information.service";
import {BehaviorSubject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnDestroy {
  posts: Post[] = [];
  topSongs: Song[] = [];
  topGenres: Genre[] = [];
  topArtists: Artist[] = [];

  constructor(private postService: PostService, private leaderBoardService: LeaderBoardService, private router: Router, private jwtService: JwtService, private userInformationService: UserInformationService) {
  }

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
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
    this.postService.getPosts().pipe(takeUntil(this.$destroy)).subscribe((data: Post[]) => {
      this.posts = data.reverse();
    });
    this.leaderBoardService.getLeaderBoardByGenre().pipe(takeUntil(this.$destroy)).subscribe((data: Genre[]) => {
      this.topGenres = data.reverse().slice(0, 5);
    });
    this.leaderBoardService.getLeaderBoardByArtist().pipe(takeUntil(this.$destroy)).subscribe((data: Artist[]) => {
      this.topArtists = data.reverse().slice(0, 5);
    });
    this.leaderBoardService.getLeaderBoardBySong().pipe(takeUntil(this.$destroy)).subscribe((data: Song[]) => {
      this.topSongs = data.reverse().slice(0, 5);
    });
  }

  gotoArtist(artistId: number | undefined) {
    if (artistId === undefined){
      this.userInformationService.setMessage('Artist not found');
    } else {
      this.jwtService.getUserByArtistId(artistId).pipe(takeUntil(this.$destroy)).subscribe(user => {
        this.router.navigate(['/home/userProfile/' + user?.id?.toString() + '/' + '1'])
      })
    }
  }
}
