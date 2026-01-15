import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  if (process.env.SWAGGER_ENABLED !== 'true') {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle(`${process.env.SERVICE_NAME || 'Service'} APIs`)
    .setDescription('Service API documentation')
    .setVersion('1.0')
    .addServer(
      process.env.SWAGGER_BASE_URL || 'http://localhost:3001',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
