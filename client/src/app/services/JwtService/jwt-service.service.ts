import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {User} from "../../models/User";
import { Artist } from '../../models/Artist';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor(private http: HttpClient) {
  }

  public login(userName: string, password: string) {
    return this.http.post<{ token: string, expiresIn: number }>('http://localhost:8080/auth/login', {
      userName: userName,
      password: password
    });
  }

  public register(email: string, password: string, userName: string) {
    return this.http.post<User>('http://localhost:8080/auth/signup', {
      email: email,
      password: password,
      userName: userName
    });
  }

  public getUsers() {
    return this.http.get<User[]>('http://localhost:8080/users/', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  public getMe() {
    return this.http.get<User>('http://localhost:8080/users/me', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  public verifyPassword(userName: string, password: string) {
    console.log(userName, password)
    return this.http.post('http://localhost:8080/auth/verify-password', {
      userName: userName,
      password: password
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  public updateUser(artist: Artist) {
    return this.http.put<User>('http://localhost:8080/users/update-user', artist, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
  public updateUsers(user: User) {
    return this.http.put<User>('http://localhost:8080/users/updateUser', {
      id: user.id,
      userName: user.username,
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
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  public deleteMe() {
    return this.http.delete<User>('http://localhost:8080/users/delete', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  public emailExists(email: string) {
    const url = `http://localhost:8080/auth/email-exists/${email}`;
    return this.http.get<boolean>(url);
  }

}
