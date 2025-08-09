import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CryptoDto } from './crypto.dto';
import { cryptoData } from 'src/data/data';

@Injectable()
export class CryptoService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const existingArray = await this.prisma.crypto.findMany();
    if (existingArray.length === 0) {
      await this.addCryptosFromArray(cryptoData);
      console.log(`Массив криптовалюты успешно добавлен в базу данных!`);
    } else {
      console.log(`Массив криптовалюты уже существует в базе данных!`);
    }
  }

  async addCryptosFromArray(data: CryptoDto[]) {
    const cryptoData = data.map((item) => ({
      icon: item.icon,
      name: item.name,
      symbol: item.symbol,
      rank: item.rank,
      price: item.price,
      priceBtc: item.priceBtc,
      volume: item.volume,
      marketCap: item.marketCap,
      availableSupply: item.availableSupply,
      totalSupply: item.totalSupply,
      priceChange1h: item.priceChange1h,
      priceChange1d: item.priceChange1d,
      priceChange1w: item.priceChange1w,
      redditUrl: item.redditUrl || null,
      websiteUrl: item.websiteUrl || null,
      twitterUrl: item.twitterUrl || null,
      contractAddress: item.contractAddress || null,
      decimals: item.decimals || null,
      explorers: item.explorers || [],
    }));
    await this.prisma.crypto.createMany({
      data: cryptoData,
    });
  }

  async getById(id: string) {
    const crypto = await this.prisma.crypto.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!crypto) throw new NotFoundException('Криптовалюта не найдена');
    return crypto;
  }

  getAll() {
    return this.prisma.crypto.findMany();
  }
}
