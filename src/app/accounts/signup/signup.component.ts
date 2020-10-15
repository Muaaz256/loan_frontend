import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SubSink} from 'subsink';
import {AuthService} from '../../services';
import {showOrHidePassword} from '../../shared/utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnDestroy {

  registerFormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.email],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    password: ['', Validators.required]
  });
  errorMessage = null;

  isReady = true;
  loadingMessage = 'Loading...';

  registerSuccess = false;

  passwordFieldShown = false;
  confirmPasswordFieldShown = false;

  showPasswordsHandler = showOrHidePassword;

  private subs = new SubSink();


  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  handleRegister(): void {
    this.isReady = false;
    this.loadingMessage = 'Registering...';
    if (this.registerFormGroup.valid) {
      if (this.registerFormGroup.value.confirmPassword !== this.registerFormGroup.value.password) {
        this.errorMessage = 'Passwords do not match.';
        this.isReady = true;
      } else {
        const userObj = this.registerFormGroup.value;
        this.subs.sink = this.authService.register(
          userObj
        ).subscribe(() => {
          this.errorMessage = null;
          this.registerSuccess = true;
          this.isReady = true;
        }, errors => {
          this.errorMessage = errors;
          this.isReady = true;
        });
      }
    } else if (this.registerFormGroup.controls.email.invalid) {
      this.errorMessage = 'Email is in wrong format.';
      this.isReady = true;
    } else {
      this.errorMessage = 'You have missed some required field.';
      this.isReady = true;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
