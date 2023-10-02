import { JsonValue } from '@commons/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    description: 'user name of event',
    example: 'tue_truong',
  })
  @IsString()
  @MaxLength(50)
  username: string;

  @ApiProperty({
    description: 'meta date of event',
    example: { key: 'value' },
  })
  @IsObject()
  metaData: JsonValue;

  @ApiProperty({
    description: 'id of event (update case only)',
    example: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;
}
