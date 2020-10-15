import {NgModule} from '@angular/core';
import {AccountsComponent} from './accounts.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AccountsRoutingModule} from './accounts-routing.module';
import {ErrorPageComponent} from './error-page/error-page.component';

@NgModule({
  declarations: [
    AccountsComponent,
    SignupComponent,
    LoginComponent,
    ErrorPageComponent
  ],
  imports: [ReactiveFormsModule, CommonModule, AccountsRoutingModule]
})
export class AccountsModule {
}
