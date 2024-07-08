import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from '../../models/Comment';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  currentAction: string = 'Add';
  focusedComment: Comment = {} as Comment;
  comments: Comment[] = [];
  newComment: Comment = {} as Comment;

  constructor(private http: HttpClient) {
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(environment.url + '/comments/create', comment, environment.options);

  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(environment.url + '/comments/edit', comment, environment.options)

  }

  deleteComment(id: number): Observable<Comment> {
    return this.http.delete<Comment>(environment.url + '/comments/delete/' + id, environment.options);

  }

  getCommentsOfPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(environment.url + '/comments/get/commentsByPostId/' + postId, environment.options);
  }

  buildCommentTree(comments: Comment[]): Comment[] {
    const commentMap: { [key: number]: Comment } = {};

    const rootComments: Comment[] = [];
    comments.forEach(comment => {
      comment.children = [];
      commentMap[comment.id!] = comment;
    });

    comments.forEach(comment => {
      if (comment.parent) {
        commentMap[comment.parent.id!].children?.push(comment);
      } else {
        rootComments.push(comment);
      }
    });
    return rootComments;
  }
}
