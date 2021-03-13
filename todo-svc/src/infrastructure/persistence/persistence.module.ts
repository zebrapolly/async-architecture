import { Module } from "@nestjs/common";
import { TaskPersistenceModule } from "./task";

@Module({
  exports: [ TaskPersistenceModule ],
  imports: [ TaskPersistenceModule ],
})
export class PersistenceModule {}