import { GenerateTokenService, JwtConfig } from '@commons/auth/jwt';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule, PrismaModule } from 'src/commons';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, GenerateTokenService, JwtService, JwtConfig],
  imports: [PrismaModule, AuthModule],
})
export class EventsModule {}
