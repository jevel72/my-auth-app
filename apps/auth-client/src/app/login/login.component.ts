import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EMPTY } from 'rxjs';
import { distinctUntilChanged, retry, catchError } from 'rxjs/operators';

import { FormlyFieldConfig } from '@ngx-formly/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CheckAuthService } from '../services/check.service';

import { UserLogin } from '../interfaces/user.interface';

import { Controls } from '../types/control.type';

@UntilDestroy()
@Component({
  selector: 'my-auth-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private check: CheckAuthService,
    private router: Router,
    private title: Title,
  ) {}
  public ngOnInit(): void {
    this.title.setTitle('Вход');
  }
  public form: FormGroup = new FormGroup({});
  public model: UserLogin = {
    login: '',
    password: '',
  };
  public fields: FormlyFieldConfig[] = [
    {
      template: '<h2>Вход</h2>',
    },
    {
      key: 'login',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Логин: ',
        placeholder: 'Adam Smith',
        minLength: 2,
        maxLength: 15,
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Пароль: ',
        placeholder: 'Помните?',
        minLength: 7,
        maxLength: 15,
      },
    },
  ];
  public controls: Controls = this.form.controls;
  public attempts: number = 0;
  public hide: boolean = false;
  public toggleHide(): void {
    this.hide = !this.hide;
    this.fields.find(field => field.key === "password").templateOptions.type = this.hide ? 'text' : 'password';
  }
  public login(): void {
    if ('block' in localStorage) return null;
    if (this.attempts > 2) {
      localStorage.setItem('block', 'true');
      return null;
    }
    this.http
      .post('/api/login', this.model, {
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
