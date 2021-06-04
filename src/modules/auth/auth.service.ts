import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseErrors } from 'src/shared/database-errors';
import { SignupDto } from './dto/signup.dto';
import { User } from '../../models/user.entity';
import { UsersRepository } from '../../repositories/user.repository';
import { Bcrypt } from 'src/shared/bcrypt-helper';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const { email, password } = signupDto;
    const encrptedPassword = Bcrypt.encrypt(password);
    const record = this.userRepository.create({
      email,
      encrptedPassword,
    });

    try {
      await this.userRepository.save(record);
      return record;
    } catch (error) {
      switch (error.code) {
        case DatabaseErrors.DUPLICATED:
          throw new ConflictException('Email already exists');
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  async signin(signinDto: SigninDto): Promise<User> {
    const { email, password } = signinDto;

    try {
      const user = await this.userRepository.findByEmail(email);
      const isValidPassword = Bcrypt.compare(password, user.encrptedPassword);

      if (isValidPassword) {
        return user;
      } else {
        throw new UnprocessableEntityException();
      }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnprocessableEntityException
      ) {
        throw new UnprocessableEntityException('Invalid email or password');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
