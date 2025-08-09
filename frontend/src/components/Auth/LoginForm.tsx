import { Button, Flex, Form, FormProps, Input, Typography } from 'antd';
import styles from './Auth.module.scss';
import { loginUser } from '../../api/users';
import { useContext } from 'react';
import { CryptoContext } from '../../context/cryptoContext';
import { Messages } from '../../enum';
import { UserType } from '../../types';
const { Title } = Typography;

type FieldType = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const { error, setError, btnLoading, setBtnLoading } =
		useContext(CryptoContext);

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		try {
			const userData: UserType = {
				email: values.email,
				password: values.password,
			};
			const response = await loginUser(userData);
			setError(response.message);
			setBtnLoading(!btnLoading);
			setTimeout(() => {
				window.location.href = '/';
				setBtnLoading(!btnLoading);
			}, 2000);
		} catch (error: any) {
			console.error('Ошибка при входе', error.message);
			setError(error.message);
		}
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {};

	return (
		<Flex vertical>
			<Title level={2} style={{ color: '#fff', textAlign: 'center' }}>
				Вход
			</Title>
			<Form
				className={styles.form}
				name='basic'
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item
					name='email'
					label='Email'
					rules={[
						{
							type: 'email',
							message: 'E-mail не корректный',
						},
						{
							required: true,
							message: 'Введите ваш E-mail!',
						},
					]}
				>
					<Input placeholder='Введите ваш email' />
				</Form.Item>
				<Form.Item
					name='password'
					label='Пароль'
					rules={[
						{
							required: true,
							message: 'Введите ваш пароль!',
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>
				<span
					style={{
						color: error === Messages.LOGIN_SUCCESS ? '#37c837' : '#e63a3a',
						textAlign: 'center',
						margin: '0 0 15px 0',
					}}
				>
					{error}
				</span>
				<Form.Item label={null}>
					<Button type='primary' htmlType='submit' loading={btnLoading}>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</Flex>
	);
};

export default LoginForm;
