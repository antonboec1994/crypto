import { UserType } from '../../types';
import { apiClient } from '../api';

export const registerUser = async (newUser: UserType) => {
	try {
		const res = await apiClient.post('user/register', newUser);
		return res.data;
	} catch (error: any) {
		if (error.response) {
			const errorMessage = error.response.data.message || 'Произошла ошибка';
			throw new Error(errorMessage);
		} else {
			console.error('Ошибка сети:', error.message);
		}
	}
};

export const loginUser = async (user: UserType) => {
	try {
		const res = await apiClient.post('user/login', user);
		localStorage.setItem('user', JSON.stringify(res.data));
		return res.data;
	} catch (error: any) {
		if (error.response) {
			const errorMessage = error.response.data.message || 'Произошла ошибка';
			throw new Error(errorMessage);
		} else {
			console.error('Ошибка сети:', error.message);
		}
	}
};

export const getUserApi = async (email: string) => {
	try {
		const res = await apiClient.post('user/getUser', { email });
		return res.data;
	} catch (error: any) {
		if (error.response) {
			const errorMessage = error.response.data.message || 'Произошла ошибка';
			throw new Error(errorMessage);
		} else {
			console.error('Ошибка сети:', error.message);
		}
	}
};
