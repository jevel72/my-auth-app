import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { FormlyFieldConfig } from '@ngx-formly/core';

import { CheckAuthService } from '../services/check.service';

import { User } from '../interfaces/user.interface';

type Control = { [prop: string]: AbstractControl };

@Component({
  selector: 'my-auth-app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private check: CheckAuthService,
    private title: Title
  ) {}
  public ngOnInit(): void {
    this.title.setTitle('Регистрация');
  }
  public form: FormGroup = new FormGroup({});
  public model: User = {
    username: '',
    login: '',
    password: '',
  };
  public fields: FormlyFieldConfig[] = [
    {
      template: '<h2>Регистрация</h2>',
    },
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Имя пользователя: ',
        placeholder: 'Вася Иванов',
        minLength: 2,
        maxLength: 15,
      }
    },
    {
      key: 'login',
      type: 'input',
      templateOptions: {
        required: true,
        label: 'Логин: ',
        placeholder: 'GameOver1',
        minLength: 2,
        maxLength: 15,
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        required: true,
        type: 'password',
        label: 'Пароль: ',
        placeholder: 'Придумай сложный пароль',
        minLength: 7,
        maxLength: 30,
      },
    },
  ];
  public controls: Control = this.form.controls;
  public hide: boolean = true;
  public toggleHide(): void {
    this.hide = !this.hide;
    this.fields.find(field => field.key === "password").templateOptions.type = this.hide ? 'password' : 'text';
  }
  public onSubmit(): void {
    if (this.form.valid) {
      this.http
        .post('/api/register', this.model, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        })
        .subscribe((user) => {
          if (typeof user !== 'string') {
            localStorage.setItem('user', JSON.stringify(user));
            this.check.userLoggedIn();
            this.router.navigateByUrl('/users');
          } else {
            alert('User already exists!');
          }
        });
    }
  }
}
