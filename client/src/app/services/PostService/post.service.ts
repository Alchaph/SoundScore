import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {
  }
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:8080/api/posts/create', post, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  updatePost(post: Post) {
    return this.http.put('http://localhost:8080/api/posts/update', post);
  }

  deletePost(id: number) {
    return this.http.delete('http://localhost:8080/api/posts/delete/' + id);
  }

  getPosts() {
    return this.http.get<Post[]>('http://localhost:8080/api/posts/get/all', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getPost(id: number) {
    return this.http.get<Post>('http://localhost:8080/api/posts/get/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
  likeOrDislikePost(post: Post, like: boolean) {
    return this.http.post('http://localhost:8080/api/posts/like/' + post.id, like , {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });

  }
}
