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

  public getPayPalAccessToken(): Observable<PayPalAccessToken> {
    const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
    const body = new HttpParams().set('grant_type', 'client_credentials');
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('AYZh61ZXTEo55aS0p_jcX1H6oVG1uR9lDLyqp5wvvYKd0lxG7Nq2yN5mK9EX7jQCz9rvPEdm9Bqk65qu' + ':' + 'EAH17QjPw4ng2vDyvkTy-HF8SPGTiqURCHsdPZpnMlZ40R4wxT2MWCPBx6B5Dz0nwyA8JElew0TZDQWV'),
      // 'Authorization': 'Basic ' + btoa('AeY04KPRZiPpl85SoZOCvEHhuHXbfp9xchCYLZHhPU0Pq6MhOtFJdYeZ-H7Uy4n-0BQlUXImIKXWMvlj' + ':' + 'EMRImocW-d3ZGo19ZLDiiTitfnVlqb3hITOMgipD1udChsjPutNYxPjwRUH3bDsQXLFKI0fVz2TWAu8k'),
      // 'Authorization': 'Basic ' + btoa('AZt02-DNSZg1AerK0qbLwXxu3ZOWsJTVn6MCNxZ-wYAtqjtj6Nnhk5ukeLlodgHqtq41CEFWbHuFOVIr' + ':' + 'EBRUMI-cLDcBm8EXo1v3rIhxjIlmFQ-Fef-ecExNX1ah5Cp1wObEO-RxXfIGZfuaDkyp2DXd91IVs7qe'),
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    return this.http.post<PayPalAccessToken>(url, body.toString(), { headers });
  }

  public getTransactions(): TransactionDetails[] {
    fetch('https://api-m.paypal.com/v1/reporting/transactions/?start_date=2021-01-01T00:00:00-0700&end_date=2024-01-31T23:59:59-0700&fields=all&page_size=100&page=1', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('paypal_access_token'),
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {

        return data;
      });
    return [];

    // const url = 'https://api-m.paypal.com/v1/reporting/transactions/?start_date=2021-01-01T00:00:00-0700&end_date=2024-01-31T23:59:59-0700&fields=all&page_size=100&page=1';
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + localStorage.getItem('paypal_access_token'),
    //   'Content-Type': 'application/json'
    // });
    // return this.http.get<TransactionDetails[]>(url, {headers});
  }

}
