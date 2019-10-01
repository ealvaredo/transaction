import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      console.log("probando" + sessionStorage.getItem('username') + sessionStorage.getItem('token'));

      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      })
      return next.handle(req).pipe(catchError((error, caught) => {
        //intercept the respons error and displace it to the console
        console.log(error);
        this.handleAuthError(error);
        return of(error);
      }) as any);
    }
    else {
      return next.handle(req);
    }
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {
      //navigate /delete cookies or whatever
      console.log('handled error ' + err.message);
      this.router.navigate(['']);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
    throw err;
  }

}