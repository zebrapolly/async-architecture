import { Controller, Logger, Post } from "@nestjs/common";
import { DayEndAccountingService } from "../core";

@Controller()
export class DayEndAccountingController {
  private readonly logger = new Logger(DayEndAccountingController.name)

  constructor(
    private readonly service: DayEndAccountingService
  ) {

  }
  @Post('day-end-process')
  public async taskHandler() {
    this.logger.log('handle day-end message');
    return this.service.process();
  }
}