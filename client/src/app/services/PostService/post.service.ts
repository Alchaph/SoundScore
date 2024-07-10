import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/Post";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environments";
import {HttpService} from "../HttpService/http.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(environment.url + '/posts', post, this.httpService.getHttpOptions());
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(environment.url + '/posts', post, this.httpService.getHttpOptions());
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(environment.url + '/posts/' + id, this.httpService.getHttpOptions());
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.url + '/posts/all', this.httpService.getHttpOptions());
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(environment.url + '/posts/' + id, this.httpService.getHttpOptions());
  }

  likeOrDislikePost(post: Post, like: boolean): Observable<boolean> {
    return this.http.post<boolean>(environment.url + '/posts/like/' + post.id, like, this.httpService.getHttpOptions());
  }

  hasAlreadyLikedOrDisliked(postId: number): Observable<{
    liked: boolean,
    alreadyLikedOrDisliked: boolean
  }> {
    return this.http.get<{
      liked: boolean,
      alreadyLikedOrDisliked: boolean
    }>(environment.url + '/posts/likes/' + postId, this.httpService.getHttpOptions());
  }
}
