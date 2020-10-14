import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject, throwError} from 'rxjs';
import {UserFormInterface, UserInterface} from '../../interfaces';
import {catchError, map} from 'rxjs/operators';
import {User} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endPointDomain = 'http://localhost:8000';
  user: User;
  userUpdated = new Subject<User>();

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<UserInterface> {
    const userBody: UserFormInterface = {
      username: user.username,
      password: user.password,
      first_name: user.firstname,
      last_name: user.lastname,
      email: user.email
    };
    return this.http.post<UserInterface>(
      `${this.endPointDomain}/users/register/`, userBody
    ).pipe(catchError(errors => {
      const responseError = errors.error;
      if (responseError.username) {
        return throwError(responseError.username[0]);
      }
      return throwError('Unknown error occurred.');
    }));
  }

  login(username: string, password: string): Observable<{ token: string; user: UserInterface }> {
    return this.http.post<{ token: string; user: UserInterface }>(
      `${this.endPointDomain}/auth/login/`, {username, password}
    ).pipe(
      map(response => {
        const userData = response.user;
        this.user = {
          id: userData.id,
          username: userData.username,
          firstname: userData.first_name,
          lastname: userData.last_name,
          email: userData.email
        };
        localStorage.setItem('auth_token', response.token);
        return response;
      }),
      catchError(errors => {
        const responseError = errors.error;
        if (responseError.errors) {
          return throwError(responseError.errors[0]);
        }
        return throwError('An unknown error occurred.');
      }));
  }

  logout(): Observable<null> {
    return this.http.post<null>(
      `${this.endPointDomain}/auth/logout/`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      }
    ).pipe(map((response) => {
      localStorage.removeItem('auth_token');
      return response;
    }));
  }

  me(): Observable<User> {
    if (!!this.user) {
      return of(this.user);
    }
    return this.http.get<UserInterface>(
      `${this.endPointDomain}/users/me/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      }
    ).pipe<User>(map(res => {
      this.user = {
        id: res.id,
        username: res.username,
        firstname: res.first_name,
        lastname: res.last_name,
        email: res.email
      };
      return this.user;
    }));
  }

  editMe(user: User): Observable<boolean> {
    const userBody: UserFormInterface = {
      username: user.username,
      first_name: user.firstname,
      last_name: user.lastname,
      email: user.email
    };
    return this.http.patch<UserInterface>(
      `${this.endPointDomain}/users/edit_me/`,
      userBody,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      }
    ).pipe(map(response => {
      this.user = {
        id: response.id,
        username: response.username,
        firstname: response.first_name,
        lastname: response.last_name,
        email: response.email
      };
      this.userUpdated.next(this.user);
      return true;
    }), catchError(errors => {
      const responseError = errors.error;
      if (responseError.username) {
        return throwError(responseError.username[0]);
      }
      return throwError('Unknown error occurred.');
    }));
  }
}
