import { CanActivateFn, Router } from '@angular/router';
import {inject} from "@angular/core";
import {Token} from "@angular/compiler";



export const loginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    inject(Router).navigate(['']);
    return false;
  }
};
