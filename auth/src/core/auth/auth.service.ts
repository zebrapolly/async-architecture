import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from '../profile';

@Injectable()
export class AuthService {
  constructor(
    private profileService: ProfileService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('validate user');
    const profile = await this.profileService.findOne(email);
    if (profile && profile.password === pass) {
      const { password, ...result } = profile;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('login user', user);
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}