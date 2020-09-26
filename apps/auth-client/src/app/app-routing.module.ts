import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { UsersListComponent } from './users-list/users-list.component';

const LoginRoute: Route = {
  path: 'login',
  component: LoginComponent,
};

const RegisterRoute: Route = {
  path: 'register',
  component: RegisterComponent,
};

const UsersListRoute: Route = {
  path: 'users',
  component: UsersListComponent,
};

const EmptyRoute: Route = {
  path: '',
  pathMatch: 'full',
  redirectTo: 'users',
};

const NotFoundRoute: Route = {
  path: '**',
  component: NotFoundComponent,
};

const routes: Routes = [
  LoginRoute,
  RegisterRoute,
  UsersListRoute,
  EmptyRoute,
  NotFoundRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
