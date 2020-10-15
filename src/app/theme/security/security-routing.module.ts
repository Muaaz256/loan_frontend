import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecurityComponent} from './security.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {DeleteAccountComponent} from './delete-account/delete-account.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      {path: 'change-password', component: ChangePasswordComponent},
      {path: 'delete-account', component: DeleteAccountComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SecurityRoutingModule {
}
