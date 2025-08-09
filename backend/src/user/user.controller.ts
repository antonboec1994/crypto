import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Новый пользователь успешно зарегистрирован',
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @ApiResponse({
    status: 409,
    description: 'Пользователь с таким email уже существует',
  })
  async register(@Body() dto: UserDto) {
    return this.userService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Вход выполнен успешно',
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @ApiResponse({ status: 401, description: 'Неверный email или пароль' })
  async login(@Body() data: { email: string; password: string }) {
    return this.userService.login(data.email, data.password);
  }

  @Post('getUser')
  @ApiOperation({ summary: 'Получение данных пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Данные пользователся успешно получены',
  })
  async getUser(@Body() body: { email: string }) {
    const { email } = body;
    return this.userService.getUser(email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  @ApiOperation({ summary: 'Защищенный маршрут' })
  @ApiResponse({
    status: 200,
    description: 'Доступ к защищенному маршруту предоставлен',
  })
  @ApiResponse({ status: 401, description: 'Неавторизованный доступ' })
  protectedRoute() {
    return { message: 'Это защищенный роут' };
  }
}
