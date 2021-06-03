import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dto/signup.dto';
import { User } from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const { email, password } = signupDto;
    const record = this.userRepository.create({ email, password });
    await this.userRepository.save(record);

    return record;
  }
}
