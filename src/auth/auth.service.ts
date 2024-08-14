import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthUserDto } from './dtos/auth-user.dto';
import { User } from 'src/users/entities/users.entity';
import { SecurityService } from 'src/security/security.service';
import { MessagingService } from 'src/messaging/messaging.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private securityService: SecurityService,
    private messagingService: MessagingService,
  ) {}

  async signUp(user: CreateUserDto): Promise<User> {
    const existingUser = await this.usersService.findOne(user.email);
    console.log(existingUser);
    if (existingUser) {
      throw new BadRequestException('User already exist!');
    }

    const hashedPassword = await this.securityService.hash(user.password);
    const userCreated = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    const { email, firstName, lastName } = userCreated;
    await this.messagingService.sendAccountCreatedEmail(
      email,
      firstName,
      lastName,
    );
    return userCreated;
  }

  async signIn(user: AuthUserDto): Promise<{ user: User; token: string }> {
    const existingUser = await this.usersService.findOne(user.email);
    if (!existingUser) {
      throw new BadRequestException('User not found!');
    }

    const isPasswordValid = await this.securityService.verifyHash(
      user.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Password');
    }

    const token = await this.securityService.generateToken({ ...existingUser });

    return { user: existingUser, token };
  }
}
