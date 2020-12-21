import {Component, OnInit} from '@angular/core';
import {PaymentsService} from '../../../services/payments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubSink} from 'subsink';
import {Payment} from '../../../models/loaner.model';
import {LoanersService} from '../../../services/loaners.service';

@Component({
  selector: 'app-add-edit-payment',
  templateUrl: './add-edit-payment.component.html',
  styleUrls: ['./add-edit-payment.component.css']
})
export class AddEditPaymentComponent implements OnInit {
  paymentFormGroup: FormGroup;
  paymentId: number;

  directVisitor: { id: number; name: string; } = null;
  loanerQueryParam: string = null;

  isReady = true;
  loadingMessage = 'Loading...';

  errorMessage = null;
  processSuccess = false;

  paymentSelectOptions = [];
  paymentTypes = {};
  loanersSelectOptions: { id: number; name: string; } [] = [];

  title = 'Add Payment';
  private subs = new SubSink();

  constructor(
    private paymentsService: PaymentsService, private router: Router,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private loanersService: LoanersService
  ) {
  }

  ngOnInit(): void {
    this.loanerQueryParam = this.activatedRoute.snapshot.queryParams.loaner || null;
    this.isReady = false;
    this.loadingMessage = 'Loading...';
    this.paymentsService.paymentSelectValues.forEach(paymentType => {
      if (paymentType.label !== 'All') {
        this.paymentSelectOptions.push(paymentType);
      }
    });
    this.paymentTypes = this.paymentsService.PAYMENT_TYPES;
    this.paymentId = +this.activatedRoute.snapshot.params.paymentId;
    this.subs.sink = this.subs.sink = this.activatedRoute.data.subscribe(
      routeData => {
        this.directVisitor = routeData.loaner;
        this.loadLoanersOptions();
        const today = new Date();
        let payment: Payment = {
          loaner: this.directVisitor,
          paymentType: '',
          paymentAmount: null,
          paymentDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        };
        if (!!this.paymentId) {
          this.title = 'Edit Payment';
          this.subs.sink = this.paymentsService.getPaymentDetails(this.paymentId).subscribe(
            response => {
              payment = response;
              this.buildPaymentForm(payment);
              this.errorMessage = null;
              this.isReady = true;
            },
            () => {
              this.router.navigate(['/notfound']);
            }
          );
        } else {
          this.paymentId = null;
          this.buildPaymentForm(payment);
          this.isReady = true;
        }
      }
    );


  }

  buildPaymentForm(payment: any): void {
    this.paymentFormGroup = this.formBuilder.group({
      loaner: [payment.loaner?.id, Validators.required],
      paymentAmount: [payment.paymentAmount, Validators.required],
      paymentDate: [payment.paymentDate, Validators.required],
      paymentType: [payment.paymentType, Validators.required],
    });
  }

  loadLoanersOptions(): void {
    this.subs.sink = this.loanersService.getAllLoaners('').subscribe(
      response => {
        this.loanersSelectOptions = response.map(loaner => {
          return {
            id: loaner.id,
            name: loaner.name
          };
        });
      }
    );
  }

  onAddOrEditPayment(): void {
    this.isReady = false;
    this.loadingMessage = `${!this.paymentId ? 'Adding' : 'Editing'} the Payment...`;
    if (this.paymentFormGroup.valid) {
      if (this.paymentFormGroup.controls.paymentAmount.value > 0) {
        const paymentBody: Payment = {
          ...this.paymentFormGroup.value,
          id: this.paymentId
        };
        this.subs.sink = this.paymentsService.createOrEditPayment(paymentBody, !!this.paymentId)
          .subscribe(() => {
              this.processSuccess = true;
              this.errorMessage = null;
              this.isReady = true;
            }, errors => {
              this.errorMessage = errors;
              this.isReady = true;
            }
          );
      } else {
        this.errorMessage = 'Enter a payment amount that is greater than zero.';
        this.isReady = true;
      }
    } else {
      this.errorMessage = 'You have missed some required field.';
      this.isReady = true;
    }
  }

  goBackToPaymentsList(): void {
    let queryParams = {};
    if (this.loanerQueryParam) {
      queryParams = {
        loaner: this.loanerQueryParam
      };
    }
    this.router.navigate(
      [!this.paymentId ? '../' : '../../'],
      {relativeTo: this.activatedRoute, queryParams}
    );
  }
}
