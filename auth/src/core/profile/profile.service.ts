import { Injectable, NotFoundException } from "@nestjs/common";
import { ProfileEntity, ProfileStore } from "../../infrastructure";

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileStore: ProfileStore
  ) {}

  async findOne(email: string): Promise<ProfileEntity | undefined> {
    return this.profileStore.findOne({email});
  }

  async getProfile(id: string) {
    const profile = await this.profileStore.findOne({id});
    if (!profile) {
      throw new NotFoundException('Profile not found')
    }
    const { password, ...data} = profile;
    return data;
  }
}