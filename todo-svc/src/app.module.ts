import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresentationModule } from './presentation';

@Module({
  imports: [TypeOrmModule.forRoot(), PresentationModule ],
})
export class AppModule {}
