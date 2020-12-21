import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Dashboard, PinnedPayment} from '../models/dashboard.model';
import {DashboardInterface} from '../interfaces/dashboard';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  getDashboardData(): Observable<Dashboard> {
    return this.http.get<DashboardInterface>(
      'dashboard/'
    ).pipe(
      map(
        response => {
          const pinnedPayments: PinnedPayment [] = response.pinned_payments.map(
            payment => {
              return {
                id: payment.id,
                type: payment.payment_type,
                paymentAmount: payment.payment_amount,
                paymentDate: payment.payment_date,
                paymentLoaner: payment.payment_loaner
              };
            }
          );
          return {
            totalPaid: response.received || 0,
            totalPayable: response.paid || 0,
            paymentsDifference: response.payments_difference,
            pinnedPayments
          };
        }
      ),
      catchError(
        () => {
          return throwError('An unknown error occurred.');
        }
      )
    );
  }
}
