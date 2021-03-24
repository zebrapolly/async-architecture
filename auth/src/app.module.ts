import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfrastructureModule } from './infrastructure';
import { PresentationModule } from './presentation';

@Module({
    imports: [
      TypeOrmModule.forRoot(),
      InfrastructureModule,
      ConfigModule.forRoot(
        {isGlobal: true}
      ),
      PresentationModule
    ],
})
export class AppModule {}