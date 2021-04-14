import { Get, Controller, Request, Post, Body, ValidationPipe, UsePipes, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard, ProfileService } from '../../core';
import { CreateProfileDto } from './dto';

@Controller('profile')
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
    return this.profileService.create(payload);
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async findOne(@Param('id') id: string) {
    return this.profileService.getByPublicId(id);
  }
}