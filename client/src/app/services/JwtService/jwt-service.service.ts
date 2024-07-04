import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {User} from "../../models/User";
import { Artist } from '../../models/Artist';

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
    console.log(email, password, username)
    return this.http.post('http://localhost:8080/auth/signup', {
      email: email,
      password: password,
      username: username
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

  public verifyPassword(username: string, password: string) {
    console.log(username, password)
    return this.http.post('http://localhost:8080/auth/verify-password', {
      username: username,
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

}
