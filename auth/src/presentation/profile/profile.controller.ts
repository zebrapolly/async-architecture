import { Get, Controller, Request, Post, Body, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, ProfileService } from '../../core';
import { CreateProfileDto } from './dto';

@Controller('account')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService 
  ) {
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req) {
    return this.profileService.getProfile(req.user.profileId);
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async createProfile(@Body() payload: CreateProfileDto) {
    console.log('create profile', payload);
    return this.profileService.create(payload);
  }
}