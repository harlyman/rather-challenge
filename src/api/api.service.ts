import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DefaultService } from 'src/defaults/defatul.service';

@Injectable()
export class ApiService extends DefaultService {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  constructor() {
    super(ApiService.name);
  }

  getInfo(): any {
    return {
      description: this.config.get<string>('DESCRIPTION'),
      version: '1.0.0'
    };
  }
}
