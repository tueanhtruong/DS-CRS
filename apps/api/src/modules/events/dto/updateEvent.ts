import { OmitType } from '@nestjs/swagger';
import { CreateEventDto } from './createEvent';

export class UpdateEventDto extends OmitType(CreateEventDto, ['username']) {}
