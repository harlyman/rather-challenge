import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UtilsService {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  clearUrlPath(url: string): string {
    return url.charAt(url.length - 1) === '/' ? url.substring(0, url.length - 1) : url;
  }

  getFullURL(params: { baseURL: string; url: string; path?: any; query?: any }): string {
    let path = params.url.toString();
    if (params.path) {
      Object.keys(params.path).forEach((key) => {
        path = path.replace(`{${key}}`, params.path[key]);
      });
    }

    const query = [];
    if (params.query) {
      Object.keys(params.query).forEach((key) => {
        if (params.query[key] !== undefined) {
          query.push(`${key}=${params.query[key]}`);
        }
      });
    }

    return this.clearUrlPath(params.baseURL) + path + (query.length ? `?${query.join('&')}` : '');
  }
}
