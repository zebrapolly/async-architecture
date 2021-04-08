import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IProfile } from "../../../domain";
import { ProfileEntity } from "./profile.entity";

@Injectable()
export class ProfileStore {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly repository: Repository<ProfileEntity>
  ) {}
  
  create(payload: IProfile) {
    return this.repository.save(payload);
  }

  getAll() {
    return this.repository.find();
  }
}