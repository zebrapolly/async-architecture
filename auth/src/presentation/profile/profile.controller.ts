import { Get, Controller, Request, Post, Body, ValidationPipe, UsePipes, UseGuards, Req } from '@nestjs/common';
import { AuthService, JwtAuthGuard, LocalAuthGuard, ProfileService } from '../../core';
import { LoginDto } from './dto';

@Controller()
export class ProfileController {
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService 
  ) {
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  async login(@Req() req, @Body() res: LoginDto) {
    return this.authService.login(req.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req) {
    return this.profileService.getProfile(req.user.profileId);
  }
}