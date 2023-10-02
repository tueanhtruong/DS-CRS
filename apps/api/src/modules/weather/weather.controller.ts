import { JwtAuthGuard, ResponseInterceptor } from '@commons';
import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetWeatherRequestQuery } from './dto';
import { WeatherService } from './weather.service';

@ApiTags('Weather')
@UseInterceptors(ResponseInterceptor)
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getWeatherInfo(@Query() query: GetWeatherRequestQuery) {
    return this.weatherService.getWeatherInfo(query);
  }
}
