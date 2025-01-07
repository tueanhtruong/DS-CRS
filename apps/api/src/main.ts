import path from 'path';

import { ApiKeyTag, useLogger } from '@commons';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { generateApi } from 'swagger-typescript-api';
import { AppModule } from './app.module';

const title = 'Swagger API';
const description = 'The Swagger API documents';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  useLogger(app);

  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion('0.1')
    .addApiKey({ type: 'apiKey', name: ApiKeyTag, in: 'header' }, ApiKeyTag)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'Bearer',
      name: 'access-token',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await generateApi({
    name: 'index',
    output: path.resolve(__dirname, '../../../packages/sdk'),
    spec: document as any,
    templates: path.resolve(__dirname, '../swagger-templates'),
    prettier: {
      singleQuote: true,
      jsxSingleQuote: false,
      arrowParens: 'avoid',
      trailingComma: 'all',
      tabWidth: 2,
      printWidth: 120,
      parser: 'typescript',
    },
    httpClientType: 'axios',
  });

  await app.listen(process.env.PORT ?? 3000);

  const url = await app.getUrl();
  Logger.log(`${url}/swagger`);
}
bootstrap();
