import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services';
import {SubSink} from 'subsink';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  editProfileFormGroup: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.email],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required]
  });

  isReady = true;
  loadingMessage = 'Loading...';

  private subs = new SubSink();
  errorMessage = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isReady = false;
    this.subs.sink = this.authService.me().subscribe(response => {
      this.editProfileFormGroup = this.formBuilder.group({
        username: [response.username, Validators.required],
        email: [response.email, Validators.email],
        firstname: [response.firstname, Validators.required],
        lastname: [response.lastname, Validators.required]
      });
      this.isReady = true;
    });
  }

  handleEditProfile(): void {
    this.isReady = false;
    this.loadingMessage = 'Submitting...';
    if (this.editProfileFormGroup.valid) {
      const userBody = this.editProfileFormGroup.value;
      this.authService.editMe(userBody).subscribe(
        () => {
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
          this.isReady = true;
        },
        errors => {
          this.errorMessage = errors;
          this.isReady = true;
        }
      );
    } else if (this.editProfileFormGroup.controls.email.invalid) {
      this.errorMessage = 'Email is in wrong format.';
      this.isReady = true;
    }
    else {
      this.errorMessage = 'You have missed some required field';
      this.isReady = true;
    }
  }

  cancelEdit(): void {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
