import { BITFINEX_PATH } from '../bitfinex.service';

export class BitfinexGETDto {
  url: BITFINEX_PATH;
  path?: any;
  query?: any;
}
