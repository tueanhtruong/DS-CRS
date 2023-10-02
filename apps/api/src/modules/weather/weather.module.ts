import { Module } from '@nestjs/common';
import { WeatherApiModule } from 'src/commons';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [WeatherApiModule.register()],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
