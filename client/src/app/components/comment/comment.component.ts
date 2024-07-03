// comment.component.ts
import {Component, Input} from '@angular/core';
import {Comment} from '../../models/Comment';
import {User} from '../../models/User';
import {CommentService} from '../../services/CommentService/comment.service';
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {GenericLanguagePipe} from "../../pipes/genericLanguage.pipe";

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
    GenericLanguagePipe
  ],
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment: Comment = {} as Comment;
  @Input() activeUser: User = {} as User;
  @Input() level: number = 0;
  @Input() postId: number = 0;
  baseId = 0;

  constructor(private commentService: CommentService) {
  }


  setEditComment(comment: Comment): void {
    this.commentService.currentAction = 'Edit your';
    this.commentService.focusedComment = comment;
    this.commentService.newComment = {...comment};
  }

  setReplyComment(comment: Comment): void {
    this.commentService.currentAction = 'Reply to';
    this.commentService.focusedComment = comment;
    this.commentService.newComment = {} as Comment;
  }

  deleteComment(comment: Comment): void {
    if (comment.id) {
      if (comment.children && comment.children.length > 0) {
        comment.children.forEach(c => this.deleteComment(c))
      } else {
        this.commentService.deleteComment(comment.id).subscribe(c => {
          if (comment.id !== this.baseId && comment.comment) {
            this.deleteComment(comment.comment)
          } else {
            this.commentService.getCommentsOfPost(comment.post.id ?? 0).subscribe((comments) => {
                this.commentService.comments = this.commentService.buildCommentTree(comments)
              }
            )
          }
        })
      }
    }
  }


  removeCommentFromTree(comments: Comment[], commentId: number): Comment[] {
    return comments.filter(c => c.id !== commentId).map(c => {
      if (c.children) {
        c.children = this.removeCommentFromTree(c.children, commentId);
      }
      return c;
    });
  }
}
