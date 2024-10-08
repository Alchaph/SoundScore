import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../../models/User";
import {Artist} from '../../models/Artist';
import {Observable, tap} from "rxjs";
import {environment} from "../../../environments/environments";
import {DataTranfer} from "../../models/DataTranfer";
import {CookieService} from "../CookieService/cookie.service";
import {HttpService} from "../HttpService/http.service";
import {PayPalAccessToken} from "../../models/PayPalAccessToken";
import {TransactionDetails} from "../../models/TransactionDetails";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient, private cookieService: CookieService, private httpService: HttpService) {
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
    return this.http.get<User[]>(environment.url + '/users/all', this.httpService.getHttpOptions());
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(environment.url + '/users/user/' + id, this.httpService.getHttpOptions());
  }

  public getUserByArtistId(id: number | undefined): Observable<User> {
    return this.http.get<User>(environment.url + '/users/getByArtistId/' + id, this.httpService.getHttpOptions());
  }

  public getMe(): Observable<User> {
    return this.http.get<User>(environment.url + '/users/me', this.httpService.getHttpOptions());
  }

  public verifyPassword(username: string, password: string): Observable<Object> {
    return this.http.post(environment.url + '/auth/verify-password', {
      username: username,
      password: password
    }, this.httpService.getHttpOptions());
  }

  public registerArtist(artist: Artist): Observable<User> {
    return this.http.put<User>(environment.url + '/users/register-artist', artist, this.httpService.getHttpOptions());
  }

  public updateUser(user: User): Observable<User> {
    this.cookieService.setCookie('2fa_verified' + user.username, 'false', 24 * 60 * 60 * 1000);
    return this.http.put<User>(environment.url + '/users', user, this.httpService.getHttpOptions());
  }

  public deleteMe(): Observable<User> {
    return this.http.delete<User>(environment.url + '/users', this.httpService.getHttpOptions());
  }

  public emailExists(email: string): Observable<boolean> {
    const url: string = environment.url + `/auth/email-exists/${email}`;
    return this.http.get<boolean>(url);
  }

  public usernameExists(username: string): Observable<boolean> {
    const url: string = environment.url + `/auth/username-exists/${username}`;
    return this.http.get<boolean>(url);
  }

  public getUsernameByEMail(email: string)   {
    const url = environment.url + `/auth/username-by-email/${email}`;
    return this.http.get<DataTranfer>(url);
  }

  public getEMailByUsername(username: string) {
    const url = environment.url + `/auth/email-by-username/${username}`;
    return this.http.get<DataTranfer>(url);
  }

  public authenticate(email: string): Observable<boolean> {
    return this.http.post<boolean>(environment.url + '/auth/authenticate', {
      data: email
    });
  }
  public verify(email: string, username: string, otp: string): Observable<boolean> {
    return this.http.post<boolean>(environment.url + '/auth/verify-Otp', {
      username: email,
      otp: otp
    }).pipe(
      tap((isVerified) => {
        if (isVerified) {
          const name = '2fa_verified' + username;
          // Set cookie for 24 hours
          this.cookieService.setCookie(name, 'true', 24 * 60 * 60 * 1000);
        }
      })
    );
  }

  public updatePassword(email: string, password: string): Observable<User> {
    return this.http.put<User>(environment.url + '/auth/update-password', {
      email: email,
      password: password
    });
  }

  public deleteAccountByUsername(username: string): Observable<User> {
    return this.http.delete<User>(environment.url + `/auth/delete-account/${username}`);
  }

  public updateToPremium(): Observable<User> {
    return this.http.put<User>(environment.url + '/users/premium', {},  this.httpService.getHttpOptions());
  }
}
