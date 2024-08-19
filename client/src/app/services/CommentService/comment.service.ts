import {ElementRef, Injectable, QueryList} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from '../../models/Comment';
import {catchError, from, map, Observable, of, switchMap} from "rxjs";
import {environment} from "../../../environments/environments";
import {HttpService} from "../HttpService/http.service";
import {JwtService} from "../JwtService/jwt.service";
import {User} from "../../models/User";
import {UserTagService} from "../UserTagService/user-tag.service";
import {Post} from "../../models/Post";
import {UserTag} from "../../models/UserTag";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  currentAction: string = 'Add';
  focusedComment: Comment = {} as Comment;
  comments: Comment[] = [];
  newComment: Comment = {} as Comment;

  constructor(private http: HttpClient, private httpService: HttpService, private jwtService: JwtService, private userTagService: UserTagService) {
  }
  processCommentContent(content: string): Observable<string> {
    const usernameRegex = /@(\w+)/g;

    return this.jwtService.getUsers().pipe(
      map(users => {
        return content.replace(usernameRegex, (match, username) => {
          const user = users.find(user => user.username === username);
          if (user) {
            return `<a href="/home/userProfile/${user.id}/0" class="username-link">${match}</a>`;
          } else {
            return match;
          }
        });
      })
    );
  }
  getTaggedUser(comment: Comment): Observable<User | undefined> {
    if (comment.message.includes('@')) {
      const match = comment.message.match(/@(\w+)/);
      const taggedUsername = match ? match[1] : undefined;
      if (taggedUsername) {
        return this.jwtService.getUsers().pipe(
          map(users => users.find(user => user.username === taggedUsername))
        );
      }
    }
    return of(undefined);
  }

  validMessage(message: string): boolean {
    //check if message contains html tags
    const htmlRegex = /<[^>]*>/;
    return !htmlRegex.test(message);
  }

  stripHtmlTags(content: string): string {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.textContent || div.innerText || '';
  }

  createComment(comment: Comment): Observable<Comment> {
    if (this.validMessage(comment.message)) {
      return this.http.post<Comment>(environment.url + '/comments', comment, this.httpService.getHttpOptions()).pipe(
      switchMap(savedComment => {
          return this.getTaggedUser(savedComment).pipe(
            switchMap(taggedUser => {
              if (taggedUser) {
                const newTag: UserTag = {
                  user: savedComment.user,
                  taggedUser: taggedUser,
                  post: undefined,
                  comment: savedComment
                };
                return this.userTagService.createTag(newTag).pipe(
                  switchMap(() => {
                    console.log('Tag created');
                    return of(savedComment); // Return the saved comment
                  })
                );
              } else {
                return of(savedComment); // No tagged user, just return the saved comment
              }
            })
          );
        })
      );
    } else {
      throw new Error('HTML tags are not allowed in comments');
    }
  }

  updateComment(comment: Comment): Observable<Comment> {
    if (this.validMessage(comment.message)) {
      return this.http.put<Comment>(environment.url + '/comments', comment, this.httpService.getHttpOptions()).pipe(
        switchMap(savedComment => {
          return this.getTaggedUser(savedComment).pipe(
            switchMap(taggedUser => {
              if (taggedUser) {
                const newTag: UserTag = {
                  user: savedComment.user,
                  taggedUser: taggedUser,
                  post: undefined,
                  comment: savedComment
                };
                return this.userTagService.createTag(newTag).pipe(
                  switchMap(() => {
                    console.log('Tag updated');
                    return of(savedComment); // Return the saved comment
                  })
                );
              } else {
                return of(savedComment); // No tagged user, just return the saved comment
              }
            })
          );
        })
      );
    } else {
      throw new Error('HTML tags are not allowed in comments');
    }
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
