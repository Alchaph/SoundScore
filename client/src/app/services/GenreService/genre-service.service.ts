import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Genre} from "../../models/Genre";

@Injectable({
  providedIn: 'root'
})
export class GenreServiceService {

  constructor(private http: HttpClient) {
  }

  createGenre(genre: Genre) {
    return this.http.post('http://localhost:8080/genres/create', genre);
  }

  updateGenre(genre: Genre) {
    return this.http.put('http://localhost:8080/genres/update', genre);
  }

  deleteGenre(id: number) {
    return this.http.delete('http://localhost:8080/genres/delete/' + id);
  }

  getGenres() {
    return this.http.get<Genre[]>('http://localhost:8080/genres/all');
  }

  getGenre(id: number) {
    return this.http.get<Genre>('http://localhost:8080/genres/get/' + id);
  }
}
