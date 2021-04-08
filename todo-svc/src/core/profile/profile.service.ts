import { Injectable } from "@nestjs/common";
import { IProfileCreatedEvent } from "../../domain";
import { ProfileStore } from "../../infrastructure";

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileStore: ProfileStore
  ) {

  }

  create(args: IProfileCreatedEvent) {
    return this.profileStore.create(args);
  }
}