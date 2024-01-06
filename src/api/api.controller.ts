import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DefaultWithoutSecurityController } from 'src/defaults/default.without-security.controller';
import { ApiService } from './api.service';

@ApiTags('API')
@Controller()
export class ApiController extends DefaultWithoutSecurityController {
  @Inject(ApiService)
  private readonly apiService: ApiService;

  constructor() {
    super(ApiController.name);
  }

  @Get()
  @ApiOperation({ summary: 'API description and version' })
  getInfo(): string {
    return this.apiService.getInfo();
  }
}
