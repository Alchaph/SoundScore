import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Song} from "../../models/Song";

@Injectable({
  providedIn: 'root'
})
export class SongServiceService {

  constructor(private http: HttpClient) {
  }

  createSong(song: Song) {
    return this.http.post('http://localhost:8080/songs/create', song, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  updateSong(song: Song) {
    return this.http.put('http://localhost:8080/songs/update', song, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  deleteSong(id: number) {
    return this.http.delete('http://localhost:8080/songs/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  getSongs() {
    return this.http.get<Song[]>('http://localhost:8080/songs/all', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  getSong(id: number) {
    return this.http.get<Song>('http://localhost:8080/songs/get/' + id, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }
}
