import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Genre} from "../../models/Genre";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) {
  }

  createGenre(genre: Genre) {
    return this.http.post('http://localhost:8080/api/genres/create', genre, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  updateGenre(genre: Genre) {
    return this.http.put('http://localhost:8080/api/genres/update', genre, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  deleteGenre(id: number) {
    return this.http.delete('http://localhost:8080/api/genres/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getGenres() {
    return this.http.get<Genre[]>('http://localhost:8080/api/genres/get/all', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getGenre(id: number) {
    return this.http.get<Genre>('http://localhost:8080/api/genres/get/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}
