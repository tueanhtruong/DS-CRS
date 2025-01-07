import { OmitType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './createUser';

export class LoginUserDto extends OmitType(
  PickType(CreateUserDto, ['username', 'displayName']),
  ['displayName'],
) {}
