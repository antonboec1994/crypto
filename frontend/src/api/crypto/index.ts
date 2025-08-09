import { apiClient } from '../api';

export const getCryptoDataApi = async () => {
	try {
		const res = await apiClient.get('crypto');
		return res.data;
	} catch (error: any) {
		console.error('Ошибка при запросе к API: ', error.message);
		throw error;
	}
};
