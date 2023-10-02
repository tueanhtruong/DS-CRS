import { GenerateTokenService } from '@commons/auth/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/commons';
import { CreateEventDto, GetEventsRequestQuery } from './dto';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    private tokenService: GenerateTokenService,
  ) {}

  async findAll(query: GetEventsRequestQuery) {
    const { username, id } = query;
    if (!username && !id) {
      return await this.prisma.event.findMany({
        select: {
          id: true,
          metaData: true,
          createdBy: {
            select: {
              username: true,
              displayName: true,
              id: true,
            },
          },
        },
      });
    }
    const users = await this.prisma.event.findMany({
      where: {
        OR: [
          {
            createdBy: {
              username: username,
            },
          },
          { id: id },
        ],
      },
      select: {
        id: true,
        metaData: true,
        createdBy: {
          select: {
            username: true,
            displayName: true,
            id: true,
          },
        },
      },
    });
    return users;
  }

  async upsert(createEventDto: CreateEventDto) {
    const { username, metaData, id } = createEventDto;
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) throw new BadRequestException(`user ${username} is not exists.`);
    if (!id) {
      const event = await this.prisma.event.create({
        data: {
          metaData,
          createdBy: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return {
        id: event.id,
      };
    }
    const event = await this.prisma.event.update({
      where: {
        id: id,
      },
      data: {
        metaData,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return {
      id: event.id,
    };
  }
}
