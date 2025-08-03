import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('Doctor Appointment Booking API')
    .setDescription('API for managing doctor appointments. This system allows users to view doctors, check their availability, and book appointments.')
    .setVersion('1.0')
    .addTag('doctors', 'Operations related to doctors')
    .addTag('appointments', 'Operations related to appointments and scheduling')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`API documentation available at: ${await app.getUrl()}/api-docs`);
}
bootstrap();