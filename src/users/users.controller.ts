import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUser(@Param('id') id: number): Promise<User | void> {
    return this.usersService.findById(id);
  }

  @Delete()
  deleteUser(@Query('email') email: string): Promise<void> {
    return this.usersService.remove(email);
  }
}
