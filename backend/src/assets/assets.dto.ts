import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AssetsDto {
  @ApiProperty({ example: 1, description: 'Уникальный ID ассета' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 10, description: 'Количество ассета' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 100, description: 'Цена ассета' })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'Дата создания ассета',
  })
  @IsString()
  date: string;

  @ApiProperty({ example: 'Bitcoin', description: 'Название ассета' })
  @IsString()
  name: string;
}
