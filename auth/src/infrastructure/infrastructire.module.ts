import { Module } from "@nestjs/common";
import { ProfilePersistenceModule } from "./profile";

@Module({
  imports: [ ProfilePersistenceModule ],
  exports: [ ProfilePersistenceModule ]
})
export class InfrastructureModule {}