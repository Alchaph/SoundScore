import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  isMessage = new BehaviorSubject(false);

  message = new BehaviorSubject<string>('');


  constructor() { }

  hide() {
    this.isMessage.next(false);
  }

  getIsMessage() {
    return this.isMessage;
  }

  setMessage(message: string) {
    this.message.next(message);
    this.isMessage.next(true);
  }

  getMessage() {
    return this.message.asObservable();
  }
}
