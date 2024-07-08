import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {Post} from "../../models/Post";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PostService} from "../../services/PostService/post.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommentService} from "../../services/CommentService/comment.service";
import {Comment} from '../../models/Comment';
import {JwtServiceService} from "../../services/JwtService/jwt-service.service";
import {User} from "../../models/User";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {GenericLanguagePipe} from "../../pipes/genericLanguage.pipe";
import {CommentComponent} from "../comment/comment.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {LanguageService} from "../../services/languageService/language.service";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    FormsModule,
    MatIconButton,
    MatIcon,
    MatButton,
    RouterLink,
    ReactiveFormsModule,
    TranslateModule,
    AsyncPipe,
    GenericLanguagePipe,
    NgIf,
    NgForOf,
    NgStyle,
    CommentComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSlideToggle,
    MatFormField,
    MatInput,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})

export class PostComponent implements OnInit {
  protected post: Post;
  protected activeUser: User;
  protected postId: number = Number(this.route.snapshot.paramMap.get('postId'));
  protected likeProcessing: boolean = false;
  protected liked: boolean = false;
  protected disliked: boolean = false;
  protected translate: boolean = false;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              protected commentService: CommentService,
              private jwtService: JwtServiceService,
              private router: Router,
              protected languageService: LanguageService) {
    this.post = {} as Post;
    this.commentService.newComment = {} as Comment;
    this.activeUser = {} as User;
    this.postId = Number(this.route.snapshot.paramMap.get('postId'));
  }


  goBack() {
    const previousPath: string | null = sessionStorage.getItem('previousPath')

    if (previousPath) {
      sessionStorage.clear();
      this.router.navigate([previousPath])

    } else {
      this.router.navigate(['/home'])
    }
  }

  likePost(): void {
    this.likeProcessing = true;
    this.liked = !this.liked;
    this.postService.likeOrDislikePost(this.post, true).subscribe((data) => {
      if (data) {
        this.post.likes++;
      } else {
        this.post.likes--;
      }
      this.likeProcessing = false;
    });
  }

  dislikePost(): void {
    this.likeProcessing = true;
    this.disliked = !this.disliked;
    this.postService.likeOrDislikePost(this.post, false).subscribe((data) => {
      if (data) {
        this.post.dislikes++;
      } else {
        this.post.dislikes--;
      }
      this.likeProcessing = false;
    });
  }

  ngOnInit(): void {
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
    });
    this.postService.hasAlreadyLikedOrDisliked(this.postId).subscribe(data => {
      if (data.alreadyLikedOrDisliked) {
        if (data.liked) {
          this.liked = true;
        } else {
          this.disliked = true;
        }
      }
    });
    this.commentService.getCommentsOfPost(this.postId).subscribe(comments => {
      this.commentService.comments = this.commentService.buildCommentTree(comments);
    });
    this.jwtService.getMe().subscribe(user => {
      this.activeUser = user;
    });
  }

  handleAction(): void {
    if (!this.commentService.newComment.message) {
      return;
    }
    this.commentService.newComment.post = this.post;
    this.commentService.newComment.user = this.activeUser;
    if (this.commentService.currentAction === 'Add') {
      this.addComment();
    } else if (this.commentService.currentAction === 'Edit your') {
      this.editComment();
    } else if (this.commentService.currentAction === 'Reply to') {
      this.replyToComment();
    }
    this.commentService.newComment = {} as Comment;
    this.commentService.focusedComment = {} as Comment;
    this.commentService.currentAction = 'Add';
  }

  addComment(): void {
    this.commentService.createComment(this.commentService.newComment).subscribe(comment =>
      this.commentService.getCommentsOfPost(this.postId).subscribe(comments =>
        this.commentService.comments = this.commentService.buildCommentTree(comments)
      )
    );
  }

  replyToComment(): void {
    this.commentService.createComment(this.commentService.newComment).subscribe(comment =>
      this.commentService.getCommentsOfPost(this.postId).subscribe(comments =>
        this.commentService.comments = this.commentService.buildCommentTree(comments)
      )
    );
  }

  editComment(): void {
    this.commentService.updateComment(this.commentService.newComment).subscribe(updatedComment => {
      this.commentService.getCommentsOfPost(this.postId).subscribe(comments =>
        this.commentService.comments = this.commentService.buildCommentTree(comments)
      )
    });
  }


  removeCommentFromTree(comments: Comment[], commentId: number): Comment[] {
    return comments.filter(c => c.id !== commentId).map(c => {
      if (c.children) {
        c.children = this.removeCommentFromTree(c.children, commentId);
      }
      return c;
    });
  }

  resetAction(): void {
    this.commentService.currentAction = 'Add';
    this.commentService.newComment = {} as Comment;
    this.commentService.focusedComment = {} as Comment;
  }

  protected readonly window = window;
  protected readonly JSON = JSON;
}
