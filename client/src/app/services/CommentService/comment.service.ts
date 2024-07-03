import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from '../../models/Comment';
import {Observable} from "rxjs";

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
    return this.http.post<Comment>('http://localhost:8080/api/comments/create', comment, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>('http://localhost:8080/api/comments/edit', comment, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  deleteComment(id: number) {
    return this.http.delete('http://localhost:8080/api/comments/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getCommentsOfPost(postId: number) {
    return this.http.get<Comment[]>('http://localhost:8080/api/comments/get/commentsByPostId/' + postId, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getCommentById(id: number) {
    return this.http.get<Comment>('http://localhost:8080/api/comments/get/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  buildCommentTree(comments: Comment[]): Comment[] {
    const commentMap: { [key: number]: Comment } = {};

    const rootComments: Comment[] = [];
    comments.forEach(comment => {
      comment.children = [];
      commentMap[comment.id!] = comment;
    });

    comments.forEach(comment => {
      if (comment.comment) {
        commentMap[comment.comment.id!].children?.push(comment);
      } else {
        rootComments.push(comment);
      }
    });
    return rootComments;
  }
}
