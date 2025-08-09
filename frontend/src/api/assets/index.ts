import { CryptoAssetsType } from '../../types';
import { apiClient } from '../api';

export const addAssetApi = async (
	userEmail: string,
	newAsset: CryptoAssetsType
) => {
	try {
		const res = await apiClient.post('assets/add', { userEmail, newAsset });
		return res.data;
	} catch (error: any) {
		console.error('Ошибка при запросе к API: ', error.message);
	}
};

export const deleteAssetApi = async (userEmail: string, assetId: number) => {
	try {
		const res = await apiClient.delete('assets/delete', {
			data: { userEmail, assetId },
		});
		return res.data;
	} catch (error: any) {
		console.error('Ошибка при запросе к API: ', error.message);
	}
};

export const changeAssetApi = async (
	userEmail: string,
	asset: CryptoAssetsType
) => {
	try {
		const res = await apiClient.patch('assets/change', { userEmail, asset });
		return res.data;
	} catch (error: any) {
		console.error('Ошибка при запросе к API: ', error.message);
	}
};
