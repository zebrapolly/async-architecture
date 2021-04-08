import { Controller, Post, Body, ValidationPipe, UsePipes, UseGuards, Req } from '@nestjs/common';
import { AuthService, LocalAuthGuard } from '../../core';
import { LoginDto } from './dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  async login(@Req() req, @Body() res: LoginDto) {
    return this.authService.login(req.user);
  }
}