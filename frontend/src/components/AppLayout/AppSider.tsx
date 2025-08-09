import { Layout } from 'antd';
import styles from './AppLayout.module.scss';
import { useContext } from 'react';
import { CryptoContext } from '../../context/cryptoContext';
import LoadingText from '../LoadingText/LoadingText';
import CardAsset from '../CardAsset/CardAsset';

const AppSider = () => {
	const { assets } = useContext(CryptoContext);

	return (
		<Layout.Sider className={styles.sider}>
			{assets.length !== 0 ? (
				assets.map((asset, index) => <CardAsset asset={asset} key={index} />)
			) : (
				<LoadingText />
			)}
		</Layout.Sider>
	);
};

export default AppSider;
