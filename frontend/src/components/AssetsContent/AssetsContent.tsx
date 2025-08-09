import styles from './AssetsContent.module.scss';
import AssetChart from './AssetChart/AssetChart';
import AssetsTable from './AssetsTable/AssetsTable';
import { CryptoContext } from '../../context/cryptoContext';
import { useContext } from 'react';

const AssetsContent = () => {
	const { crypto, assets, parsedUserLS } = useContext(CryptoContext);

	const cryptoPriceMap = crypto.reduce<Record<string, number>>((acc, coin) => {
		acc[coin.id] = coin.price;
		return acc;
	}, {});

	return (
		<>
			{parsedUserLS?.access_token ? (
				<>
					Мои активы:
					<strong style={{ marginLeft: '10px' }}>
						{assets &&
							assets
								.map((asset: any) => asset.amount * cryptoPriceMap[asset.id])
								.reduce((acc, v) => (acc += v), 0)
								.toFixed(2)}
					</strong>
					$
				</>
			) : (
				<>Список доступных к покупке криптовалют:</>
			)}
			<div className={styles.inner}>
				<AssetChart />
				<AssetsTable />
			</div>
		</>
	);
};

export default AssetsContent;
