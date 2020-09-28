import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CheckAuthService } from '../services/check.service';
import { distinctUntilChanged, retry, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { PasswordValidators } from 'ngx-validators';

@UntilDestroy()
@Component({
  selector: 'my-auth-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private check: CheckAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logForm = this.fb.group({
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
          PasswordValidators.digitCharacterRule(1),
          PasswordValidators.alphabeticalCharacterRule(3),
          PasswordValidators.lowercaseCharacterRule(1),
          PasswordValidators.uppercaseCharacterRule(1),
          PasswordValidators.repeatCharacterRegexRule(3),
        ],
      ],
    });
    this.logFormControls = this.logForm.controls;
  }
  public logForm: FormGroup;
  public logFormControls: Partial<AbstractControl>;
  public attempts: number = 0;
  public login(): void {
    if ('block' in localStorage) return null;
    if (this.attempts > 2) {
      localStorage.setItem('block', 'true');
      return null;
    }
    this.http
      .post('/api/login', this.logForm.value, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        retry(3),
        distinctUntilChanged(),
        catchError(() => EMPTY),
        untilDestroyed(this)
      )
      .subscribe((user) => {
        this.attempts = 0;
        this.check.userLoggedIn();
        this.router.navigateByUrl('/users');
        localStorage.setItem('user', JSON.stringify(user));
      });
    this.attempts++;
  }
}
