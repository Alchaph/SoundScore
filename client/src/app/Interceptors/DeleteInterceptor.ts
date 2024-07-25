import {inject} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, Observable, of, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../components/delete-dialog/delete-dialog.component';

export const DeleteInterceptor: (req: HttpRequest<any>, next: HttpHandlerFn) => Observable<HttpEvent<any>> = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const dialog: MatDialog = inject(MatDialog);
  const cancelSubject = new Subject<void>();
  if (req.method === 'DELETE') {


    // Return a new observable that waits for the user decision before proceeding
    return new Observable(observer => {
      // Open the undo dialog
      openUndoDialog(req.url);
      // Create an observable that will emit a value when the dialog is closed
      const dialogResponse$ = new Subject<'no' | 'yes'>();

      // Handle dialog response
      dialogResponse$.pipe(
        switchMap(result => {
          if (result === 'no') {
            cancelSubject.next();
            observer.complete();
            return of();
          } else {
            return next(req).pipe(
              tap(event => {
                if (event instanceof HttpResponse) {
                  observer.next(event);
                  observer.complete();
                }
              }),
              catchError((error: HttpErrorResponse) => {
                observer.error(error);
                return of();
              }),
              takeUntil(cancelSubject) // Cancel request if subject emits
            );
          }
        })
      ).subscribe();

      // Emit dialog result
      function openUndoDialog(url: string) {
        const dialogRef = dialog.open(DeleteDialogComponent, {
          data: url
        });
        dialogRef.afterClosed().subscribe(result => {
          dialogResponse$.next(result === 'no' ? 'no' : 'yes');
        });
      }
    });

  } else {
    // If not a DELETE request, just pass it through
    return next(req);
  }
};
