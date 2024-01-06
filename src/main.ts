import { LogLevel, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const LOGGER = new Logger('API');

async function bootstrap() {
  const loggerMode: LogLevel[] = process.env.NODE_ENV === 'development' ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['log', 'error', 'warn'];
  const app = await NestFactory.create(AppModule, { logger: loggerMode });
  const config: ConfigService = app.get(ConfigService);

  const envBasePath = config.get<string>('BASEPATH');
  const basepath =
    envBasePath && envBasePath.length > 1
      ? envBasePath.charAt(envBasePath.length - 1) === '/'
        ? envBasePath.substring(0, envBasePath.length - 1)
        : envBasePath
      : '';

  if (basepath !== '') {
    app.setGlobalPrefix(basepath);
  }

  let swaggetPath = '';
  if (config.get<string>('SWAGGER_DOCS') && config.get<string>('SWAGGER_DOCS') === '1') {
    const configSwagger = new DocumentBuilder()
      .setTitle(config.get<string>('DESCRIPTION'))
      .setVersion('1.0')
      .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header', description: 'API Key For External calls' })
      .build();
    const document = SwaggerModule.createDocument(app, configSwagger);
    swaggetPath = `${basepath}${basepath !== '' ? '/' : ''}api-docs`;
    SwaggerModule.setup(swaggetPath, app, document);
  }
  // para poder usar class-validaror
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(config.get<number>('PORT'));

  LOGGER.log(`API Started - ${await app.getUrl()}/${basepath}`);
  if (process.env.SWAGGER_DOCS && process.env.SWAGGER_DOCS === '1') {
    LOGGER.log(`Swagger Docs - ${await app.getUrl()}/${swaggetPath}`);
  }
}
bootstrap();
