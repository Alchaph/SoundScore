import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {LoaderService} from "../services/LoaderService/loader.service";
import {inject} from "@angular/core";

export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const loaderService = inject(LoaderService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case 401:
              alert('Passowrd or Username is incorrect');
              break;
          }
        }
        loaderService.hide();
        return new Observable<HttpEvent<any>>();
      }
    ));
}
