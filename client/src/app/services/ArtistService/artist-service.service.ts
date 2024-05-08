import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Artist} from "../../models/Artist";

@Injectable({
  providedIn: 'root'
})
export class ArtistServiceService {

  constructor(private http: HttpClient) {
  }

  createArtist(artist: Artist) {
    return this.http.post('http://localhost:8080/artist/create', artist, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  updateArtist(artist: Artist) {
    return this.http.put('http://localhost:8080/artist/update', artist, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  deleteArtist(id: number) {
    return this.http.delete('http://localhost:8080/artist/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  getArtists() {
    return this.http.get<Artist[]>('http://localhost:8080/artist/all', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  getArtist(id: number) {
    return this.http.get<Artist>('http://localhost:8080/artist/get/' + id, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }
}
