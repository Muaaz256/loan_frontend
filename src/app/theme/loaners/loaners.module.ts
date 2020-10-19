import {NgModule} from '@angular/core';
import {LoanersListComponent} from './loaners-list/loaners-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoanersRoutingModule} from './loaners-routing.module';
import {AddEditLoanerComponent} from './add-edit-loaner/add-edit-loaner.component';
import {LoanerDetailComponent} from './loaner-detail/loaner-detail.component';

@NgModule({
  declarations: [
    LoanersListComponent,
    AddEditLoanerComponent,
    LoanerDetailComponent
  ],
  imports: [ReactiveFormsModule, CommonModule, LoanersRoutingModule]
})
export class LoanersModule {

}
