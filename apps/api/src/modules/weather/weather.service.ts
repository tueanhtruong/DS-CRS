import { Injectable } from '@nestjs/common';
import { QueryInfo, WeatherApiService } from 'src/commons';
import { GetWeatherRequestQuery } from './dto';

@Injectable()
export class WeatherService {
  constructor(private weatherApiService: WeatherApiService) {}

  async getWeatherInfo(query: GetWeatherRequestQuery) {
    const { current } = query;

    const include: QueryInfo['include'] = ['days'];
    if (current) include.push('current');

    const data = await this.weatherApiService.query({
      location: query.location,
      date1: query.fromDate,
      date2: query.toDate,
      include,
    });
    return data;
  }
}
