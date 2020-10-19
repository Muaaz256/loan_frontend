import {Component, OnDestroy, OnInit} from '@angular/core';
import {Loaner} from '../../../models/loaner.model';
import {SubSink} from 'subsink';
import {LoanersService} from '../../../services/loaners.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-loaner-detail',
  templateUrl: './loaner-detail.component.html',
  styleUrls: ['./loaner-detail.component.css']
})
export class LoanerDetailComponent implements OnInit, OnDestroy {
  loaner: Loaner;

  isReady = true;
  loadingMessage = 'Loading Loaner Details...';

  private subs = new SubSink();

  constructor(
    private loanersService: LoanersService, private router: Router, private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.isReady = false;
    this.loadingMessage = 'Loading Loaner Details...';
    const loanerId = +this.activatedRoute.snapshot.params.loanerId;
    this.subs.sink = this.loanersService.getLoanerDetails(loanerId).subscribe(
      response => {
        this.loaner = response;
        this.isReady = true;
      },
      errors => {
        this.router.navigate(['/notfound']);
      }
    );
  }

  onDeleteLoaner(): void {
    const deleteFlag = confirm(`Are you sure that you want to delete the loaner ${this.loaner.name}?`);
    if (deleteFlag) {
      this.loanersService.deleteLoaner(this.loaner.id).subscribe(
        () => {
          alert('The loaner has been deleted successfully.');
          this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
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
