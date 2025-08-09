import { createContext, useEffect, useState } from 'react';
import { percentDifference } from '../utils/percentDifferenct';
import { CryptoAssetsType, CryptoDataItemType } from '../types';
import { getCryptoDataApi } from '../api/crypto';

interface CryptoContextType {
	assets: CryptoAssetsType[];
	crypto: CryptoDataItemType[];
	loading: boolean;
	isDrawerOpen: boolean;
	setIsDrawerOpen: any;
	addAsset: any;
	deleteAsset: any;
	changeAsset: any;
	mapAssets: any;
	setAssets: any;
	setUser: any;
	user: any;
	logout: any;
	error: string;
	setError: any;
	btnLoading: boolean;
	setBtnLoading: any;
	updateUser: any;
	parsedUserLS: any;
}

export const CryptoContext = createContext<CryptoContextType>({
	assets: [],
	crypto: [],
	loading: false,
	isDrawerOpen: false,
	setIsDrawerOpen: () => {},
	addAsset: () => {},
	deleteAsset: () => {},
	changeAsset: () => {},
	mapAssets: () => {},
	setAssets: () => {},
	setUser: () => {},
	user: {},
	logout: () => {},
	error: '',
	setError: () => {},
	btnLoading: false,
	setBtnLoading: () => {},
	updateUser: () => {},
	parsedUserLS: {},
});

export const CryptoContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [crypto, setCrypto] = useState<CryptoDataItemType[]>([]);
	const [assets, setAssets] = useState<CryptoAssetsType[]>([]);
	const [loading, setLoading] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [user, setUser] = useState<any>({});
	const [error, setError] = useState('');
	const [btnLoading, setBtnLoading] = useState(false);
	const userLS = localStorage.getItem('user');
	const parsedUserLS = userLS && JSON.parse(userLS);

	const mapAssets = (assets: any, result: any) => {
		return assets.map((asset: any) => {
			const coin = result.find(
				(item: any) => item.id === asset.id
			) as CryptoDataItemType;
			return {
				grow: asset.price < coin.price,
				growPercent: percentDifference(asset.price, coin.price),
				totalAmount: asset.amount * coin.price,
				totalProfit: asset.amount * coin.price - asset.amount * asset.price,
				name: coin.name,
				...asset,
			};
		});
	};

	useEffect(() => {
		async function preload() {
			try {
				setLoading(true);
				const cryptoData = await getCryptoDataApi();
				setCrypto(cryptoData);
				if (parsedUserLS) {
					setUser(parsedUserLS.user);
					setAssets(mapAssets(parsedUserLS.user.assets, cryptoData));
				}
			} catch (error: any) {
				console.error('Ошибка при загрузке данных: ', error.message);
				throw error;
			} finally {
				setLoading(false);
			}
		}

		preload();
	}, []);

	const addAsset = (newAsset: any) => {
		setAssets(prev => mapAssets([...prev, newAsset], crypto));
	};

	const updateUser = (user: any) => {
		setUser(user);
		localStorage.setItem('user', JSON.stringify(user));
	};

	const changeAsset = (newAsset: any) => {
		setAssets(prev =>
			mapAssets(
				prev.map(asset =>
					asset.id === newAsset.id ? { ...asset, ...newAsset } : asset
				),
				crypto
			)
		);
	};

	const deleteAsset = (newAsset: any) => {
		setAssets(prev =>
			mapAssets(
				prev.filter(asset => asset.id !== newAsset.id),
				crypto
			)
		);
	};

	const logout = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		setUser({});
		window.location.reload();
	};

	return (
		<CryptoContext.Provider
			value={{
				setAssets,
				mapAssets,
				loading,
				crypto,
				assets,
				isDrawerOpen,
				setIsDrawerOpen,
				addAsset,
				deleteAsset,
				changeAsset,
				setUser,
				user,
				logout,
				error,
				setError,
				btnLoading,
				setBtnLoading,
				updateUser,
				parsedUserLS,
			}}
		>
			{children}
		</CryptoContext.Provider>
	);
};
