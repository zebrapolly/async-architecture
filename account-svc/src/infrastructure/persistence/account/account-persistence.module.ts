import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AccountStore } from "./account.store";
import { AccountEntity } from './account.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([AccountEntity]) ],
  exports: [ AccountStore ],
  providers: [ AccountStore ]
})
export class AccountPersistenceModule {}