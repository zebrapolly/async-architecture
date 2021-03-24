import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../infrastructure";
import { AuthModule } from "./auth";
import { ProfileModule } from "./profile";

@Module({
  imports: [ InfrastructureModule, ProfileModule, AuthModule ],
  exports: [ ProfileModule, AuthModule ]
})
export class CoreModule {

}