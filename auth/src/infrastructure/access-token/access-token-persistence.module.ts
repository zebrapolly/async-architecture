import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessTokenEntity } from "./access-token.entity";
import { AccessTokenStore } from "./access-token.store";

@Module({
  imports: [ TypeOrmModule.forFeature([AccessTokenEntity]) ],
  providers: [ AccessTokenStore ],
  exports: [ AccessTokenStore ]
})
export class AccessTokenPersistenceModule {

}