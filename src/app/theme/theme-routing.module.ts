import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThemeComponent} from './theme.component';
import {AuthGuard} from '../route-guards';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {EditProfileComponent} from './profile/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {
        path: 'loaners',
        loadChildren: () => import('./loaners/loaners.module').then(m => m.LoanersModule)
      },
      {
        path: 'profile', children: [
          {path: '', component: ProfileComponent},
          {path: 'edit', component: EditProfileComponent}
        ],
      },
      {
        path: 'security',
        loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {
}
