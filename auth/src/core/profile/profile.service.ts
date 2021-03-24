import { Injectable } from "@nestjs/common";
import { ProfileEntity, ProfileStore } from "../../infrastructure";

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileStore: ProfileStore
  ) {}

  async findOne(email: string): Promise<ProfileEntity | undefined> {
    return this.profileStore.findOne({email});
  }
}