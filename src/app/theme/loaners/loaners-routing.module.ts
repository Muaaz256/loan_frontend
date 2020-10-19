import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoanersComponent} from './loaners.component';
import {LoanersListComponent} from './loaners-list/loaners-list.component';
import {AddEditLoanerComponent} from './add-edit-loaner/add-edit-loaner.component';
import {LoanerDetailComponent} from './loaner-detail/loaner-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LoanersComponent,
    children: [
      {path: '', component: LoanersListComponent},
      {path: 'add', component: AddEditLoanerComponent},
      {path: 'edit/:loanerId', component: AddEditLoanerComponent},
      {path: 'detail/:loanerId', component: LoanerDetailComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanersRoutingModule {

}
