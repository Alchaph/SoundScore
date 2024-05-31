import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Artist} from "../../models/Artist";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) {
  }

  createArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>('http://localhost:8080/api/artist/create', artist, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  updateArtist(artist: Artist) {
    return this.http.put('http://localhost:8080/api/artist/edit', artist, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  deleteArtist(id: number) {
    return this.http.delete('http://localhost:8080/api/artist/delete/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getArtists() {
    return this.http.get<Artist[]>('http://localhost:8080/api/artist/get/all', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getArtist(id: number) {
    return this.http.get<Artist>('http://localhost:8080/api/artist/get/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}
