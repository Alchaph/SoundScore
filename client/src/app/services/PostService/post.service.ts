import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(environment.url + '/posts', post, environment.options);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(environment.url + '/posts', post, environment.options);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(environment.url + '/posts/' + id, environment.options);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.url + '/posts/all', environment.options);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(environment.url + '/posts/' + id, environment.options);
  }

  likeOrDislikePost(post: Post, like: boolean): Observable<boolean> {
    return this.http.post<boolean>(environment.url + '/posts/like/' + post.id, like, environment.options);
  }

  hasAlreadyLikedOrDisliked(postId: number): Observable<{
    liked: boolean,
    alreadyLikedOrDisliked: boolean
  }> {
    return this.http.get<{
      liked: boolean,
      alreadyLikedOrDisliked: boolean
    }>(environment.url + '/posts/likes/' + postId, environment.options);
  }
}
