import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient) {
  }

  createPost(post: Post) {
    return this.http.post('http://localhost:8080/api/posts/create', post);
  }

  updatePost(post: Post) {
    return this.http.put('http://localhost:8080/api/posts/update', post);
  }

  deletePost(id: number) {
    return this.http.delete('http://localhost:8080/api/posts/delete/' + id);
  }

  getPosts() {
    return this.http.get<Post[]>('http://localhost:8080/api/posts/get/all');
  }

  getPost(id: number) {
    return this.http.get<Post>('http://localhost:8080/api/posts/get/' + id);
  }
}
