import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dashboard} from '../../models/dashboard.model';
import {SubSink} from 'subsink';
import {PaymentsService} from '../../services/payments.service';
import {DashboardService} from '../../services/dashboard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  dashboard: Dashboard;

  isReady = true;
  loadingMessage = 'Loading Dashboard...';

  errors = false;

  paymentTypes = this.paymentsService.PAYMENT_TYPES;

  private subs = new SubSink();

  constructor(private paymentsService: PaymentsService, private router: Router,
              private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isReady = false;
    this.loadingMessage = 'Loading Dashboard...';
    this.subs.sink = this.dashboardService.getDashboardData().subscribe(
      response => {
        this.dashboard = response;
        this.errors = false;
        this.isReady = true;
      },
      () => {
        this.errors = true;
        this.isReady = true;
      }
    );
  }

  unPinPaymentFromDashboard(paymentId: number): void {
    this.subs.sink = this.paymentsService.pinPaymentToDashboard(paymentId).subscribe(
      () => {
        this.dashboard.pinnedPayments = this.dashboard.pinnedPayments.filter(
          payment => payment.id !== paymentId
        );
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
