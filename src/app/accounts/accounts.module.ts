import {NgModule} from '@angular/core';
import {AccountsComponent} from './accounts.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AccountsRoutingModule} from './accounts-routing.module';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {AccountsContainerComponent} from './accounts-container/accounts-container.component';

@NgModule({
  declarations: [
    AccountsComponent,
    SignupComponent,
    LoginComponent,
    ErrorPageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AccountsContainerComponent
  ],
  imports: [ReactiveFormsModule, CommonModule, AccountsRoutingModule]
})
export class AccountsModule {
}
