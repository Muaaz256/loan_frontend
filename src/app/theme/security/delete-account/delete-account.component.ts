import {Component} from '@angular/core';
import {AuthService} from '../../../services';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  isReady = true;
  loadingMessage = 'Deleting Your Account...';

  private subs = new SubSink();

  constructor(private authService: AuthService, private router: Router) {
  }

  deleteAccountHandler(): void {
    this.subs.sink = this.authService.deleteMyAccount().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/accounts/register/']);
    });
  }
}
