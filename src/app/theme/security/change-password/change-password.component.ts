import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {showOrHidePassword} from '../../../shared/utils';
import {AuthService} from '../../../services';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnDestroy {

  changePasswordFormGroup = this.formBuilder.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  errorMessage = null;

  isReady = true;
  loadingMessage = 'Changing Password...';

  passwordChangedSuccess = false;

  currentPasswordShown = false;
  newPasswordShown = false;
  confirmNewPasswordShown = false;
  showPasswordHandler = showOrHidePassword;

  private subs = new SubSink();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  onChangePassword(): void {
    this.isReady = false;
    if (this.changePasswordFormGroup.valid) {
      const formValues = this.changePasswordFormGroup.value;
      if (formValues.newPassword !== formValues.confirmPassword) {
        this.errorMessage = 'The two new passwords do not match.';
        this.isReady = true;
      } else {
        this.subs.sink = this.authService.changePassword(formValues).subscribe(
          () => {
            this.errorMessage = null;
            this.passwordChangedSuccess = true;
            this.isReady = true;
          }, errors => {
            this.errorMessage = errors;
            this.isReady = true;
          }
        );
      }
    } else {
      this.errorMessage = 'You have missed some required field.';
      this.isReady = true;
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
