import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import * as cryptoJS from 'crypto-js';
import {CIPHER_KEY} from '../shared/constants';
import {LoanersService} from '../services/loaners.service';
import {catchError, map} from 'rxjs/operators';

interface LoanerData {
  id: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class PaymentsGuard implements CanActivateChild, Resolve<LoanerData> {

  loaner: LoanerData = null;

  constructor(private router: Router, private loanersService: LoanersService) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    const hasLoaner = childRoute.queryParams.hasOwnProperty('loaner');
    if (hasLoaner) {
      const loanerId = cryptoJS.AES.decrypt(childRoute.queryParams.loaner, CIPHER_KEY).toString(cryptoJS.enc.Utf8);
      if (loanerId) {
        return this.loanersService.getLoanerDetails(loanerId).pipe(
          map(
            response => {
              this.loaner = {
                id: response.id,
                name: response.name
              };
              return true;
            }
          ),
          catchError(
            () => {
              this.router.navigate(['/notfound']);
              return throwError(false);
            }
          )
        );
      } else {
        this.router.navigate(['/notfound']);
      }
    }
    this.loaner = null;
    return true;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<LoanerData | null> | Promise<LoanerData | null> | LoanerData | null {
    return this.loaner;
  }
}
