import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetsDto } from './assets.dto';

@ApiTags('assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post('add')
  @ApiOperation({ summary: 'Добавить новый ассет' })
  @ApiResponse({
    status: 200,
    description: 'Ассет успешно добавлен',
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @UsePipes(new ValidationPipe())
  addAsset(@Body() body: { userEmail: string; newAsset: AssetsDto }) {
    const { userEmail, newAsset } = body;
    return this.assetsService.addAsset(userEmail, newAsset);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Удалить выбранный ассет' })
  @ApiResponse({ status: 200, description: 'Ассет успешно удалён' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @ApiResponse({ status: 404, description: 'Пользователь или ассет не найден' })
  @UsePipes(new ValidationPipe())
  deleteAsset(@Body() body: { userEmail: string; assetId: number }) {
    const { userEmail, assetId } = body;
    return this.assetsService.deleteAsset(userEmail, assetId);
  }

  @Patch('change')
  @ApiOperation({ summary: 'Изменить выбранный ассет' })
  @ApiResponse({ status: 200, description: 'Ассет успешно изменён' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @ApiResponse({ status: 404, description: 'Пользователь или ассет не найден' })
  @UsePipes(new ValidationPipe())
  changeAsset(@Body() body: { userEmail: string; asset: AssetsDto }) {
    const { userEmail, asset } = body;
    return this.assetsService.changeAsset(userEmail, asset);
  }
}
