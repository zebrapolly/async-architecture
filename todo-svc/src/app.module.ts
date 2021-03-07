import { Module } from '@nestjs/common';
import { PersistenceModule } from './infrastructure';
import { PresentationModule } from './presentation';
import { CoreModule } from './core';

@Module({
  imports: [PresentationModule, PersistenceModule, CoreModule],
})
export class AppModule {}
