import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Artist} from "../../models/Artist";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {


  constructor(private http: HttpClient) {
  }

  createArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(environment.url + '/artist/create', artist, environment.options);
  }

  updateArtist(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(environment.url + '/artist/edit', artist, environment.options)
  }

  deleteArtist(id: number): Observable<Artist> {
    return this.http.delete<Artist>(environment.url + '/artist/delete/' + id, environment.options);
  }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(environment.url + '/artist/get/all', environment.options);
  }

  getArtist(id: number): Observable<Artist> {
    return this.http.get<Artist>(environment.url + '/artist/get/' + id, environment.options);
  }
}
