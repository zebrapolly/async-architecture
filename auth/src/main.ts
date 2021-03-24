import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';

import { AppModule } from './app.module';

const { HOST, PORT } = process.env;

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('hbs');

  await app.listen(PORT, HOST);

  logger.log(`Applications started ${HOST}:${PORT}`, `NestApplication`);
}
bootstrap();
