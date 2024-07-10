import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../../head-nav-bar/head-nav-bar.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {HomeService} from "../../../services/HomeService/home.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {TranslateModule} from "@ngx-translate/core";
import {Post} from "../../../models/Post";
import {Observable} from "rxjs";
import {User} from "../../../models/User";
import {PostService} from "../../../services/PostService/post.service";
import {JwtServiceService} from "../../../services/JwtService/jwt-service.service";
import {LikeOrDislikeComponent} from "../../like-or-dislike/like-or-dislike.component";

@Component({
  selector: 'app-home-mobile',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatFabButton,
    MatIcon,
    MatList,
    MatListItem,
    MatMenu,
    MatMenuItem,
    RouterLink,
    MatMenuTrigger,
    TranslateModule,
    LikeOrDislikeComponent
  ],
  templateUrl: './home-mobile.component.html',
  styleUrl: './home-mobile.component.scss'
})
export class HomeMobileComponent implements OnInit {
  protected isMobile: boolean = false;
  protected selectedFilters?: 'genre' | 'song' | 'artist';
  protected likeProcessing: boolean = false;
  protected activeUser: User = {} as User

  constructor(protected homeService: HomeService, private breakpointObserver: BreakpointObserver, protected postService: PostService, protected jwtService: JwtServiceService) {
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
    this.jwtService.getMe().subscribe(data => {
      this.activeUser = data
      this.homeService.loadPosts();
    })
  }

  postLiked(post: Post): boolean {
    return post.likes.some(dislike => dislike.user.id === this.activeUser.id)
  }

  postDisliked(post: Post): boolean {
    return post.dislikes.some(dislike => dislike.user.id === this.activeUser.id)
  }

  likePost(post: Post): void {
    this.likeProcessing = true;
    this.postDisliked(post) ? this.dislike(post).subscribe((data) => {
      this.handleLikeDislikeResponse(data, false, post)
      this.like(post).subscribe(data => {
        this.handleLikeDislikeResponse(data, true, post)
        this.likeProcessing = false;
      })
    }) : this.like(post).subscribe(data => {
      this.handleLikeDislikeResponse(data, true, post)
      this.likeProcessing = false;
    })
  }

  dislikePost(post: Post): void {
    this.likeProcessing = true;
    this.postLiked(post) ? this.like(post).subscribe((data) => {
      this.handleLikeDislikeResponse(data, true, post)
      this.dislike(post).subscribe(data => {
        this.handleLikeDislikeResponse(data, false, post)
        this.likeProcessing = false;
      })
    }) : this.dislike(post).subscribe(data => {
      this.handleLikeDislikeResponse(data, false, post)
      this.likeProcessing = false;
    })
  }

  handleLikeDislikeResponse(data: boolean, likeOrDislike: boolean, post: Post): void {
    if (data) {
      likeOrDislike ? post.likes.push({
        post: post,
        user: this.activeUser,
        isLike: true
      }) : post.dislikes.push({
        post: post,
        user: this.activeUser,
        isLike: false
      });
    } else {
      likeOrDislike ? post.likes = post.likes.filter(data => data.user.id !== this.activeUser.id) : post.dislikes = post.dislikes.filter(data => data.user.id !== this.activeUser.id);
    }
  }

  like(post: Post): Observable<boolean> {
    return this.postService.likeOrDislikePost(post, true);
  }


  dislike(post: Post): Observable<boolean> {
    return this.postService.likeOrDislikePost(post, false);
  }

  selected(selected: string) {
    this.selectedFilters = selected.toLowerCase() as 'genre' | 'song' | 'artist';
  }

  handlePanelClick(event: MouseEvent) {
    event.stopPropagation();
  }

  openLink(event: MouseEvent, link: string) {
    event.stopPropagation();
    window.open(link, '_blank');
  }
}
