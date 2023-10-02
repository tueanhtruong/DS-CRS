import { WeatherApiConfig } from '@commons/weatherApi/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

type QueryInfoInclude = 'days' | 'current';
export type QueryInfo = {
  location: string;
  include?: QueryInfoInclude[];
  date1?: string;
  date2?: string;
};

@Injectable()
export class WeatherApiService {
  constructor(
    private httpService: HttpService,
    private config: WeatherApiConfig,
  ) {}

  async query(query: QueryInfo) {
    const { location, include = [], date1, date2 } = query;
    let url = `${this.config.weatherApiUrl}${location}`;
    if (date1) {
      url = `${url}/${date1}`;
    }
    if (date2) {
      url = `${url}/${date2}`;
    }

    url = `${url}?${new URLSearchParams({
      include: include.join(','),
      key: this.config.weatherApiKey,
      unitGroup: 'metric',
      contentType: 'json',
    }).toString()}`;
    const response = await this.httpService.axiosRef.get(url);
    return response.data;
  }
}
