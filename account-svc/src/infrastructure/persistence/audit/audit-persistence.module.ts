import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuditStore } from "./audit.store";
import { AuditEntity } from './audit.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([AuditEntity]) ],
  exports: [ AuditStore ],
  providers: [ AuditStore ]
})
export class AuditPersistenceModule {}