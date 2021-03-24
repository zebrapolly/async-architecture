import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileEntity } from "./profile.entity";
import { ProfileStore } from "./profile.store";

@Module({
  imports: [ TypeOrmModule.forFeature([ProfileEntity]) ],
  providers: [ProfileStore],
  exports: [ProfileStore]
})
export class ProfilePersistenceModule {

}