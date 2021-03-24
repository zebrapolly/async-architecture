import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IProfile } from "../../domain";
import { ProfileEntity } from './profile.entity';

@Injectable()
export class ProfileStore {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly repository: Repository<ProfileEntity>
  ) {}

  findOne(params: Partial<IProfile>) {
    return this.repository.findOne(params);
  }
}