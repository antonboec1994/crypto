import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { AssetsDto } from 'src/assets/assets.dto';

export class UserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'securepassword123',
    description: 'Пароль пользователя',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'Дата создания пользователя',
  })
  @IsString()
  createdAt: string;

  @ApiProperty({
    type: [AssetsDto],
    description: 'Массив ассетов пользователя (опционально)',
  })
  @ValidateNested({ each: true })
  @Type(() => AssetsDto)
  assets?: AssetsDto[];
}
