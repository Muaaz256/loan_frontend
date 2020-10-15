import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsComponent} from './accounts.component';
import {AccountsGuardGuard} from '../route-guards';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ErrorPageComponent} from './error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    canActivate: [AccountsGuardGuard],
    children: [
      {path: 'register', component: SignupComponent},
      {path: 'login', component: LoginComponent},
      {path: 'error-page', component: ErrorPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {
}
