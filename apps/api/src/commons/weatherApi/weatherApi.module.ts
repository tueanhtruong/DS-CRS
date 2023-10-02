import {
  WeatherApiConfig,
  WeatherApiService,
  weatherApiConstants,
  weatherApiSchema,
} from '@commons';
import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

// @Module({
//   imports: [
//     HttpModule,
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [weatherApiConstants],
//       validationSchema: Joi.object(weatherApiSchema),
//       validationOptions: { abortEarly: true },
//     }),
//   ],
//   providers: [WeatherApiService, WeatherApiConfig],
//   exports: [WeatherApiService],
// })
// export class WeatherApiModule {}

@Module({})
export class WeatherApiModule {
  static register(): DynamicModule {
    return {
      module: WeatherApiModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [weatherApiConstants],
          validationSchema: Joi.object(weatherApiSchema),
          validationOptions: { abortEarly: true },
        }),
        HttpModule.register({
          timeout: 8000,
          maxRedirects: 5,
        }),
      ],
      providers: [WeatherApiService, WeatherApiConfig],
      exports: [WeatherApiService],
    };
  }
}
