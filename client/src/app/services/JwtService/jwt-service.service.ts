import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {User} from "../../models/User";
import { Artist } from '../../models/Artist';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {catchError, throwError} from "rxjs";
import {Verification} from "../../models/Verification";

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string) {
    return this.http.post<{ token: string, expiresIn: number }>('http://localhost:8080/auth/login', {
      username: username,
      password: password
    });
  }

  public register(email: string, password: string, username: string) {
    return this.http.post('http://localhost:8080/auth/signup', {
      email: email,
      password: password,
      username: username
    });
  }

  public authenticate(email: string) {
    return this.http.post<boolean>('http://localhost:8080/auth/authenticate', {
      email: email
    });
  }

  public verify(verification: Verification) {
    return this.http.post<boolean>('http://localhost:8080/auth/verify/Otp', {
      username: verification.username,
      otp: verification.otp
    });
  }

  public getUsers() {
    return this.http.get<User[]>('http://localhost:8080/users/');
  }

  public getMe() {
    return this.http.get<User>('http://localhost:8080/users/me');
  }

  public verifyPassword(username: string, password: string) {
    console.log(username, password)
    return this.http.post('http://localhost:8080/auth/verify/password', {
      username: username,
      password: password
    });
  }

  public updateUser(artist: Artist) {
    return this.http.put<User>('http://localhost:8080/users/update-user', artist);
  }
  public updateUsers(user: User) {
    return this.http.put<User>('http://localhost:8080/users/updateUser', {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      artist: user.artist,
      enabled: user.enabled,
      authorities: user.authorities,
      accountNonLocked: user.accountNonLocked,
      credentialsNonExpired: user.credentialsNonExpired,
      accountNonExpired: user.accountNonExpired
    });
  }

  public deleteMe() {
    return this.http.delete<User>('http://localhost:8080/users/delete');
  }

  public emailExists(email: string) {
    const url = `http://localhost:8080/auth/email-exists/${email}`;
    return this.http.get<boolean>(url);
  }

  public getUsernameByEMail(email: string) {
    const url = `http://localhost:8080/auth/username/by/email/${email}`;
    console.log(url)
    return this.http.get<string>(url);
  }
}
