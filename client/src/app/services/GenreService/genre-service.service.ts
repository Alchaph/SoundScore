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
    return this.http.post('http://localhost:8080/genres/create', genre, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  updateGenre(genre: Genre) {
    return this.http.put('http://localhost:8080/genres/update', genre, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  deleteGenre(id: number) {
    return this.http.delete('http://localhost:8080/genres/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  getGenres() {
    return this.http.get<Genre[]>('http://localhost:8080/genres/all', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  getGenre(id: number) {
    return this.http.get<Genre>('http://localhost:8080/genres/get/' + id, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }
}
