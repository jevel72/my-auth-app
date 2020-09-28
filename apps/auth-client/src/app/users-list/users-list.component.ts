import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { distinctUntilChanged } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

interface User {
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
    this.makeRequest();
    this.title.setTitle('Список пользователей');
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')).status;
    } else {
      this.user = 'low';
    }
  }
  private makeRequest(): void {
    this.listOfUsers$ = this.http
      .get<User[]>('/api/users')
      .pipe(untilDestroyed(this), distinctUntilChanged());
  }
  public deleteUser(id: string) {
    this.listOfUsers$ = this.http.delete<User[]>(`/api/delete/${id}`);
  }
  public listOfUsers$: Observable<User[]>;
  public user;
  public displayedColumns: string[] = ['id', 'username', 'login', 'status'];
}
