import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsComponent} from './accounts.component';
import {AccountsGuardGuard} from '../route-guards';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    canActivate: [AccountsGuardGuard],
    children: [
      {path: 'register', component: SignupComponent},
      {path: 'login', component: LoginComponent},
      {path: 'error-page', component: ErrorPageComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password/:token', component: ResetPasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {
}
