import { GenerateTokenService, UserInfo } from '@commons/auth/jwt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/commons';
import { CreateUserDto, GetUsersRequestQuery, LoginUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private tokenService: GenerateTokenService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const [userWithUserName] = await this.findAll({
      username: createUserDto.username,
    });

    if (userWithUserName)
      throw new BadRequestException(
        `A user with the user name ${userWithUserName.username} already exists.`,
      );
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return {
      id: user.id,
    };
  }

  async findAll(query: GetUsersRequestQuery) {
    const { username } = query;
    const users = await this.prisma.user.findMany({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        metaData: true,
        events: {
          select: {
            id: true,
            metaData: true,
          },
        },
      },
    });
    return users;
  }

  async login(payload: LoginUserDto) {
    const validUser = await this.prisma.user.findFirst({
      where: {
        username: payload.username,
      },
    });

    if (!validUser) throw new UnauthorizedException(`Username is not valid.`);

    const tokens = await this.tokenService.gen({
      username: validUser.username,
      id: validUser.id,
    });
    return tokens;
  }

  async findMe(user: UserInfo) {
    const validUser = await this.prisma.user.findFirst({
      where: {
        username: user.username,
      },
    });

    if (!validUser) throw new UnauthorizedException(`User is not exists.`);
    return validUser;
  }

  async upsert(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.upsert({
      where: {
        username: createUserDto.username,
      },
      update: createUserDto,
      create: createUserDto,
    });
    return {
      id: user.id,
    };
  }
}
