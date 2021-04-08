import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProfileStore } from "./profile.store";
import { ProfileEntity } from './profile.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ProfileEntity]) ],
  providers: [ ProfileStore ],
  exports: [ ProfileStore ],
})
export class ProfilePersistenceModule {}