import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payment, PaymentSearchParams} from '../../../models/loaner.model';
import {PaymentsService} from '../../../services/payments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubSink} from 'subsink';
import {OPERATORS} from '../../../shared/enums';
import {getSelectOptionsForDateAndNumbers} from '../../../shared/utils';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css']
})
export class PaymentsListComponent implements OnInit, OnDestroy {

  payments: Payment [];
  totalPayable: number;
  totalPaid: number;

  directVisitor: { id: number; name: string; } = null;
  loanerQueryParam: string = null;

  searchParams: PaymentSearchParams = {
    loanerId: {
      value: '',
      lookup: OPERATORS.EXACT
    },
    loanerName: {
      value: '',
      lookup: OPERATORS.ICONTAINS
    },
    paymentAmount: {
      value: '',
      lookup: OPERATORS.EXACT
    },
    paymentDate: {
      value: '',
      lookup: OPERATORS.EXACT
    },
    paymentType: {
      value: this.paymentsService.PAYMENT_TYPES.ALL,
      lookup: OPERATORS.EXACT
    }
  };

  isReady = true;
  loadingMessage = 'Loading Payments...';

  errors = false;

  dateFilterOptions = [];
  numberFilterOptions = [];
  paymentTypesOptions = [];
  paymentTypes = {};

  private subs = new SubSink();

  constructor(
    private paymentsService: PaymentsService, private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.dateFilterOptions = getSelectOptionsForDateAndNumbers('date');
    this.numberFilterOptions = getSelectOptionsForDateAndNumbers('number');
    this.paymentTypesOptions = this.paymentsService.paymentSelectValues;
    this.paymentTypes = this.paymentsService.PAYMENT_TYPES;
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.loanerQueryParam = queryParams.loaner || null;
      if (!this.loanerQueryParam) {
        this.directVisitor = null;
        this.searchParams.loanerId.value = '';
        this.loadPayments(this.searchParams);
      } else {
        this.subs.sink = this.activatedRoute.data.subscribe(
          routeData => {
            this.directVisitor = routeData.loaner;
            this.searchParams.loanerId.value = this.directVisitor?.id || '';
            this.loadPayments(this.searchParams);
          }
        );
      }
    });
  }

  loadPayments(searchParams: PaymentSearchParams, reload = true): void {
    if (reload) {
      this.isReady = false;
      this.loadingMessage = 'Loading Payments...';
    }
    this.subs.sink = this.paymentsService.getPaymentsList(searchParams).subscribe(
      response => {
        this.payments = response.payments;
        this.totalPaid = response.paidAmount;
        this.totalPayable = response.payableAmount;
        this.errors = false;
        this.isReady = true;
      },
      () => {
        this.errors = true;
        this.isReady = true;
      }
    );
  }

  onFilter(): void {
    if (this.searchParams.paymentAmount.value === null) {
      this.searchParams.paymentAmount.value = '';
    }
    this.loadPayments(this.searchParams, false);
  }

  onDeletePayment(paymentId: number): void {
    const deleteFlag = confirm(`Are you sure that you want to delete the selected payment?`);
    if (deleteFlag) {
      this.subs.sink = this.paymentsService.deletePayment(paymentId).subscribe(
        () => {
          alert('The payment has been deleted successfully.');
          this.loadPayments(this.searchParams, false);
        },
        () => {
          alert('An unknown error occurred while deleting the payment.');
        }
      );
    }
  }

  onAddOrEditPayment(paymentId: number): void {
    const routeCommands = paymentId ? ['edit', paymentId] : ['add'];
    let queryParams = {};
    if (this.loanerQueryParam) {
      queryParams = {
        loaner: this.loanerQueryParam
      };
    }
    this.router.navigate(
      routeCommands,
      {relativeTo: this.activatedRoute, queryParams}
    );
  }

  pinPaymentToDashboard(paymentId: number): void {
    this.subs.sink = this.paymentsService.pinPaymentToDashboard(paymentId).subscribe(
      response => {
        const pinnedPayment = this.payments.find(payment => payment.id === paymentId);
        pinnedPayment.isPinned = !pinnedPayment.isPinned;
      },
      () => {
        this.errors = true;
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
