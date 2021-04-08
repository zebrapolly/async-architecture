import { Module } from "@nestjs/common";
import { AccountPersistenceModule } from "./account";
import { AuditPersistenceModule } from "./audit";
import { ProfilePersistenceModule } from "./profile";
import { TaskPersistenceModule } from "./task";

@Module({
  imports: [TaskPersistenceModule, ProfilePersistenceModule, AccountPersistenceModule, AuditPersistenceModule],
  exports: [TaskPersistenceModule, ProfilePersistenceModule, AccountPersistenceModule, AuditPersistenceModule]
})
export class PersistenceModule {}