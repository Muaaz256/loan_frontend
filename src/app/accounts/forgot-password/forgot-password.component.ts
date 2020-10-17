import {Component, OnDestroy} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnDestroy {

  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  alreadyHasEmail: boolean;
  currentEmail: string;

  PROCESS_PHASES = {
    VERIFY_USERNAME: 'verify-username',
    SEND_EMAIL: 'send-email',
    SUCCESS: 'success',
    ERROR: 'error'
  };

  currentPhase = this.PROCESS_PHASES.VERIFY_USERNAME;

  isReady = true;
  loadingMessage = 'Loading...';
  errorMessage = null;

  private subs = new SubSink();

  constructor(private authService: AuthService) {
  }

  onVerifyUsername(): void {
    this.isReady = false;
    this.loadingMessage = 'Verifying Username...';
    if (this.username.valid) {
      this.subs.sink = this.authService.verifyUsername(this.username.value)
        .subscribe((response) => {
          this.email.setValue(response.email);
          this.alreadyHasEmail = !!response.email;
          this.currentEmail = response.email;
          this.errorMessage = null;
          this.currentPhase = this.PROCESS_PHASES.SEND_EMAIL;
          this.isReady = true;
        }, errors => {
          this.errorMessage = errors;
          this.isReady = true;
        });
    } else {
      this.errorMessage = 'Please, enter the username.';
      this.isReady = true;
    }
  }

  onSendEmail(): void {
    this.isReady = false;
    this.loadingMessage = 'Sending Link to Email...';
    if (this.email.valid) {
      this.subs.sink = this.authService.sendLinkToMail(this.username.value, this.email.value)
        .subscribe(
          () => {
            this.currentPhase = this.PROCESS_PHASES.SUCCESS;
            this.errorMessage = null;
            this.isReady = true;
          }, errors => {
            this.currentPhase = this.PROCESS_PHASES.ERROR;
            this.errorMessage = null;
            this.isReady = true;
          }
        );
    } else {
      this.errorMessage = 'You have either not entered the email or entered an incorrect one.';
      this.isReady = true;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
