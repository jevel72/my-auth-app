import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private users: UsersService) {}
  @Post('register') async registerUser(@Body() data) {
    let findedUser;
    const allUsers = await this.users
      .find()
      .then((users) =>
        users.find((user) => (findedUser = user.login === data.login))
      );
    if (findedUser) {
      return `User with this username exists!`;
    }
    if (data.login !== 'admin') {
      data.status = 'low';
    } else {
      data.status = 'high';
    }
    const addOperation = await this.users.addUser(data);
    addOperation.password = null;
    return addOperation;
  }
  @Get('users') async getUsers() {
    const users = await this.users.find();
    users.forEach((user) => (user.password = null));
    return users;
  }
  @Delete('delete/:id') async deleteUser(@Param('id') id: string) {
    const users = await this.users.deleteUser(id);
    users.forEach((user) => (user.password = null));
    return users;
  }
  @Post('login') async logIn(@Body() data) {
    const users = await this.users.find();
    const isUserFinded = users.find(
      (user) => user.login === data.login && user.password === data.password
    );
    if (!isUserFinded) {
      return `Wrong login or password!`;
    } else {
      let returnedUser = users.find((x) => x.login === data.login);
      returnedUser.password = null;
      return returnedUser;
    }
  }
}
