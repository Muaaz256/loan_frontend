import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NotFoundComponent} from './not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {ThemeComponent} from './theme/theme.component';
import {DashboardComponent} from './theme/dashboard/dashboard.component';
import {LoanersComponent} from './theme/loaners/loaners.component';
import {ProfileComponent} from './theme/profile/profile.component';
import {AppRoutingModule} from './app-routing.module';
import {EditProfileComponent} from './theme/profile/edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ThemeComponent,
    DashboardComponent,
    LoanersComponent,
    ProfileComponent,
    EditProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
