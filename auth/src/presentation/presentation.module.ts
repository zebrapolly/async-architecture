import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import { ProfileController } from "./profile";

@Module({
  imports: [CoreModule],
  controllers: [ProfileController]
})
export class PresentationModule {}