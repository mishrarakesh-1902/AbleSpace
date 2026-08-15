import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Allow frontend to access the API
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`✅ Backend server is running on port ${port}`);
  console.log(`API URL: http://localhost:${port}`);
}
bootstrap().catch(error => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
});


