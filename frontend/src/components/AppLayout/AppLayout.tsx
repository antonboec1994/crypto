import { Layout, Spin } from 'antd';
import AppSider from './AppSider';
import AppHeader from './AppHeader';
import AppContent from './AppContent';

import styles from './AppLayout.module.scss';
import { useContext } from 'react';
import { CryptoContext } from '../../context/cryptoContext';

const AppLayout = () => {
	const { loading, parsedUserLS, user } = useContext(CryptoContext);

	if (loading) {
		return <Spin fullscreen />;
	}

	return (
		<Layout className={styles.layout}>
			<AppHeader />
			<Layout>
				<AppContent />
				{parsedUserLS?.access_token && Object.keys(user).length > 0 && (
					<AppSider />
				)}
			</Layout>
		</Layout>
	);
};

export default AppLayout;
