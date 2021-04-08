import { Injectable, NotFoundException } from "@nestjs/common";
import { ICreateProfile } from "../../domain";
import { ProfileEntity, ProfileEventService, ProfileStore } from "../../infrastructure";

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileStore: ProfileStore,
    private readonly eventService: ProfileEventService,
  ) {}

  async findOne(email: string): Promise<ProfileEntity | undefined> {
    return this.profileStore.findOne({email});
  }

  async getProfile(publicId: string) {
    const profile = await this.profileStore.findOne({publicId});
    if (!profile) {
      throw new NotFoundException('Profile not found')
    }
    const { password, ...data} = profile;
    return data;
  }

  async create(payload: ICreateProfile) {
    const account = await this.profileStore.create(payload);
    const { publicId, role } = account;
    this.eventService.sendCreated({ publicId, role });
    return account;
  }
}