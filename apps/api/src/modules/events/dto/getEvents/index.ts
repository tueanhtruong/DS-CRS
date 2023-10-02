import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetEventsRequestQuery {
  @ApiPropertyOptional({
    description: 'user name create event',
    example: 'tue_truong',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'id of event',
    example: '',
  })
  @IsOptional()
  @IsString()
  id?: string;
}

export class GetEventsQuery {
  constructor(public readonly option: GetEventsRequestQuery) {}
}
