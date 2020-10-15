import {NgModule} from '@angular/core';
import {SecurityComponent} from './security.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SecurityRoutingModule} from './security-routing.module';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {DeleteAccountComponent} from './delete-account/delete-account.component';

@NgModule({
  declarations: [
    SecurityComponent,
    ChangePasswordComponent,
    DeleteAccountComponent
  ],
  imports: [ReactiveFormsModule, CommonModule, SecurityRoutingModule]
})
export class SecurityModule {

}
