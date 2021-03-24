import { Get, Controller, Render, Post, Body, ValidationPipe, UsePipes, UseGuards, Redirect, Res, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService, LocalAuthGuard } from '../../core';
import { LoginDto } from './dto';

@Controller()
export class ProfileController {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService
  ) {
  }
  @Get('login')
  @Render('login')
  loginPage() {
    console.log('here');
    return { message: 'Hello world!' };
  }

  @Post('login')
  @Render('login')
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  async login(@Req() req,@Res() res: Response) {
      const appRoute = this.configService.get('APP_ROUTE');
      const { access_token } = await this.authService.login(req.user);
      return res
        .json()
        .status(302)
        .redirect(`http://${appRoute}/?access_token=${access_token}`);
  }
}