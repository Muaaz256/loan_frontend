import {NgModule} from '@angular/core';
import {AccountsComponent} from './accounts.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AccountsRoutingModule} from './accounts-routing.module';

@NgModule({
  declarations: [
    AccountsComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [RouterModule, ReactiveFormsModule, CommonModule, AccountsRoutingModule],
  exports: [
    AccountsComponent,
    SignupComponent,
    LoginComponent
  ]
})
export class AccountsModule {
}
