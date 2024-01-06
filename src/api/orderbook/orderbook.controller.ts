import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { DefaultController } from '../../defaults/default.controller';
import { OrderbookHistoryPaginationDTO } from './dto/orderbook.dot';
import { OrderbookService } from './orderbook.service';

@Controller('orderbooks')
export class OrderbookController extends DefaultController {
  @Inject()
  private orderbookService: OrderbookService;

  constructor() {
    super(OrderbookController);
  }

  @Get(':pair')
  orderbook(@Param('pair') pair: string) {
    return this.orderbookService.getOrderbook({ pair });
  }

  @Get('/history/:pair')
  history(@Param('pair') pair: string, @Query() query: OrderbookHistoryPaginationDTO) {
    return this.orderbookService.getHistory({ pair, query: query });
  }
}
