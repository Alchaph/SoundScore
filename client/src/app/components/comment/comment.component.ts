import {Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Comment} from '../../models/Comment';
import {User} from '../../models/User';
import {CommentService} from '../../services/CommentService/comment.service';
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {GenericLanguagePipe} from "../../pipes/genericLanguage.pipe";
import {LanguageService} from "../../services/languageService/language.service";
import {JwtService} from "../../services/JwtService/jwt.service";
import {Router, RouterLink} from "@angular/router";
import {BehaviorSubject, takeUntil} from "rxjs";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  standalone: true,
  imports: [
    MatIcon,
    NgForOf,
    NgIf,
    NgStyle,
    MatCard,
    GenericLanguagePipe,
    AsyncPipe,
    RouterLink
  ],
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy{
  @Input() comment: Comment = {} as Comment;
  @Input() activeUser: User = {} as User;
  @Input() protected level: number = 0;
  @Input() protected postId: number = 0;
  protected baseId = 0;


  constructor(private commentService: CommentService, protected languageService: LanguageService, private jwtService: JwtService, private router : Router) {
  }

  $destroy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  ngOnInit(): void {
    this.commentService.processCommentContent(this.comment.message).pipe(takeUntil(this.$destroy)).subscribe((message) => {
      this.comment.message = message;
    });
  }

  setEditComment(comment: Comment): void {
    this.commentService.currentAction = 'Edit your';
    const strippedMessage = this.commentService.stripHtmlTags(comment.message);
    this.commentService.newComment = { ...comment, message: strippedMessage };
  }

  setReplyComment(comment: Comment): void {
    this.commentService.currentAction = 'Reply to';
    this.commentService.newComment = {message: this.commentService.newComment.message, parent: comment} as Comment;
  }

  deleteComment(comment: Comment): void {
    if (comment.id === undefined || comment.id === null) {
      throw new Error('Comment has no id');
    }

    if (comment.children && comment.children.length > 0) {
      comment.children.forEach(c => this.deleteComment(c))
    } else {
      this.commentService.deleteComment(comment.id).pipe(takeUntil(this.$destroy)).subscribe(c => {
        if (comment.id !== this.baseId && comment.parent) {
          this.deleteComment(comment.parent)
        } else {
          if (comment.post && comment.post.id) {
            this.commentService.getCommentsOfPost(comment.post.id).pipe(takeUntil(this.$destroy)).subscribe((comments) => {
                this.commentService.comments = this.commentService.buildCommentTree(comments)
              }
            )
          }
        }
      })
    }
  }


}
