import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from "@angular/core";

export const loginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const token: string | null = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    inject(Router).navigate(['']);
    return false;
  }
};
