import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UtilsModule } from '../utils/utils.module';
import { BitfinexService } from './bitfinex.service';

@Module({
  imports: [HttpModule, UtilsModule],
  providers: [BitfinexService],
  exports: [BitfinexService]
})
export class BitfinexModule {}
