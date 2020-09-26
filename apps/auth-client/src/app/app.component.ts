import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CheckAuthService } from './services/check.service';

@UntilDestroy()
@Component({
  selector: 'my-auth-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private check: CheckAuthService, private router: Router) {}
  public authStatus: boolean;
  public ngOnInit(): void {
    this.check.authenticationStatus$
      .pipe(untilDestroyed(this))
      .subscribe((status) => (this.authStatus = status));
    if ('user' in localStorage) {
      this.check.userLoggedIn();
    }
  }
  public logout(): void {
    this.check.userLoggedOut();
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
