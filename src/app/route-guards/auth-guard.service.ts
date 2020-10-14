import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../services';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('auth_token')) {
      return this.authService.me().pipe(map((response) => {
        return true;
      }), catchError((errors) => {
        localStorage.removeItem('auth_token');
        this.router.navigate(['/login']);
        return throwError(false);
      }));
    } else {
      this.router.navigate(['/login']);
    }
  }
}
