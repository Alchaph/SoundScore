import { CanActivateFn, Router } from '@angular/router';
import {inject} from "@angular/core";



export const loginGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token')  && localStorage.getItem('token') !== "") {
    return true;
  } else {
    inject(Router).navigate(['']);
    return false;
  }
};
