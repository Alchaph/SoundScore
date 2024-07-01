import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private requestsActive = 0;
  public isLoading = new BehaviorSubject(false);

  show() {
    if (this.requestsActive === 0) {
      this.isLoading.next(true);
    }
    this.requestsActive++;
  }

  hide() {
    this.requestsActive--;
    if (this.requestsActive === 0) {
      this.isLoading.next(false);
    }
  }

  getIsLoading():Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
