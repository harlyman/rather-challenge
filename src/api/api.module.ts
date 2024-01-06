import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { OrderbookModule } from './orderbook/orderbook.module';

@Module({
  controllers: [ApiController],
  imports: [OrderbookModule],
  providers: [ApiService]
})
export class ApiModule {}
