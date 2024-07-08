import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Gif} from "../../models/Gif";

@Injectable({
  providedIn: 'root'
})
export class GifService {
  tenorKey: string = " AIzaSyB2mAvrM-f9yduZfFsVgysJnX5ATx1zon0"

  constructor(
    private http: HttpClient
  ) {
  }

  public searchGif(searchString: string): Observable<Gif> {
    return this.http.get<Gif>(`https://tenor.googleapis.com/v2/search?q=${searchString}&key=${this.tenorKey}&client_key=my_test_app&limit=8`)
  }
}
