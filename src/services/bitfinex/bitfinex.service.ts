import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { UtilsService } from '../utils/utils.service';
import { BitfinexGETDto } from './dto/bitfinex.dto';

export enum BITFINEX_PATH {
  GET_ORDER_BOOK = '/book/{pair}/{precision}',
  GET_TICKET_HISTORY = '/tickers/hist'
}

@Injectable()
export class BitfinexService {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  @Inject(HttpService)
  private readonly httpService: HttpService;
  @Inject(UtilsService)
  private readonly utils: UtilsService;

  public logger: Logger;

  constructor() {
    this.logger = new Logger(BitfinexService.name);
  }

  private _getAxiosConfig() {
    return { headers: { 'Content-Type': 'application/json' } };
  }

  async get(params: BitfinexGETDto): Promise<[number, number, number][]> {
    const fullURL = this.utils.getFullURL({ baseURL: this.config.get<string>('BITFINEX_URL'), url: params.url, path: params.path, query: params.query });
    this.logger.debug(`GET ${fullURL}`);

    const { data } = await firstValueFrom(
      this.httpService.get<any>(fullURL, this._getAxiosConfig()).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(`GET ${fullURL}`);
          this.logger.error(JSON.stringify(error.response?.data || JSON.stringify(error)));
          throw { status: 500, message: `${BitfinexService.name}(get):${error.message}`, stack: error.stack ?? null };
        })
      )
    );

    return data;
  }
}
