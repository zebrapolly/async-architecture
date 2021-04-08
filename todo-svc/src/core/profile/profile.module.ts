import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure";
import { ProfileService } from "./profile.service";

@Module({
  imports: [ InfrastructureModule ],
  exports: [ ProfileService],
  providers: [ ProfileService ]
})
export class ProfileModule {

}