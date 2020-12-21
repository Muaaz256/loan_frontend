import {Component, OnDestroy, OnInit} from '@angular/core';
import {Loaner} from '../../../models/loaner.model';
import {SubSink} from 'subsink';
import {LoanersService} from '../../../services/loaners.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as cryptoJS from 'crypto-js';
import {CIPHER_KEY} from '../../../shared/constants';

@Component({
  selector: 'app-loaners-list',
  templateUrl: './loaners-list.component.html',
  styleUrls: ['./loaners-list.component.css']
})
export class LoanersListComponent implements OnInit, OnDestroy {

  loaners: Loaner [];

  isReady = true;
  loadingMessage = 'Loading All Loaners...';

  searchParam = '';

  errors = false;


  private subs = new SubSink();

  constructor(private loanersService: LoanersService, private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadLoaners('');
  }

  loadLoaners(searchParam: string, reload = true): void {
    if (reload) {
      this.isReady = false;
      this.loadingMessage = 'Loading All Loaners...';
    }
    this.subs.sink = this.loanersService.getAllLoaners(searchParam).subscribe(
      response => {
        this.loaners = response;
        this.errors = false;
        this.isReady = true;
      },
      () => {
        this.errors = true;
        this.isReady = true;
      }
    );
  }

  onDeleteLoaner(loaner: Loaner): void {
    const deleteFlag = confirm(`Are you sure that you want to delete the loaner ${loaner.name}?`);
    if (deleteFlag) {
      this.subs.sink = this.loanersService.deleteLoaner(loaner.id).subscribe(
        () => {
          alert('The loaner has been deleted successfully.');
          this.loadLoaners(this.searchParam, false);
        },
        () => {
          alert('An unknown error occurred while deleting the loaner.');
        }
      );
    }
  }

  onSearch(event): void {
    this.loadLoaners(this.searchParam, false);
  }

  onViewPayments(loaner: Loaner): void {
    const encrypted = cryptoJS.AES.encrypt(
      `${loaner.id }`, CIPHER_KEY
    ).toString();
    this.router.navigate(
      ['../../payments'],
      {relativeTo: this.activatedRoute, queryParams: {loaner: encrypted}}
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
