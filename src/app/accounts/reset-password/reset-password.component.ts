import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services';
import {SubSink} from 'subsink';
import {FormBuilder, Validators} from '@angular/forms';
import {showOrHidePassword} from '../../shared/utils';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  linkToken: string;
  linkValid = false;

  resetPasswordFormGroup = this.formBuilder.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  newPasswordShown = false;
  confirmPasswordShown = false;
  showPasswordHandler = showOrHidePassword;

  isReady = true;
  loadingMessage = 'Loading';

  errorMessage = null;
  resetPasswordFailed = false;
  resetPasswordSuccess = false;

  private subs = new SubSink();

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private authService: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.isReady = false;
    this.linkToken = this.activatedRoute.snapshot.params.token;
    this.subs.sink = this.authService.verifyLinkToken(this.linkToken)
      .subscribe(() => {
        this.linkValid = true;
        this.isReady = true;
      }, () => {
        this.router.navigate(['/notfound']);
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onResetPassword(): void {
    this.isReady = false;
    this.loadingMessage = 'Changing Your Password...';
    if (this.resetPasswordFormGroup.valid) {
      const formValues = this.resetPasswordFormGroup.value;
      if (formValues.newPassword === formValues.confirmPassword) {
        this.subs.sink = this.authService.resetPassword(this.linkToken, formValues.newPassword)
          .subscribe(
            () => {
              this.resetPasswordSuccess = true;
              this.errorMessage = null;
              this.isReady = true;
            },
            () => {
              this.resetPasswordFailed = true;
              this.isReady = true;
            }
          );
      } else {
        this.errorMessage = 'The two passwords do not match.';
        this.isReady = true;
      }
    } else {
      this.errorMessage = 'Please, fill the both input fields.';
      this.isReady = true;
    }
  }
}
