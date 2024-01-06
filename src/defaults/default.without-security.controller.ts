import { Logger } from '@nestjs/common';

export class DefaultWithoutSecurityController {
  public logger: Logger;

  constructor(private object) {
    this.logger = new Logger(this.object.name);
  }
}
