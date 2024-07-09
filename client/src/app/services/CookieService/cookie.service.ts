import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setCookie(name: string, value: string, expiresIn: number): void {
    const date: Date = new Date();
    date.setTime(date.getTime() + expiresIn);
    const expires: string = "; expires=" + date.toUTCString();
    this.document.cookie = `${name}=${value}${expires}; path=/;`;
  }

  getCookie(name: string): string | null {
    const cookies: string[] = this.document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie: string = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }
}
