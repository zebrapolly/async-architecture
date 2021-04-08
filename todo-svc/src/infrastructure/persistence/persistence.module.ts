import { Module } from "@nestjs/common";
import { ProfilePersistenceModule } from "./profile";
import { TaskPersistenceModule } from "./task";

@Module({
  imports: [ TaskPersistenceModule, ProfilePersistenceModule ],
  exports: [ TaskPersistenceModule, ProfilePersistenceModule ],
})
export class PersistenceModule {}