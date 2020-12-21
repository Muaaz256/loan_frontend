import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsGuardGuard, AuthGuard} from './route-guards';


const routes: Routes = [
  {path: '', redirectTo: 'user/dashboard', pathMatch: 'full'},
  {
    path: 'accounts',
    canActivate: [AccountsGuardGuard],
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./theme/theme.module').then(m => m.ThemeModule)
  },
  {
    path: 'notfound',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {path: '**', redirectTo: 'notfound'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
