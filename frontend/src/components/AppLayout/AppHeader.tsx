import { Button, Drawer, Layout, Select, Space } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../../context/cryptoContext';
import { CryptoDataItemType } from '../../types';
import DrawerForm from '../DrawerForm/DrawerForm';
import styles from './AppLayout.module.scss';
import ModalHeader from '../ModalHeader/ModalHeader';
import AuthButtons from '../Auth/AuthButtons';
import { Link } from 'react-router-dom';

const AppHeader = () => {
	const { crypto, isDrawerOpen, setIsDrawerOpen, parsedUserLS, user } =
		useContext(CryptoContext);
	const [isSelectVisible, setIsSelectVisible] = useState(false);
	const [selectedOption, setSelectedOption] = useState<CryptoDataItemType>();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSelect = (value: string) => {
		setSelectedOption(crypto.find(item => item.id === Number(value)));
		setIsModalOpen(true);
	};

	useEffect(() => {
		const keydown = (event: KeyboardEvent) => {
			if (event.key === '/') {
				setIsSelectVisible(prev => !prev);
			}
		};
		document.addEventListener('keydown', keydown);
		return () => document.removeEventListener('keydown', keydown);
	}, []);

	return (
		<Layout.Header className={styles.header}>
			<Select
				style={{ width: '250px' }}
				value='Нажмите / чтобы открыть'
				onSelect={handleSelect}
				open={isSelectVisible}
				onClick={() => setIsSelectVisible(prev => !prev)}
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
			{parsedUserLS?.access_token && Object.keys(user).length > 0 && (
				<Button
					type='primary'
					style={{ marginLeft: '20px', minWidth: '150px' }}
					onClick={() => setIsDrawerOpen(true)}
				>
					Добавить актив
				</Button>
			)}
			<ModalHeader
				value={selectedOption}
				isModalOpen={isModalOpen}
				setIsModalOpen={(status: boolean) => setIsModalOpen(status)}
			/>
			<Drawer
				title='Добавление актива'
				onClose={() => setIsDrawerOpen(false)}
				open={isDrawerOpen}
				destroyOnClose
				width={500}
			>
				<DrawerForm />
			</Drawer>
			<Button style={{ marginLeft: '130px', marginRight: '130px' }}>
				<Link to='/'>На главную</Link>
			</Button>
			<AuthButtons />
		</Layout.Header>
	);
};

export default AppHeader;
