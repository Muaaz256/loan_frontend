import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ThemeComponent} from './theme/theme.component';
import {DashboardComponent} from './theme/dashboard/dashboard.component';
import {LoanersComponent} from './theme/loaners/loaners.component';
import {ProfileComponent} from './theme/profile/profile.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard, VisitLoginGuard} from './route-guards';
import {EditProfileComponent} from './theme/profile/edit-profile/edit-profile.component';


const routes: Routes = [
  {path: 'register', component: SignupComponent},
  {path: 'login', component: LoginComponent, canActivate: [VisitLoginGuard]},
  {
    path: 'user',
    component: ThemeComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'loaners', component: LoanersComponent},
      {
        path: 'profile', children: [
          {path: '', component: ProfileComponent},
          {path: 'edit', component: EditProfileComponent}
        ],
      }
    ]
  },
  {path: '', redirectTo: 'user/dashboard', pathMatch: 'full'},
  {path: 'notfound', component: NotFoundComponent},
  {path: '**', redirectTo: 'notfound'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
