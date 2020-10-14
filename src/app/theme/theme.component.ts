import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {User} from '../models';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit, OnDestroy {
  user: User;

  isReady = true;
  loadingMessage = 'Loading...';

  logoutError = false;

  private subs = new SubSink();

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isReady = false;
    this.loadingMessage = 'Loading...';
    this.subs.sink = this.authService.me().subscribe(response => {
      this.user = response;
      this.isReady = true;
    });
    this.subs.sink = this.authService.userUpdated.subscribe(response => {
      this.user = response;
    });
  }

  logout(): void {
    this.isReady = false;
    this.loadingMessage = 'Logging Out...';
    this.subs.sink = this.authService.logout().subscribe(
      () => {
        this.isReady = true;
        this.logoutError = false;
        this.router.navigate(['/accounts/login']);
      },
      () => {
        this.logoutError = true;
        this.isReady = true;
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
