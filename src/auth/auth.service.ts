import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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

    try {
      await this.userRepository.save(record);
      return record;
    } catch (error) {
      switch (error.code) {
        case '23505':
          throw new ConflictException('Email already exists');
        default:
          throw new InternalServerErrorException();
      }
    }
  }
}
