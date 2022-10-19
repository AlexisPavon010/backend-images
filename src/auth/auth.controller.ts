import { Controller, Get, Post, Body, Param, UseGuards, Req, Redirect } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { Auth } from './decorators';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeaders } from './decorators/raw-header.decorator';
import { CreateAuthDto, LoginAuthDto } from './dto';
import { UserAuthDto } from './dto/user-auth.dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }


  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }


  // @Get(':id')
  // getUserById(@Param() userAuthDto: UserAuthDto) {
  //   return this.authService.getUser(userAuthDto)
  // }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {

    console.log('first')
    console.log(req)

  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  // @Redirect('http://localhost:3000')
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req)
  }

  @Get('private')
  @Auth()
  testingPrivateRoute(
    @GetUser() user: User,
    @RawHeaders() header: string[]
  ) {
    return {
      ok: true,
      msg: 'asdasdasdsad',
      user,
      header
    }
  }

  @Get('private2')
  @Auth()
  testingPrivateRoute2(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      msg: 'asdasdas',
      user
    }
  }

}
