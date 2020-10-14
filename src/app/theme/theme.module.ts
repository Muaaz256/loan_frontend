import {NgModule} from '@angular/core';
import {ThemeComponent} from './theme.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoanersComponent} from './loaners/loaners.component';
import {ProfileComponent} from './profile/profile.component';
import {EditProfileComponent} from './profile/edit-profile/edit-profile.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ThemeRoutingModule} from './theme-routing.module';

@NgModule({
  declarations: [
    ThemeComponent,
    DashboardComponent,
    LoanersComponent,
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [RouterModule, ReactiveFormsModule, CommonModule, ThemeRoutingModule],
  exports: [
    ThemeComponent,
    DashboardComponent,
    LoanersComponent,
    ProfileComponent,
    EditProfileComponent,
  ]
})
export class ThemeModule {
}
