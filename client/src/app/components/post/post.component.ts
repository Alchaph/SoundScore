import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {Post} from "../../models/Post";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PostService} from "../../services/PostService/post.service";
import {FormsModule} from "@angular/forms";
import {CommentService} from "../../services/CommentService/comment.service";
import {Comment} from '../../models/Comment';
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {User} from "../../models/User";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Location} from '@angular/common';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    FormsModule,
    MatIconButton,
    MatIcon,
    MatButton,
    RouterLink
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  post: Post;
  comments: Comment[] = []
  replies: Comment[] = []
  newComment: Comment;
  activeUser: User;
  postId: number = Number(this.route.snapshot.paramMap.get('postId'));
  currentAction: 'Add' | 'Edit your' | 'Reply to' = 'Add';
  focusedComment?: Comment;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private commentService: CommentService,
              private jwtService: JwtServiceService,
              private location: Location
  ) {
    this.post = {} as Post;
    this.newComment = {} as Comment;
    this.activeUser = {} as User;
  }


  ngOnInit(): void {
    this.postService.getPost(this.postId).subscribe((post) => {
      this.post = post;
    });
    this.commentService.getCommentsOfPost(this.postId).subscribe((comments) => {
      this.comments = comments.filter(c => !c.comment);
      this.replies = comments.filter(c => c.comment);
    });
    this.jwtService.getMe().subscribe((user) => {
      this.activeUser = user;
    });
  }

  goBack() {
    this.location.back();
  }

  likePost(): void {
    this.postService.likeOrDislikePost(this.post, true).subscribe((data) =>{
      if (data) {
        this.post.likes++;
      }else {
        this.post.likes--;
      }
    });
  }
  dislikePost(): void {
    this.postService.likeOrDislikePost(this.post, false).subscribe((data) =>{
      if (data) {
        this.post.dislikes++;
      }else {
        this.post.dislikes--;
      }
    });
  }
  handleAction(): void {
    if (!this.newComment.title || !this.newComment.message) {
      return;
    }
    this.newComment.post = this.post;
    this.newComment.user = this.activeUser;
    if (this.currentAction === 'Add') {
      this.addComment();
    } else if (this.currentAction === 'Edit your') {
      if (this.focusedComment) {
        this.newComment.comment = this.focusedComment.comment;
      }
      this.editComment();
    }
    if (this.currentAction === 'Reply to') {
      this.replyToComment();
    }
    this.newComment = {} as Comment;
    this.focusedComment = undefined;
    this.currentAction = 'Add';
  }

  addComment(): void {
    this.commentService.createComment(this.newComment).subscribe(comment => {
      if (comment.comment) {
        this.replies.push(<Comment>comment);
      } else {
        this.comments.push(<Comment>comment);
      }
    });
  }

  replyToComment(): void {
    this.newComment.comment = this.focusedComment;
    this.commentService.createComment(this.newComment).subscribe(comment => {
      this.replies.push(<Comment>comment);
    });
  }

  editComment(): void {
    if (this.focusedComment && this.focusedComment.id) {
      this.newComment.id = this.focusedComment.id;
      this.commentService.updateComment(this.newComment).subscribe(comment => {
        this.comments = this.comments.map(c => c.id === comment.id ? comment : c);
        this.replies = this.replies.map(c => c.id === comment.id ? comment : c);
      });
    }
  }


  deleteComment(comment: Comment): void {
    if (comment.id) {
      this.commentService.deleteComment(comment.id).subscribe(() => {
        this.comments = this.comments.filter(c => c.id !== comment.id);
        this.replies = this.replies.filter(c => c.id !== comment.id);
      });
    }
  }

  protected readonly parent = parent;
}
