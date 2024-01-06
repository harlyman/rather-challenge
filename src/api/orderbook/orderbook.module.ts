import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BitfinexModule } from '../../services/bitfinex/bitfinex.module';
import { OrderbookEntity } from './entities/orderbook.entity';
import { OrderbookController } from './orderbook.controller';
import { OrderbookService } from './orderbook.service';

@Module({
  imports: [BitfinexModule, TypeOrmModule.forFeature([OrderbookEntity])],
  controllers: [OrderbookController],
  providers: [OrderbookService]
})
export class OrderbookModule {}
