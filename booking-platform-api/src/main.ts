import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';


async function bootstrap() {

  const app =
    await NestFactory.create(AppModule);



  // Enable CORS for React Frontend
  app.enableCors({

    origin:
      'http://localhost:5173',

    methods:
      [
        'GET',
        'POST',
        'PATCH',
        'DELETE',
        'OPTIONS',
      ],

    credentials:
      true,

  });



  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({

      whitelist: true,

      transform: true,

      forbidNonWhitelisted: true,

    }),
  );



  // Global Exception Filter
  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );



  // Swagger Configuration
  const config =
    new DocumentBuilder()

      .setTitle(
        'Booking Platform API',
      )

      .setDescription(
        'API documentation for Booking Platform',
      )

      .setVersion('1.0')

      .addBearerAuth()

      .build();



  const document =
    SwaggerModule.createDocument(
      app,
      config,
    );



  SwaggerModule.setup(
    'api',
    app,
    document,
  );



  await app.listen(3000);



  console.log(
    'Application is running on: http://localhost:3000',
  );


  console.log(
    'Swagger Docs: http://localhost:3000/api',
  );

}


bootstrap();