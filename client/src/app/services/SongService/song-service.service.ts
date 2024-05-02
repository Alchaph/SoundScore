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
    return this.http.post('http://localhost:8080/songs/create', song);
  }

  updateSong(song: Song) {
    return this.http.put('http://localhost:8080/songs/update', song);
  }

  deleteSong(id: number) {
    return this.http.delete('http://localhost:8080/songs/delete/' + id);
  }

  getSongs() {
    return this.http.get<Song[]>('http://localhost:8080/songs/all');
  }

  getSong(id: number) {
    return this.http.get<Song>('http://localhost:8080/songs/get/' + id);
  }
}
