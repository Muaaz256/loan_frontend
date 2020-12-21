import {NgModule} from '@angular/core';
import {LoanersListComponent} from './loaners-list/loaners-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoanersRoutingModule} from './loaners-routing.module';
import {AddEditLoanerComponent} from './add-edit-loaner/add-edit-loaner.component';
import {LoanerDetailComponent} from './loaner-detail/loaner-detail.component';
import {LoanersComponent} from './loaners.component';

@NgModule({
  declarations: [
    LoanersComponent,
    LoanersListComponent,
    AddEditLoanerComponent,
    LoanerDetailComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LoanersRoutingModule
  ]
})
export class LoanersModule {

}
