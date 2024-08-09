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
    console.log(message);
    this.message.next(message);
    this.isMessage.next(true);
    console.log(this.message.value);
    console.log(this.isMessage);
    console.log(this.isMessage.value);
    console.log(this.isMessage.getValue());
  }

  getMessage() {
    return this.message.asObservable();
  }
}
