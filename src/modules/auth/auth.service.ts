import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/repositories/user.repository';
import { Bcrypt } from 'src/shared/bcrypt-helper';
import { DatabaseErrors } from 'src/shared/database-errors';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ accessToken: string }> {
    const { email, password } = signupDto;
    const encrptedPassword = Bcrypt.encrypt(password);
    const record = this.userRepository.create({
      email,
      encrptedPassword,
    });

    try {
      await this.userRepository.save(record);
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      switch (error.code) {
        case DatabaseErrors.DUPLICATED:
          throw new ConflictException('Email already exists');
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  async signin(signinDto: SigninDto): Promise<{ accessToken: string }> {
    const { email, password } = signinDto;

    try {
      const user = await this.userRepository.findByEmail(email);
      const isValidPassword = Bcrypt.compare(password, user.encrptedPassword);

      if (user && isValidPassword) {
        const payload: JwtPayload = { email };
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken };
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
