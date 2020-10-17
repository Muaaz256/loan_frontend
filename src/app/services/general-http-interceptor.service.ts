import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class GeneralHttpInterceptorService implements HttpInterceptor {


  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const endPointDomain = 'http://localhost:8000';
    const newProperties: {
      url: string;
      setHeaders?: any
    } = {
      url: `${endPointDomain}/${req.url}`
    };
    if (localStorage.getItem('auth_token')) {
      newProperties.setHeaders = {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      };
    }
    const newReq = req.clone(newProperties);
    return next.handle(newReq).pipe(
      catchError(errors => {
          if ([403, 0, 500].includes(errors.status)) {
            localStorage.removeItem('auth_token');
            this.router.navigate(['/accounts/error-page']);
          }
          return throwError(errors);
        }
      )
    );
  }
}
