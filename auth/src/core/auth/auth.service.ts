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
    const profile = await this.profileService.findOne(email);
    if (profile && profile.password === pass) {
      const { password, ...result } = profile;
      return result;
    }
    return null;
  }

  async login({ email, id, role}) {
    const payload = { email, sub: id, role };
    return {
      access_token: this.jwtService.sign(payload),
      role
    };
  }
}