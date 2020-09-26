import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { distinctUntilChanged } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

interface User {
  id: number;
  username: string;
  login: string;
}

@UntilDestroy()
@Component({
  selector: 'my-auth-app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  constructor(private http: HttpClient, private title: Title) {}
  ngOnInit(): void {
    this.listOfUsers$ = this.http
      .get<User[]>('/api/users')
      .pipe(untilDestroyed(this), distinctUntilChanged());
    this.title.setTitle('Список пользователей');
  }
  public listOfUsers$: Observable<User[]>;
}
