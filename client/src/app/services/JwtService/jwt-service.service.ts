import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor(private http: HttpClient) {
  }

  public login(email: string, password: string){
    return this.http.post('http://localhost:8080/api/auth/login', {
      email: email,
      password: password
    });
  }

  public register(email: string, password: string, roleID: number){
    return this.http.post('http://localhost:8080/api/auth/signup', {
      email: email,
      password: password,
      roleID: roleID
    });
  }

  public getUsers(){
    return this.http.get<User[]>('http://localhost:8080/api/users/', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  public getMe(){
    return this.http.get<User>('http://localhost:8080/api/users/me', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }
}
