import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import Joi from 'joi';

export const weatherApiSchema = {
  WEATHER_API_KEY: Joi.string().min(16).max(64).alphanum().required(),
  WEATHER_API_URL: Joi.string().required(),
};
export const weatherApiConstants = registerAs('weatherApiSecret', () => ({
  weatherApiKey: process.env.WEATHER_API_KEY,
  weatherApiUrl: process.env.WEATHER_API_URL,
}));

@Injectable()
export class WeatherApiConfig {
  public readonly weatherApiKey: string;
  public readonly weatherApiUrl: string;

  constructor(
    @Inject(weatherApiConstants.KEY)
    config: ConfigType<typeof weatherApiConstants>,
  ) {
    if (config.weatherApiKey === undefined) {
      throw new Error('weatherApiKey is required');
    }
    if (config.weatherApiUrl === undefined) {
      throw new Error('weatherApiUrl is required');
    }

    this.weatherApiKey = config.weatherApiKey!;
    this.weatherApiUrl = config.weatherApiUrl!;
  }
}
