import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Genre} from "../../models/Genre";
import {Observable} from "rxjs";
import {Artist} from "../../models/Artist";
import {environment} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) {
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(environment.url + '/genres/all', environment.options);
  }
}
