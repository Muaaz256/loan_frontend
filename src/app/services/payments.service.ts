import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {PaymentInterface} from '../interfaces/loans';
import {catchError, map} from 'rxjs/operators';
import {Payment, PaymentSearchParams} from '../models/loaner.model';
import {getFilterLookupExpressions} from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  END_POINT = 'loans/payments/';

  PAYMENT_TYPES = {
    PAID: 'paid',
    RECEIVED: 'received',
    ALL: ''
  };

  paymentSelectValues = [
    {
      value: '',
      label: 'All'
    },
    {
      value: this.PAYMENT_TYPES.PAID,
      label: 'Paid'
    },
    {
      value: this.PAYMENT_TYPES.RECEIVED,
      label: 'Received'
    }
  ];

  constructor(private http: HttpClient) {
  }

  interfaceToModel(payment: PaymentInterface): Payment {
    return {
      id: payment.id,
      loaner: payment.loaner,
      paymentAmount: payment.payment_amount,
      paymentDate: payment.payment_date,
      paymentType: payment.payment_type,
      isPinned: payment.is_pinned
    };
  }

  modelToInterface(payment: Payment): PaymentInterface {
    return {
      id: payment.id,
      payment_date: payment.paymentDate,
      payment_type: payment.paymentType,
      payment_amount: payment.paymentAmount,
      loaner: payment.loaner,
      is_pinned: payment.isPinned
    };
  }

  getPaymentsList(searchParams: PaymentSearchParams):
    Observable<{ payableAmount: number; payments: Payment[]; paidAmount: number }> {
    const paramsMapping = {
      loanerId: 'loaner_id',
      loanerName: 'loaner__name',
      paymentType: 'payment_type',
      paymentAmount: 'payment_amount',
      paymentDate: 'payment_date',
    };
    const searchLookupParams = getFilterLookupExpressions(searchParams, paramsMapping);
    return this.http.get<{ received_amount: number; paid_amount: number; payments: PaymentInterface [] }>(
      this.END_POINT,
      {
        params: searchLookupParams
      }
    ).pipe(
      map(response => {
        return {
          paidAmount: response.paid_amount,
          payableAmount: response.received_amount,
          payments: response.payments.map(
            (p): Payment => {
              return this.interfaceToModel(p);
            }
          )
        };
      }),
      catchError(() => {
        return throwError('An unknown error occurred.');
      })
    );
  }

  createOrEditPayment(paymentBody: Payment, edit = false): Observable<Payment> {
    const payment: PaymentInterface = this.modelToInterface(paymentBody);
    let request = this.http.post<PaymentInterface>(this.END_POINT, payment);
    if (edit) {
      request = this.http.patch<PaymentInterface>(`${this.END_POINT}${payment.id}/`, payment);
    }
    return request.pipe(
      map(response => {
        return this.interfaceToModel(response);
      }),
      catchError(errors => {
        const responseError = errors.error;
        if (responseError.payment_amount) {
          return throwError(
            `There is an error in payment amount. ${responseError.payment_amount[0]}`
          );
        }
        return throwError('An unknown error occurred.');
      })
    );
  }

  getPaymentDetails(paymentId: number): Observable<Payment> {
    return this.http.get<PaymentInterface>(`${this.END_POINT}${paymentId}/`).pipe(
      map(response => {
        return this.interfaceToModel(response);
      }),
      catchError(() => {
        return throwError('An unknown error occurred.');
      })
    );
  }

  deletePayment(paymentId: number): Observable<null> {
    return this.http.delete<null>(`${this.END_POINT}${paymentId}/`).pipe(
      catchError(() => {
        return throwError('An unknown error occurred.');
      })
    );
  }

  pinPaymentToDashboard(paymentId: number): Observable<boolean> {
    return this.http.patch(
      `${this.END_POINT}${paymentId}/pin_to_dashboard/`, {}
    ).pipe(
      map(response => true),
      catchError(() => throwError('An unknown error occurred.'))
    );
  }
}
