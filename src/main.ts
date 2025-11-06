import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  
  app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);
  console.log(`API rodando em http://localhost:${PORT}/api`);
}
bootstrap();
