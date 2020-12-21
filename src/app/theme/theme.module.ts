import {NgModule} from '@angular/core';
import {ThemeComponent} from './theme.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {EditProfileComponent} from './profile/edit-profile/edit-profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ThemeRoutingModule} from './theme-routing.module';

@NgModule({
  declarations: [
    ThemeComponent,
    DashboardComponent,
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [ReactiveFormsModule, CommonModule, ThemeRoutingModule]
})
export class ThemeModule {
}
