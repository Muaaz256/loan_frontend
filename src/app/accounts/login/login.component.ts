import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {showOrHidePassword} from '../../shared/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  loginFormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  errorMessage = null;

  isReady = true;
  loadingMessage = 'Loading...';

  passwordShown = false;
  showPasswordHandler = showOrHidePassword;

  private subs = new SubSink();

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router) {
  }

  handleLogin(): void {
    this.isReady = false;
    this.loadingMessage = 'Logging In...';
    if (this.loginFormGroup.valid) {
      const loginBody = this.loginFormGroup.value;
      this.subs.sink = this.authService.login(
        loginBody.username,
        loginBody.password
      ).subscribe(() => {
        this.router.navigate(['/user/dashboard']);
        this.errorMessage = null;
        this.isReady = true;
      }, errors => {
        this.errorMessage = errors;
        this.isReady = true;
      });
    } else {
      this.errorMessage = 'You have missed some required field.';
      this.isReady = true;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
