import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User";
import {Artist} from '../../models/Artist';
import {environment} from "../../../environments/environments";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string): Observable<{ token: string, expiresIn: number }> {
    return this.http.post<{ token: string, expiresIn: number }>(environment.url + '/auth/login', {
      username: username,
      password: password
    });
  }

  public register(email: string, password: string, username: string): Observable<User> {
    return this.http.post<User>(environment.url + '/auth/signup', {
      email: email,
      password: password,
      username: username
    });
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.url + '/users/', environment.options);
  }

  public getMe(): Observable<User> {
    return this.http.get<User>(environment.url + '/users/me', environment.options);
  }

  public verifyPassword(username: string, password: string): Observable<Object> {
    return this.http.post(environment.url + '/auth/verify-password', {
      username: username,
      password: password
    }, environment.options);
  }

  public updateUser(artist: Artist): Observable<User> {
    return this.http.put<User>(environment.url + '/users/update-user', artist, environment.options);
  }

  public updateUsers(user: User): Observable<User> {
    return this.http.put<User>(environment.url + '/users/updateUser', user, environment.options);
  }

  public deleteMe(): Observable<User> {
    return this.http.delete<User>(environment.url + '/users/delete', environment.options);
  }

  public emailExists(email: string): Observable<boolean> {
    const url: string = environment.url + `/auth/email-exists/${email}`;
    return this.http.get<boolean>(url);
  }
}
