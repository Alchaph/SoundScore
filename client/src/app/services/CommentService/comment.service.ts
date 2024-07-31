import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from '../../models/Comment';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environments";
import {HttpService} from "../HttpService/http.service";
import {HeaderService} from "../HeaderService/header.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  currentAction: string = 'Add';
  focusedComment: Comment = {} as Comment;
  comments: Comment[] = [];
  newComment: Comment = {} as Comment;

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(environment.url + '/comments', comment, this.httpService.getHttpOptions());
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(environment.url + '/comments', comment, this.httpService.getHttpOptions())
  }

  deleteComment(id: number): Observable<Comment> {
    return this.http.delete<Comment>(environment.url + '/comments/' + id, this.httpService.getHttpOptions());

  }

  getCommentsOfPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(environment.url + '/comments/commentsByPostId/' + postId, this.httpService.getHttpOptions());
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
