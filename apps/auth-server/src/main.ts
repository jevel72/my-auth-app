import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as rateLimit from 'express-rate-limit';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
