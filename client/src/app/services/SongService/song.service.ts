import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Song} from "../../models/Song";
import {environment} from "../../../environments/environments";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) {
  }

  createSong(song: Song): Observable<Song> {
    return this.http.post<Song>(environment.url + '/songs', song, environment.options);
  }

  deleteSong(id: number): Observable<Song> {
    return this.http.delete<Song>(environment.url + '/songs/' + id, environment.options);
  }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(environment.url + '/songs/all', environment.options);
  }

  getSong(id: number): Observable<Song> {
    return this.http.get<Song>(environment.url + '/songs/' + id, environment.options);
  }
}
