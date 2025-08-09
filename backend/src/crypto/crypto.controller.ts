import { Body, Controller, Get, Post } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CryptoDto } from './crypto.dto';

@ApiTags('crypto')
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post('addCryptoFromArray')
  @ApiOperation({ summary: 'Добавить все криптовалюты из файла в базу данных' })
  @ApiResponse({ status: 200, description: 'Список криптовалют' })
  async addCryptoFromArray(@Body() data: CryptoDto[]) {
    return this.cryptoService.addCryptosFromArray(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все криптовалюты' })
  @ApiResponse({ status: 200, description: 'Список криптовалют' })
  get() {
    return this.cryptoService.getAll();
  }
}
