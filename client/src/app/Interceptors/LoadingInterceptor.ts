import {HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { inject } from '@angular/core';
import { LoaderService } from '../services/LoaderService/loader.service';

export const LoadingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const loaderService = inject(LoaderService);
  if (!req.url.includes('https://tenor.googleapis.com/v2/search')) {
    loaderService.show();
  }
  return next(req).pipe(
    finalize(() => {
      if (!req.url.includes('https://tenor.googleapis.com/v2/search')) {
        loaderService.hide();
      }
    })
  );
};
