import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  isMessage = new BehaviorSubject(false);

  message = new BehaviorSubject<string>('');


  constructor() { }

  show() {
    this.isMessage.next(true);
  }

  hide() {
    this.isMessage.next(false);
  }

  getIsMessage() {
    return this.isMessage.asObservable();
  }

  setMessage(message: string) {
    this.message.next(message);
    this.isMessage.next(true);
  }

  getMessage() {
    return this.message.asObservable();
  }
}
