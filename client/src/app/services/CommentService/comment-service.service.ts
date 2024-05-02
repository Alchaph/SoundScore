import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private http: HttpClient) {
  }

  createComment(comment: Comment) {
    return this.http.post('http://localhost:8080/comments/create', comment);
  }

  updateComment(comment: Comment) {
    return this.http.put('http://localhost:8080/comments/update', comment);
  }

  deleteComment(id: number) {
    return this.http.delete('http://localhost:8080/comments/delete/' + id);
  }

  getComments() {
    return this.http.get<Comment[]>('http://localhost:8080/comments/all');
  }

  getComment(id: number) {
    return this.http.get<Comment>('http://localhost:8080/comments/get/' + id);
  }
}
