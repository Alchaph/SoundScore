import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor(private http: HttpClient) {
  }

  public login(email: string, password: string) {
    return this.http.post<{ token: string, expiresIn: number }>('http://localhost:8080/auth/login', {
      email: email,
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

  public getUsers() {
    return this.http.get<User[]>('http://localhost:8080/users/users', {
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

  public verifyPassword(email: string, password: string) {
    return this.http.post('http://localhost:8080/auth/verify-password', {
      email: email,
      password: password
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  public updateUser(user: User) {
    return this.http.put<User>('http://localhost:8080/users/update-user', user, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  public deleteUser() {
    return this.http.delete('http://localhost:8080/users/delete', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}
