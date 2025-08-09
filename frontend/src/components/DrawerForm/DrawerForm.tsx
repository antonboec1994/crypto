import {
	Button,
	DatePicker,
	Divider,
	Flex,
	Form,
	InputNumber,
	Select,
	Space,
} from 'antd';
import { useContext, useRef, useState } from 'react';
import { CryptoContext } from '../../context/cryptoContext';
import styles from './DraweForm.module.scss';
import Title from 'antd/es/typography/Title';
import ResultForm from '../ResultForm/ResultForm';
import { CryptoAssetsType, CryptoDataItemType } from '../../types';
import { addAssetApi, changeAssetApi } from '../../api/assets';
import { getUserApi } from '../../api/users';

type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
	amount?: number;
	price?: number;
	total?: number;
	date?: number;
	addAsset: () => void;
};

const validateMessages = {
	required: '${label} is required!',
	types: {
		number: '${label} is not valid number',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
};

const DrawerForm = () => {
	const { crypto, assets, mapAssets, setAssets, updateUser, parsedUserLS } =
		useContext(CryptoContext);
	const [coin, setCoin] = useState<CryptoDataItemType>();
	const [submitted, setSubmitted] = useState(false);
	const [form] = Form.useForm();
	const assetRef = useRef<any>(null);

	if (!coin) {
		return (
			<Select
				style={{ width: '100%' }}
				value='Выберите актив'
				onSelect={value =>
					setCoin(crypto.find(item => item.id === Number(value)))
				}
				options={crypto.map(coin => ({
					value: coin.id,
					label: coin.name,
					icon: coin.icon,
				}))}
				optionRender={option => (
					<Space>
						<img
							className={styles.select__image}
							src={option.data.icon}
							alt={option.data.label}
						/>
						{option.data.label}
					</Space>
				)}
			/>
		);
	}

	if (submitted) {
		return <ResultForm coin={coin} assetData={assetRef.current} />;
	}

	const onFinish = async (values: any) => {
		try {
			setSubmitted(true);
			const existingAsset = assets.findIndex(item => item.id === coin.id);
			if (existingAsset !== -1) {
				const newAsset: CryptoAssetsType = {
					id: coin.id,
					amount: values.amount,
					price: values.price,
					date: values.date?.$d
						? values.date.$d.toLocaleString()
						: new Date().toLocaleString(),
					name: coin.name,
				};
				assetRef.current = newAsset;
				await changeAssetApi(parsedUserLS.user.email, newAsset);
			} else {
				const newAsset: CryptoAssetsType = {
					id: coin.id,
					amount: values.amount,
					price: values.price,
					date: values.date?.$d
						? values.date.$d.toLocaleString()
						: new Date().toLocaleString(),
					name: coin.name,
				};
				assetRef.current = newAsset;
				await addAssetApi(parsedUserLS.user.email, newAsset);
			}
			const updatedUser = await getUserApi(parsedUserLS.user.email);
			setAssets(mapAssets(updatedUser.user.assets, crypto));
			updateUser(updatedUser);
		} catch (error) {
			console.error('Ошибка при добавлении актива:', error);
		}
	};

	const handleAmountChange = (value: any) => {
		const price = form.getFieldValue('price');
		form.setFieldsValue({
			total: +(value * price).toFixed(2),
		});
	};

	return (
		<>
			<Flex style={{ alignItems: 'center' }}>
				<img src={coin.icon} alt={coin.name} style={{ marginRight: '10px' }} />
				<Title level={2} style={{ marginBottom: '0' }}>
					({coin.symbol}) {coin.name}
				</Title>
			</Flex>
			<Divider />
			<Form
				form={form}
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: '100%' }}
				initialValues={{
					price: +coin.price.toFixed(2),
				}}
				onFinish={onFinish}
				validateMessages={validateMessages}
			>
				<Form.Item<FieldType>
					label='Количество'
					name='amount'
					rules={[{ required: true, type: 'number', min: 0 }]}
				>
					<InputNumber
						style={{ width: '100%' }}
						placeholder='Введите количество'
						onChange={handleAmountChange}
					/>
				</Form.Item>
				<Form.Item<FieldType> label='Цена' name='price'>
					<InputNumber
						style={{ width: '100%' }}
						disabled
						formatter={value => `${value} $`}
						parser={value => value?.replace(' $', '') as unknown as number}
					/>
				</Form.Item>
				<Form.Item<FieldType> label='Всего' name='total'>
					<InputNumber
						disabled
						style={{ width: '100%' }}
						formatter={value => `${value} $`}
						parser={value => value?.replace(' $', '') as unknown as number}
					/>
				</Form.Item>
				<Form.Item<FieldType> label='Дата' name='date'>
					<DatePicker showTime placeholder='Выберите дату' />
				</Form.Item>
				<Form.Item label={null}>
					<Button type='primary' htmlType='submit'>
						Добавить актив
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default DrawerForm;
