import {
	Button,
	Card,
	Flex,
	List,
	message,
	Popconfirm,
	PopconfirmProps,
	Statistic,
	Tag,
	Typography,
} from 'antd';
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	DeleteFilled,
} from '@ant-design/icons';

import styles from './CardAsset.module.scss';
import { CryptoAssetsType } from '../../types';
import { useContext } from 'react';
import { CryptoContext } from '../../context/cryptoContext';
import { deleteAssetApi } from '../../api/assets';
import { getUserApi } from '../../api/users';

type CardAssetPropsType = {
	asset: CryptoAssetsType;
};

const CardAsset: React.FC<CardAssetPropsType> = ({ asset }) => {
	const { crypto, deleteAsset, parsedUserLS, updateUser } =
		useContext(CryptoContext);

	const confirm: PopconfirmProps['onConfirm'] = async () => {
		try {
			message.success('Актив успешно удалён');
			await deleteAssetApi(parsedUserLS.user.email, asset.id);
			const updatedUser = await getUserApi(parsedUserLS.user.email);
			updateUser(updatedUser);
			deleteAsset(asset);
		} catch (error) {
			console.error('Ошибка при удалении актива:', error);
		}
	};

	const currentCryptoAsset = crypto.find(item => item.id === asset.id);

	return (
		<>
			<Card className={styles.card}>
				<Statistic
					style={{ color: '#fff' }}
					title={
						<Flex style={{ alignItems: 'center' }}>
							<img
								src={currentCryptoAsset?.icon}
								alt={currentCryptoAsset?.name}
								style={{ marginRight: '10px', height: '30px', width: '30px' }}
							/>
							<span
								style={{
									color: '#141414',
									fontSize: '20px',
									fontWeight: '700',
								}}
							>
								{currentCryptoAsset?.name}
							</span>
						</Flex>
					}
					value={asset.totalAmount}
					precision={2}
					valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
					prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
					suffix='$'
				/>
				<List
					size='small'
					dataSource={[
						{
							title: 'Общая прибыль',
							value: asset.totalProfit,
							isTag: true,
						},
						{
							title: 'Количество актива',
							value: asset.amount,
							noSymbol: true,
						},
					]}
					renderItem={item => (
						<List.Item className={styles.list__item}>
							<span>{item.title}</span>
							{item.noSymbol ? (
								<Typography.Text>{item.value}</Typography.Text>
							) : (
								<Typography.Text type={asset.grow ? 'success' : 'danger'}>
									{item.isTag && (
										<Tag
											color={asset.grow ? 'green' : 'red'}
											style={{ marginRight: '10px' }}
										>
											{asset.growPercent}%
										</Tag>
									)}
									{item.value?.toFixed(2)}$
								</Typography.Text>
							)}
						</List.Item>
					)}
				/>
				<Popconfirm
					title='Удаление актива'
					description='Вы уверены что хотите удалить этот актив?'
					onConfirm={confirm}
					okText='Да'
					cancelText='Нет'
				>
					<Button danger className={styles.delete}>
						<DeleteFilled />
					</Button>
				</Popconfirm>
			</Card>
		</>
	);
};

export default CardAsset;
