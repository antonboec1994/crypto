export type CryptoDataItemType = {
	id: number;
	icon: string;
	name: string;
	symbol: string;
	rank: number;
	price: number;
	priceBtc: number;
	volume: number;
	marketCap: number;
	availableSupply: number;
	totalSupply: number;
	priceChange1h: number;
	priceChange1d: number;
	priceChange1w: number;
	redditUrl: string;
	websiteUrl: string;
	twitterUrl: string;
	explorers: string[];
};

export type CryptoDataType = {
	result: CryptoDataItemType[];
};

export type CryptoAssetsType = {
	id: number;
	amount: number;
	price: number;
	date: string;
	name: string;
	grow?: boolean;
	growPercent?: number;
	totalAmount?: number;
	totalProfit?: number;
};

export type UserType = {
	email: string;
	password?: string;
	createdAt?: string;
	assets?: [];
};
