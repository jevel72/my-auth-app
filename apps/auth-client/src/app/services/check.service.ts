import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckAuthService {
  constructor() {
    this.authtenticationStatusSource$ = new BehaviorSubject(false);
    this.authenticationStatus$ = this.authtenticationStatusSource$.asObservable();
  }
  private authtenticationStatusSource$: BehaviorSubject<boolean>;
  public authenticationStatus$: Observable<boolean>;
  public userLoggedIn(): void {
    this.authtenticationStatusSource$.next(true);
  }
  public userLoggedOut(): void {
    this.authtenticationStatusSource$.next(false);
  }
}
