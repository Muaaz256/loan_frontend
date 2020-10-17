import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject, throwError} from 'rxjs';
import {UserFormInterface, UserInterface} from '../interfaces';
import {catchError, map} from 'rxjs/operators';
import {User} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
      'users/register/', userBody
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
      'auth/login/', {username, password}
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
      'auth/logout/', null
    ).pipe(map((response) => {
      localStorage.removeItem('auth_token');
      return response;
    }));
  }

  me(): Observable<User> {
    if (!!this.user) {
      return of(this.user);
    }
    return this.http.get<UserInterface>('users/me/').pipe<User>(map(res => {
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
      'users/edit_me/', userBody
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

  changePassword(passwordValues: {
    currentPassword: string; newPassword: string
  }): Observable<null> {
    const changePasswordBody: {
      current_password: string;
      new_password: string
    } = {
      current_password: passwordValues.currentPassword,
      new_password: passwordValues.newPassword
    };
    return this.http.put<null>(
      'auth/change_password/',
      changePasswordBody
    ).pipe(catchError(errors => {
      const responseError = errors.error;
      if (responseError.current_password) {
        return throwError(responseError.current_password[0]);
      }
      return throwError('Unknown error occurred.');
    }));
  }

  deleteMyAccount(): Observable<null> {
    return this.http.delete<null>(
      'users/delete_me/'
    );
  }

  verifyUsername(username: string): Observable<{ email: string | null }> {
    return this.http.get<{ email: string | null }>(
      'auth/verify_username/',
      {
        params: {username}
      }
    ).pipe(catchError(errors => {
      const responseError = errors.error;
      if (responseError.errors) {
        return throwError(responseError.errors[0]);
      }
      return throwError('Unknown error occurred.');
    }));
  }

  sendLinkToMail(username: string, email: string): Observable<null> {
    return this.http.post<null>(
      'auth/send_link/',
      {
        username, email
      }
    );
  }

  verifyLinkToken(linkToken: string): Observable<null> {
    return this.http.get<null>(
      'auth/verify_reset_password_link/',
      {
        params: {
          link_token: linkToken
        }
      }
    );
  }

  resetPassword(linkToken: string, newPassword: string): Observable<null> {
    return this.http.put<null>(
      'auth/reset_password/',
      {
        link_token: linkToken,
        new_password: newPassword
      }
    );
  }
}
