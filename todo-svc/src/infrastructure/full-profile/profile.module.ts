import { HttpModule, Module } from "@nestjs/common";
import { FullProfileService } from "./profile.store";

@Module({
  imports: [HttpModule],
  providers: [FullProfileService],
  exports: [FullProfileService]
})
export class FullProfileModule {}