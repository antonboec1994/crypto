import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUserByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });
  }

  async register(dto: UserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = {
      email: dto.email,
      password: hashedPassword,
      createdAt: dto.createdAt,
    };
    const existingUser = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new UnauthorizedException(
        'Пользователь с таким email уже существует',
      );
    }
    const createdUser = await this.prisma.users.create({
      data: newUser,
    });
    return {
      message: 'Регистрация прошла успешно',
      user: {
        email: createdUser.email,
        createdAt: createdUser.createdAt,
      },
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException(
        'Пользователь с таким email не существует',
      );
    }
    // Проверяем, совпадает ли пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }
    const assets =
      typeof user.assets === 'string'
        ? JSON.parse(user.assets)
        : user.assets || [];
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      message: 'Вход успешно выполнен',
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        createdAt: user.createdAt,
        assets: assets,
      },
    };
  }

  async getUser(email: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException(
        'Пользователь с таким email не существует',
      );
    }
    const assets =
      typeof user.assets === 'string'
        ? JSON.parse(user.assets)
        : user.assets || [];
    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      message: 'Пользователь успешно получен',
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        createdAt: user.createdAt,
        assets: assets,
      },
    };
  }
}
