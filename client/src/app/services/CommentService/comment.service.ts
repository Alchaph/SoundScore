import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Comment } from '../../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  createComment(comment: Comment) {
    return this.http.post('http://localhost:8080/api/comments/create', comment, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  updateComment(comment: Comment) {
    return this.http.put('http://localhost:8080/api/comments/update', comment, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  deleteComment(id: number) {
    return this.http.delete('http://localhost:8080/api/comments/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  getCommentsOfPost(postId: number) {
    return this.http.get<Comment[]>('http://localhost:8080/api/comments/get/commentsByPostId/'+postId, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  getCommentById(id: number) {
    return this.http.get<Comment>('http://localhost:8080/api/comments/get/' + id, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }
}
