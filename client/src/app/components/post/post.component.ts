import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {Post} from "../../models/Post";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/PostService/post.service";
import {FormsModule} from "@angular/forms";
import {CommentService} from "../../services/CommentService/comment.service";
import { Comment } from '../../models/Comment';

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
  post: Post | undefined;
  comments: Comment[] = [];
  //TODO add user id and comment id
  postId = Number(this.route.snapshot.paramMap.get('postId'));

  //TODO MAKE IT WORK
  newComment: Comment = {title: '', message: '', post: null, user: null }
  constructor(private route: ActivatedRoute, private postService: PostService, private commentService : CommentService) { }

  ngOnInit(): void {
    console.log(this.newComment)
    this.postService.getPost(this.postId).subscribe((post) => {
      this.post = post;
    });
    this.commentService.getCommentsOfPost(this.postId).subscribe((comments) => {
      this.comments = comments;
      console.log(comments)
    });
  }
  addComment(): void {
    if (!this.newComment.title || !this.newComment.message) {
      return;
    }
    //TODO add user id
    this.commentService.createComment(this.newComment).subscribe(comment => {
      this.comments.push(<Comment>comment);
      this.newComment.title = '';
      this.newComment.message = '';
    });
  }
}
