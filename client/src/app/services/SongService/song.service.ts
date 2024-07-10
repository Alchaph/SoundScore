import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Song} from "../../models/Song";
import {environment} from "../../../environments/environments";
import {Observable} from "rxjs";
import {HttpService} from "../HttpService/http.service";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  createSong(song: Song): Observable<Song> {
    return this.http.post<Song>(environment.url + '/songs', song, this.httpService.getHttpOptions());
  }

  deleteSong(id: number): Observable<Song> {
    return this.http.delete<Song>(environment.url + '/songs/' + id, this.httpService.getHttpOptions());
  }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(environment.url + '/songs/all', this.httpService.getHttpOptions());
  }

  getSong(id: number): Observable<Song> {
    return this.http.get<Song>(environment.url + '/songs/' + id, this.httpService.getHttpOptions());
  }
}
