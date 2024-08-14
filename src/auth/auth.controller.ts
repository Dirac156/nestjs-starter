import {
  Body,
  Controller,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'src/users/entities/users.entity';
import { AuthUserDto } from './dtos/auth-user.dto';
import { UserDto } from './dtos/user.dto';
import { SerializeInterceptor } from '../serializer/serializer-interceptor';

@UseInterceptors(new SerializeInterceptor<UserDto>(UserDto))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.signUp(body);
  }

  @Post('/sign-in')
  async signIn(@Body() body: AuthUserDto, @Session() session): Promise<User> {
    const user = await this.authService.signIn(body);
    session.auth_token = user.token;
    return user.user;
  }
}
