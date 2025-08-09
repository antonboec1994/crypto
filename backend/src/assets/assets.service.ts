import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AssetsDto } from './assets.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AssetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async addAsset(userEmail: string, dto: AssetsDto) {
    const user = await this.userService.getUserByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    const assets =
      typeof user.assets === 'string'
        ? JSON.parse(user.assets)
        : user.assets || [];
    const existingAsset = assets.find(
      (asset: AssetsDto) => asset.id === dto.id,
    );
    if (existingAsset) {
      throw new Error(`Ассет с ID ${dto.id} уже существует!`);
    }
    const newAsset = {
      id: dto.id,
      amount: dto.amount,
      price: dto.price,
      date: dto.date,
      name: dto.name,
    };
    assets.push(newAsset);
    return this.prisma.users.update({
      where: { email: userEmail },
      data: {
        assets: assets,
      },
    });
  }

  async deleteAsset(userEmail: string, assetId: number) {
    const user = await this.userService.getUserByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    const assets =
      typeof user.assets === 'string'
        ? JSON.parse(user.assets)
        : user.assets || [];
    const assetsFiltered = assets.filter(
      (asset: AssetsDto) => asset.id !== assetId,
    );
    return this.prisma.users.update({
      where: { email: userEmail },
      data: { assets: assetsFiltered },
    });
  }

  async changeAsset(userEmail: string, assetDto: AssetsDto) {
    const user = await this.userService.getUserByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    const assets =
      typeof user.assets === 'string'
        ? JSON.parse(user.assets)
        : Array.isArray(user.assets)
          ? user.assets
          : [];
    const assetIndex = assets.findIndex(
      (asset: AssetsDto) => asset.id === assetDto.id,
    );
    assets[assetIndex] = {
      ...assets[assetIndex],
      id: assetDto.id,
      date: assetDto.date,
      name: assetDto.name,
      price: assetDto.price,
      amount: assets[assetIndex].amount + assetDto.amount,
    };
    return this.prisma.users.update({
      where: {
        email: userEmail,
      },
      data: { assets: assets },
    });
  }
}
