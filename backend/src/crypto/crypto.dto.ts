import { IsNumber, IsString } from 'class-validator';

export class CryptoDto {
  @IsString()
  icon: string;

  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsNumber()
  rank: number;

  @IsNumber()
  price: number;

  @IsNumber()
  priceBtc: number;

  @IsNumber()
  volume: number;

  @IsNumber()
  marketCap: number;

  @IsNumber()
  availableSupply: number;

  @IsNumber()
  totalSupply: number;

  @IsNumber()
  priceChange1h: number;

  @IsNumber()
  priceChange1d: number;

  @IsNumber()
  priceChange1w: number;

  @IsString()
  redditUrl?: string;

  @IsString()
  websiteUrl?: string;

  @IsString()
  twitterUrl?: string;

  @IsString()
  contractAddress?: string;

  @IsNumber()
  decimals?: number;

  @IsString()
  explorers?: string[];
}
