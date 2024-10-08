import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {Post} from "../../models/Post";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PostService} from "../../services/PostService/post.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommentService} from "../../services/CommentService/comment.service";
import {Comment} from '../../models/Comment';
import {JwtService} from "../../services/JwtService/jwt.service";
import {User} from "../../models/User";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {GenericLanguagePipe} from "../../pipes/genericLanguage.pipe";
import {CommentComponent} from "../comment/comment.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {LikeOrDislikeComponent} from "../like-or-dislike/like-or-dislike.component";
import {LanguageService} from "../../services/languageService/language.service";
import {BehaviorSubject, takeUntil} from "rxjs";

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
    LikeOrDislikeComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})

export class PostComponent implements OnInit, OnDestroy {
  protected post: Post;
  protected activeUser: User;
  protected postId: number = Number(this.route.snapshot.paramMap.get('postId'));
  protected translate: boolean = false;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              public commentService: CommentService,
              private jwtService: JwtService,
              private router: Router,
              protected languageService: LanguageService) {
    this.post = {} as Post;
    this.commentService.newComment = {} as Comment;
    this.activeUser = {} as User;
    this.postId = Number(this.route.snapshot.paramMap.get('postId'))
  }

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
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

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('postId'));
    if (this.postId) {
      this.loadComponentData();
    }

    this.commentService.getCommentsOfPost(this.postId).pipe(takeUntil(this.$destroy)).subscribe(comments => {
      console.log(comments);
      this.commentService.comments = this.commentService.buildCommentTree(comments);

      const commentId = Number(this.route.snapshot.paramMap.get('commentId'));
      // console.log(commentId);

      if (commentId) {
        this.commentService.comments = [this.commentService.comments.find(comment => comment.id === commentId)!];
        console.log(this.commentService.comments);

      //   for(let comment  of this.comments) {
      //     console.log(comment.id);
      //     // console.log(commentId);
      //     console.log(comment.id == commentId);
      //     this.comments = []
      //     if (comment.id == commentId) {
      //       this.comments.push(comment);
      //     }
      //   }
      //   console.log(this.comments);
      }
    });

    // console.log(Number(this.route.snapshot.paramMap.get('commentId')));


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
    this.commentService.createComment(this.commentService.newComment).pipe(takeUntil(this.$destroy)).subscribe(comment =>
      this.commentService.getCommentsOfPost(this.postId).pipe(takeUntil(this.$destroy)).subscribe(comments =>
        this.commentService.comments = this.commentService.buildCommentTree(comments)
      )
    );
  }

  replyToComment(): void {
    this.commentService.createComment(this.commentService.newComment).pipe(takeUntil(this.$destroy)).subscribe(comment =>
      this.commentService.getCommentsOfPost(this.postId).pipe(takeUntil(this.$destroy)).subscribe(comments =>
        this.commentService.comments = this.commentService.buildCommentTree(comments)
      )
    );
  }

  editComment(): void {
    this.commentService.updateComment(this.commentService.newComment).pipe(takeUntil(this.$destroy)).subscribe(updatedComment => {
      this.commentService.getCommentsOfPost(this.postId).pipe(takeUntil(this.$destroy)).subscribe(comments =>
        this.commentService.comments = this.commentService.buildCommentTree(comments)
      )
    });
  }

  resetAction(): void {
    this.commentService.currentAction = 'Add';
    this.commentService.newComment = {} as Comment;
    this.commentService.focusedComment = {} as Comment;
  }

  protected readonly window = window;
  protected readonly JSON = JSON;
  protected readonly localStorage = localStorage;

  loadComponentData() {
    this.postService.getPost(this.postId).pipe(takeUntil(this.$destroy)).subscribe(post => {
      this.post = post;
      this.jwtService.getMe().pipe(takeUntil(this.$destroy)).subscribe(user => {
        this.activeUser = user;
      });
    })

    this.commentService.getCommentsOfPost(this.postId).pipe(takeUntil(this.$destroy)).subscribe(comments => {
      this.commentService.comments = this.commentService.buildCommentTree(comments);
    });
  }
}
