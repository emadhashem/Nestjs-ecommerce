import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfigration from './utils/app.configration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = appConfigration().port;
  app.setGlobalPrefix('api');
  await app.listen(PORT);
}
bootstrap();
