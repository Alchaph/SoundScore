import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {Post} from "../../models/Post";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/PostService/post.service";
import {FormsModule} from "@angular/forms";
import {CommentService} from "../../services/CommentService/comment.service";
import { Comment } from '../../models/Comment';
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    FormsModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  post: Post;
  comments: Comment[] = [];
  newComment: Comment;
  activeUser : User;

  postId = Number(this.route.snapshot.paramMap.get('postId'));
  constructor(private route: ActivatedRoute, private postService: PostService, private commentService : CommentService, private jwtService : JwtServiceService) {
    this.post = {} as Post;
    this.newComment = {} as Comment;
    this.activeUser = {} as User;
  }


  ngOnInit(): void {
    this.postService.getPost(this.postId).subscribe((post) => {
      this.post = post;
    });
    this.commentService.getCommentsOfPost(this.postId).subscribe((comments) => {
      this.comments = comments;
    });
    this.jwtService.getMe().subscribe((user) => {
      this.activeUser = user;
    });
  }
  addComment(): void {
    if (!this.newComment.title || !this.newComment.message) {
      return;
    }
    console.log(this.newComment)
    this.newComment.post = this.post;
    this.newComment.user = this.activeUser;
    this.commentService.createComment(this.newComment).subscribe(comment => {
      this.comments.push(<Comment>comment);
      this.newComment.title = '';
      this.newComment.message = '';
    });
  }
}
