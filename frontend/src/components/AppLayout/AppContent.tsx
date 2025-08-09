import { Layout } from 'antd';
import styles from './AppLayout.module.scss';
import RegisterForm from '../Auth/RegisterForm';
import LoginForm from '../Auth/LoginForm';
import AssetsContent from '../AssetsContent/AssetsContent';
import { Route, Routes } from 'react-router';

const AppContent = () => {
	return (
		<Layout.Content className={styles.content}>
			<Routes>
				<Route path='/' element={<AssetsContent />} />
				<Route path='/register' element={<RegisterForm />} />
				<Route path='/login' element={<LoginForm />} />
			</Routes>
		</Layout.Content>
	);
};

export default AppContent;
