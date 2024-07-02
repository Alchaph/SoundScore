import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Song} from "../../models/Song";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) {
  }

  createSong(song: Song) {
    return this.http.post('http://localhost:8080/api/songs/create', song, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  updateSong(song: Song) {
    return this.http.put('http://localhost:8080/api/songs/edit', song, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  deleteSong(id: number) {
    console.log('http://localhost:8080/api/songs/delete/' + id)
    return this.http.delete('http://localhost:8080/api/songs/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getSongs() {
    return this.http.get<Song[]>('http://localhost:8080/api/songs/get/all', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getSong(id: number) {
    return this.http.get<Song>('http://localhost:8080/api/songs/get/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}
