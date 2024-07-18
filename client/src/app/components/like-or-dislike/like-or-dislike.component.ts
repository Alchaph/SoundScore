import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {User} from "../../models/User";
import {PostService} from "../../services/PostService/post.service";
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {Post} from "../../models/Post";
import {Observable} from "rxjs";

@Component({
  selector: 'app-like-or-dislike',
  standalone: true,
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './like-or-dislike.component.html',
  styleUrl: './like-or-dislike.component.scss'
})
export class LikeOrDislikeComponent {
  likeProcessing: boolean = false;
  @Input("post")
  post: Post = {} as Post;
  @Input("user")
  activeUser: User = {} as User

  constructor(protected postService: PostService) {
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
        like: true
      }) : post.dislikes.push({
        post: post,
        user: this.activeUser,
        like: false
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
}
