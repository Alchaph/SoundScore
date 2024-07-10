import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  getHttpOptions(): { headers: { Authorization: string; }; } | { headers: {}; } {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    } else {
      return {
        headers: {}
      };
    }
  }
}
