import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { User } from '../../models/user.entity';
import { SigninDto } from './dto/signin.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/users/signup')
  signup(@Body() signupDto: SignupDto): Promise<{ accessToken: string }> {
    return this.authService.signup(signupDto);
  }

  @Post('/users/signin')
  signin(@Body() signupDto: SigninDto): Promise<{ accessToken: string }> {
    return this.authService.signin(signupDto);
  }
}
