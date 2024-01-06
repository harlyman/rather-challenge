import { Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('api_key', ['x-api-key'])
@UseGuards(AuthGuard('x-api-key'))
export class DefaultController {
  public logger: Logger;

  constructor(private object) {
    this.logger = new Logger(this.object.name);
  }
}
