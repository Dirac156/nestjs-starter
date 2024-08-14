import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    return user;
  }

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(user: Partial<User>): Promise<User | null> {
    const createdUser = await this.usersRepository.create(user);
    return this.usersRepository.save(createdUser);
  }

  async remove(email: string): Promise<void> {
    const user = await this.findOne(email);
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    await this.usersRepository.delete({ email });
  }
}
