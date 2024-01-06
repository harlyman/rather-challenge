import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import Strategy from 'passport-headerapikey';

@Injectable()
export class AuthApiKeyStrategy extends PassportStrategy(Strategy, 'x-api-key') {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  private readonly logger = new Logger(AuthApiKeyStrategy.name);

  constructor() {
    super({ header: 'x-api-key', prefix: '' }, true, (apiKey, done, request) => {
      return this.validate(apiKey, done, request);
    });
  }

  public validate = (apiKey: string, done: (error: Error, data) => any, request: Request) => {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    let color = '\x1b[32m';
    switch (method) {
      case 'POST':
        color = '\x1b[33m';
        break;
      case 'PATCH':
        color = '\x1b[35m';
        break;
      case 'DELETE':
        color = '\x1b[31m';
        break;
    }

    const message = `${color}${method} \x1b[0m${originalUrl} {COLOR}- ${userAgent} [${ip}]`;

    if (this.config.get<string>('API_KEY') === apiKey) {
      this.logger.log(`SUPER AUTHORIZED ${message.split('{COLOR}').join('\x1b[32m')}`);
      return done(null, true);
    }

    this.logger.log(`\x1b[31mUNAUTHORIZED ${message.split('{COLOR}').join('\x1b[31m')}`);
    return done(new UnauthorizedException('Invalid API Key'), null);
  };
}
