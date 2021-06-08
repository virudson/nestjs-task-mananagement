import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
