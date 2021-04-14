import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresentationModule } from './presentation';
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PresentationModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
})
export class AppModule {}
