import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Loaner} from '../models/loaner.model';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanersService {

  END_POINT = 'loans/loaners/';

  constructor(private http: HttpClient) {
  }

  getAllLoaners(): Observable<Loaner []> {
    return this.http.get<Loaner []>(this.END_POINT).pipe(
      catchError(errors => {
        return throwError('Error Occurred');
      })
    );
  }

  createOrEditLoaner(loaner: Loaner, edit = false): Observable<Loaner> {
    let request = this.http.post<Loaner>(this.END_POINT, loaner);
    if (edit) {
      request = this.http.patch<Loaner>(`${this.END_POINT}${loaner.id}/`, loaner);
    }
    return request.pipe(
      catchError(errors => {
        return throwError('An unknown error occurred.');
      })
    );
  }

  getLoanerDetails(loanerId: number): Observable<Loaner> {
    return this.http.get<Loaner>(`${this.END_POINT}${loanerId}/`).pipe(
      catchError(errors => {
        return throwError('An unknown error occurred.');
      })
    );
  }

  deleteLoaner(loanerId: number): Observable<null> {
    return this.http.delete<null>(`${this.END_POINT}${loanerId}/`).pipe(
      catchError(errors => {
        return throwError('An unknown error occurred.');
      })
    );
  }
}
