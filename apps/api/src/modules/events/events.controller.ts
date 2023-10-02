import { ResponseInterceptor } from '@commons';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEventDto, GetEventsRequestQuery } from './dto';
import { EventsService } from './events.service';

@ApiTags('Events')
@UseInterceptors(ResponseInterceptor)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // @Post()
  // create(@Body() createEventDto: CreateEventDto) {
  //   return this.eventsService.create(createEventDto);
  // }

  @Post('/upsert')
  upsert(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.upsert(createEventDto);
  }

  // @Post('/login')
  // login(@Body() payload: LoginEventDto) {
  //   return this.eventsService.login(payload);
  // }

  // @ApiSecurity(ApiKeyTag)
  // @UseGuards(ApiKeyAuthGuard)
  @Get()
  findAll(@Query() query: GetEventsRequestQuery) {
    return this.eventsService.findAll(query);
  }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Get('/me')
  // findMe(@ReqUser() event: UserInfo) {
  //   return this.eventsService.findMe(event);
  // }
}
