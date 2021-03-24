import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "./client.entity";
import { ClientStore } from "./client.store";

@Module({
  imports: [ TypeOrmModule.forFeature([ClientEntity]) ],
  providers: [ ClientStore ],
  exports: [ClientStore ]
})
export class ClientPersistenceModule {

}