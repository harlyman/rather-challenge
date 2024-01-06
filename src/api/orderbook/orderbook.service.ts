import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultService } from '../../defaults/defatul.service';
import { BITFINEX_PATH, BitfinexService } from '../../services/bitfinex/bitfinex.service';
import { ResposeResultsPaginationDTO } from '../dto/api.dto';
import { OrderbookHistoryPaginationDTO } from './dto/orderbook.dot';
import { OrderbookEntity } from './entities/orderbook.entity';

@Injectable()
export class OrderbookService extends DefaultService {
  @InjectRepository(OrderbookEntity)
  private readonly orderbookRepository: Repository<OrderbookEntity>;

  @Inject()
  private bitfinexService: BitfinexService;

  constructor() {
    super(OrderbookService);
  }

  private _processOrderbook(bitfinexData: [number, number, number][]): {
    askPrice: number;
    bidPrice: number;
    bidAmount: number;
    askAmount: number;
    lastPrice: number;
  } {
    const response = {
      askPrice: 0.0,
      bidPrice: 0.0,
      bidAmount: 0.0,
      askAmount: 0.0,
      lastPrice: bitfinexData[0][0]
    };
    for (const row of bitfinexData) {
      if (row[2] < 0) {
        if (response.askPrice === 0.0 || response.askPrice > row[0]) {
          response.askPrice = row[0];
        }
        response.askAmount += row[2];
      } else {
        if (response.bidPrice === 0.0 || response.bidPrice > row[0]) {
          response.bidPrice = row[0];
        }
        response.bidAmount += row[2];
      }
    }
    return response;
  }

  async getOrderbook(params: { pair: string }): Promise<any> {
    try {
      const bitfinexData = await this.bitfinexService.get({
        url: BITFINEX_PATH.GET_ORDER_BOOK,
        path: { pair: `t${params.pair.toUpperCase()}`, precision: 'P1' },
        query: { len: 100 }
      });

      const response = this._processOrderbook(bitfinexData);
      await this.orderbookRepository.save(
        this.orderbookRepository.create({
          pair: params.pair,
          bidAmount: response.bidAmount,
          bidPrice: response.bidPrice,
          askAmount: response.askAmount,
          askPrice: response.askPrice
        })
      );
      return response;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${OrderbookService.name}[getOrderbook]:${error.message}`);
    }
  }

  async getHistory(params: { pair: string; query: OrderbookHistoryPaginationDTO }): Promise<ResposeResultsPaginationDTO> {
    try {
      const forPage: number = parseInt(params.query.pageSize);
      const skip: number = parseInt(params.query.offset); // from where entities should be taken.

      const query = this.orderbookRepository
        .createQueryBuilder('orderbook')
        .select(OrderbookEntity.getColumnsWithPrefix('orderbook'))
        .orderBy('createdAt', 'DESC')
        .where('1=1');

      if (params.pair && params.pair !== '') {
        query.andWhere('orderbook.pair = :pair', { pair: params.pair });
      }

      const [results, total] = await query
        .orderBy(`orderbook.${params.query.orderBy}`, params.query.orderType === 'ASC' ? 'ASC' : 'DESC')
        .skip(skip)
        .take(forPage)
        .getManyAndCount();

      return { total: total, pageSize: forPage, offset: parseInt(params.query.offset), results: results };
    } catch (error) {
      this.logger.error(error);
      throw new Error(`${OrderbookService.name}[getHistory]:${error.message}`);
    }
  }
}
