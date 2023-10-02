import { JwtAuthGuard, ReqUser, ResponseInterceptor, UserInfo } from '@commons';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, GetUsersRequestQuery, LoginUserDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@UseInterceptors(ResponseInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/upsert')
  upsert(@Body() createUserDto: CreateUserDto) {
    return this.usersService.upsert(createUserDto);
  }

  // @ApiSecurity(ApiKeyTag)
  // @UseGuards(ApiKeyAuthGuard)
  @Get()
  findAll(@Query() query: GetUsersRequestQuery) {
    return this.usersService.findAll(query);
  }
}

@ApiTags('Users Auth')
@UseInterceptors(ResponseInterceptor)
@Controller('users')
export class UsersAuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  login(@Body() payload: LoginUserDto) {
    return this.usersService.login(payload);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  findMe(@ReqUser() user: UserInfo) {
    return this.usersService.findMe(user);
  }
}
