import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GetWeatherRequestQuery {
  @ApiProperty({
    description: 'location of weather query',
    example: 'hoi an, viet nam',
  })
  @IsString()
  location: string;

  @ApiPropertyOptional({
    description: 'get weather from date',
    example: '2020-10-01',
  })
  @IsOptional()
  @IsString()
  fromDate?: string;

  @ApiPropertyOptional({
    description: 'get weather to date',
    example: '2020-10-01',
  })
  @IsOptional()
  @IsString()
  toDate?: string;

  @ApiPropertyOptional({
    description: 'include current weather',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return Boolean(value);
  })
  current?: boolean;
}

export class GetWeatherQuery {
  constructor(public readonly option: GetWeatherRequestQuery) {}
}
