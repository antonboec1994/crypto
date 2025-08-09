import { Link } from 'react-router';
import styles from './Auth.module.scss';
import { Button } from 'antd';
import { useContext } from 'react';
import { CryptoContext } from '../../context/cryptoContext';

const AuthButtons = () => {
	const { parsedUserLS, logout, user } = useContext(CryptoContext);

	return (
		<div className={styles.authButtons__inner}>
			{parsedUserLS?.access_token && Object.keys(user).length > 0 ? (
				<>
					<span className={styles.profile__email}>
						{parsedUserLS?.user.email}
					</span>
					<Button className={styles.authButton} onClick={logout}>
						Выход
					</Button>
				</>
			) : (
				<>
					<Button className={styles.authButton}>
						<Link to='/login'>Вход</Link>
					</Button>
					<Button className={styles.authButton}>
						<Link to='/register'>Регистрация</Link>
					</Button>
				</>
			)}
		</div>
	);
};

export default AuthButtons;
