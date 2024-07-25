import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {inject} from '@angular/core';
import {LoaderService} from '../services/LoaderService/loader.service';

export const LoadingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  if (req.method !== 'DELETE') {
    const loaderService: LoaderService = inject(LoaderService);
    timer(1000).subscribe(() => {
      if (!req.url.includes('https://tenor.googleapis.com/v2/search')) {
        loaderService.show();
      }
    });
    return next(req).pipe(
      finalize(() => {
        if (!req.url.includes('https://tenor.googleapis.com/v2/search')) {
          loaderService.hide();
        }
      })
    );
  } else {
    return next(req);
  }
};
