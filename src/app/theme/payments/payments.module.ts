import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PaymentsRoutingModule} from './payments-routing.module';
import {PaymentsComponent} from './payments.component';
import {PaymentsListComponent} from './payments-list/payments-list.component';
import {AddEditPaymentComponent} from './add-edit-payment/add-edit-payment.component';

@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentsListComponent,
    AddEditPaymentComponent
  ],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, PaymentsRoutingModule]
})
export class PaymentsModule {

}
