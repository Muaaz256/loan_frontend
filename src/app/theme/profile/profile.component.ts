import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services';
import {User} from '../../models';
import {SubSink} from 'subsink';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;

  isReady = true;
  loadingMessage = 'Loading...';

  private subs = new SubSink();

  constructor(private authService: AuthService, private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isReady = false;
    this.subs.sink = this.authService.me().subscribe(response => {
      this.user = response;
      this.isReady = true;
    });
  }

  onEditProfile(): void {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
