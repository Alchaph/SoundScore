import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Artist} from "../../models/Artist";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environments";
import {HttpService} from "../HttpService/http.service";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {


  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  createArtist(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(environment.url + '/users/register-artist', artist, this.httpService.getHttpOptions());
  }

  updateArtist(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(environment.url + '/artist', artist, this.httpService.getHttpOptions())
  }

  deleteArtist(id: number): Observable<Artist> {
    return this.http.delete<Artist>(environment.url + '/artist/' + id, this.httpService.getHttpOptions());
  }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(environment.url + '/artist/all', this.httpService.getHttpOptions());
  }

  getArtist(id: number): Observable<Artist> {
    return this.http.get<Artist>(environment.url + '/artist/' + id, this.httpService.getHttpOptions());
  }
}
