import { JsonValue } from '@commons/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'user name of user account',
    example: 'tue_truong',
  })
  @IsString()
  @MaxLength(50)
  username: string;

  @ApiProperty({
    description: 'display name of user account',
    example: 'Tue Truong',
  })
  @IsString()
  @MaxLength(50)
  displayName: string;

  @ApiProperty({
    description: 'meta date of user account',
    example: { key: 'value' },
  })
  @IsObject()
  metaData: JsonValue;
}
