import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure";
import { ProfileService } from "./profile.service";

@Module({
  imports: [ InfrastructureModule ],
  providers: [ ProfileService ],
  exports: [ ProfileService ]
})
export class ProfileModule {}