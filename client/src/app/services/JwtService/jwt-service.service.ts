import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User";
import { Artist } from '../../models/Artist';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {catchError, throwError} from "rxjs";
import {Verification} from "../../models/Verification";
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
    return this.http.put<User>(environment.url + '/users/register-artist', artist, environment.options);
  }

  public updateUsers(user: User): Observable<User> {
    return this.http.put<User>(environment.url + '/users', user, environment.options);
  }

  public deleteMe(): Observable<User> {
    return this.http.delete<User>(environment.url + '/users', environment.options);
  }

  public emailExists(email: string): Observable<boolean> {
    const url: string = environment.url + `/auth/email-exists/${email}`;
    return this.http.get<boolean>(url);
  }

  public getUsernameByEMail(email: string) {
    const url = `http://localhost:8080/auth/username/by/email/${email}`;
    console.log(url)
    return this.http.get<string>(url);
  }

  public getEMailByUsername(username: string) {
    const url = `http://localhost:8080/auth/email/by/username/${username}`;
    console.log(url)
    return this.http.get<string>(url);
  }

  public authenticate(email: string): Observable<Verification> {
    return this.http.post<Verification>(environment.url + '/auth/authenticate', {
      email: email
    });
  }

  public verify(verification: Verification): Observable<boolean> {
    return this.http.post<boolean>(environment.url + '/auth/verify/Otp', {verification});
  }
}
