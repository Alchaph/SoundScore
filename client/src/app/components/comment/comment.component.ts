// comment.component.ts
import {Component, Input} from '@angular/core';
import {Comment} from '../../models/Comment';
import {User} from '../../models/User';
import {CommentService} from '../../services/CommentService/comment.service';
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {GenericLanguagePipe} from "../../pipes/genericLanguage.pipe";
import {LanguageService} from "../../services/languageService/language.service";

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
    AsyncPipe
  ],
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment: Comment = {} as Comment;
  @Input() activeUser: User = {} as User;
  @Input() protected level: number = 0;
  @Input() protected postId: number = 0;
  protected baseId = 0;

  constructor(private commentService: CommentService, protected languageService: LanguageService) {
  }


  setEditComment(comment: Comment): void {
    this.commentService.currentAction = 'Edit your';
    this.commentService.newComment = {...comment};
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
      this.commentService.deleteComment(comment.id).subscribe(c => {
        if (comment.id !== this.baseId && comment.parent) {
          this.deleteComment(comment.parent)
        } else {
          if (comment.post && comment.post.id) {
            this.commentService.getCommentsOfPost(comment.post.id).subscribe((comments) => {
                this.commentService.comments = this.commentService.buildCommentTree(comments)
              }
            )
          }
        }
      })
    }
  }

}
