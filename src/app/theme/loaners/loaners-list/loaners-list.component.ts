import {Component, OnDestroy, OnInit} from '@angular/core';
import {Loaner} from '../../../models/loaner.model';
import {SubSink} from 'subsink';
import {LoanersService} from '../../../services/loaners.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-loaners-list',
  templateUrl: './loaners-list.component.html',
  styleUrls: ['./loaners-list.component.css']
})
export class LoanersListComponent implements OnInit, OnDestroy {

  loaners: Loaner [];

  isReady = true;
  loadingMessage = 'Loading All Loaners...';

  errors = false;

  private subs = new SubSink();

  constructor(private loanersService: LoanersService, private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadLoaners();
  }

  loadLoaners(): void {
    this.isReady = false;
    this.loadingMessage = 'Loading All Loaners...';
    this.subs.sink = this.loanersService.getAllLoaners().subscribe(
      response => {
        this.loaners = response;
        this.errors = false;
        this.isReady = true;
      },
      errors => {
        this.errors = true;
        this.isReady = true;
      }
    );
  }

  onDeleteLoaner(loaner: Loaner): void {
    const deleteFlag = confirm(`Are you sure that you want to delete the loaner ${loaner.name}?`);
    if (deleteFlag) {
      this.loadingMessage = `Deleting the Loaner ${loaner.name}`;
      this.loanersService.deleteLoaner(loaner.id).subscribe(
        () => {
          alert('The loaner has been deleted successfully.');
          this.loadLoaners();
        },
        errors => {
          alert('An unknown error occurred while deleting the loaner.');
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
