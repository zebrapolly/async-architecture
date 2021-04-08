import { Injectable } from "@nestjs/common";
import { IProfile } from "../../../domain";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileEntity } from "./profile.entity";

@Injectable()
export class ProfileStore {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly repository: Repository<ProfileEntity>
  ) {}
  
  create(payload: IProfile) {
    return this.repository.create(payload);
  }
}