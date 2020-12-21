import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentsComponent} from './payments.component';
import {PaymentsListComponent} from './payments-list/payments-list.component';
import {AddEditPaymentComponent} from './add-edit-payment/add-edit-payment.component';
import {PaymentsGuard} from '../../route-guards/payment-loaner-guards.service';

const routes: Routes = [
  {
    path: '',
    component: PaymentsComponent,
    canActivateChild: [PaymentsGuard],
    children: [
      {path: '', component: PaymentsListComponent, resolve: {loaner: PaymentsGuard}},
      {path: 'add', component: AddEditPaymentComponent, resolve: {loaner: PaymentsGuard}},
      {path: 'edit/:paymentId', component: AddEditPaymentComponent, resolve: {loaner: PaymentsGuard}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule {

}
