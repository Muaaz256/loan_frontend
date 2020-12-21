import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoanersService} from '../../../services/loaners.service';
import {Loaner} from '../../../models/loaner.model';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-loaners-list',
  templateUrl: './add-edit-loaner.component.html',
  styleUrls: ['./add-edit-loaner.component.css']
})
export class AddEditLoanerComponent implements OnInit, OnDestroy {
  loanerFormGroup: FormGroup;
  loanerId: number;

  isReady = true;
  loadingMessage = 'Loading...';

  errorMessage = null;
  processSuccess = false;

  private subs = new SubSink();
  title = 'Add Loaner';

  constructor(
    private formBuilder: FormBuilder, private router: Router, private loanersService: LoanersService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.isReady = false;
    this.loadingMessage = 'Loading...';
    this.loanerId = +this.activatedRoute.snapshot.params.loanerId;
    let loaner: Loaner = {
      name: '',
      phone: '',
      email: '',
      address: ''
    };
    if (!!this.loanerId) {
      this.title = 'Edit Loaner';
      this.subs.sink = this.loanersService.getLoanerDetails(this.loanerId).subscribe(
        response => {
          loaner = response;
          this.buildLoanerForm(loaner);
          this.errorMessage = null;
          this.isReady = true;
        },
        () => {
          this.router.navigate(['/notfound']);
        }
      );
    } else {
      this.loanerId = null;
      this.buildLoanerForm(loaner);
      this.isReady = true;
    }
  }

  buildLoanerForm(loaner: Loaner): void {
    this.loanerFormGroup = this.formBuilder.group({
      name: [loaner.name, Validators.required],
      email: [loaner.email, Validators.email],
      phone: [loaner.phone, Validators.required],
      address: [loaner.address],
    });
  }

  onAddOrEditLoaner(): void {
    this.isReady = false;
    this.loadingMessage = `${!this.loanerId ? 'Adding' : 'Editing'} the Loaner...`;
    if (this.loanerFormGroup.valid) {
      const loanerBody: Loaner = {
        ...this.loanerFormGroup.value,
        id: this.loanerId
      };
      this.subs.sink = this.loanersService.createOrEditLoaner(loanerBody, !!this.loanerId)
        .subscribe(() => {
            this.processSuccess = true;
            this.errorMessage = null;
            this.isReady = true;
          }, errors => {
            this.errorMessage = errors;
            this.isReady = true;
          }
        );
    } else if (this.loanerFormGroup.controls.email.invalid) {
      this.errorMessage = 'You have not entered an invalid email address.';
      this.isReady = true;
    } else {
      this.errorMessage = 'You have missed some required field.';
      this.isReady = true;
    }
  }

  goBackToList(): void {
    this.router.navigate(
      [!this.loanerId ? '../' : '../../'],
      {relativeTo: this.activatedRoute}
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
