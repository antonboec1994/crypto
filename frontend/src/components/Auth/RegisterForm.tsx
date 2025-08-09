import { Button, Flex, Form, FormProps, Input, Typography } from 'antd';
import styles from './Auth.module.scss';
import { registerUser } from '../../api/users';
import { useContext } from 'react';
import { CryptoContext } from '../../context/cryptoContext';
import { Messages } from '../../enum';
import { UserType } from '../../types';
const { Title } = Typography;

type FieldType = {
	email: string;
	password: string;
};

const RegisterForm = () => {
	const { error, setError, btnLoading, setBtnLoading } =
		useContext(CryptoContext);

	const onFinish: FormProps<FieldType>['onFinish'] = async values => {
		try {
			const userData: UserType = {
				email: values.email,
				password: values.password,
				createdAt: new Date().toLocaleString(),
			};
			const res = await registerUser(userData);
			setError(res.message);
			setBtnLoading(!btnLoading);
			setTimeout(() => {
				window.location.href = '/login';
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
				Регистрация
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
				<Form.Item
					name='confirm'
					label='Подтвердите пароль'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Введите ваш пароль!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Пароли не совпадают!'));
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>
				<span
					style={{
						color: error === Messages.REGISTER_SUCCESS ? '#37c837' : '#e63a3a',
						textAlign: 'center',
						margin: '0 0 15px 0',
					}}
				>
					{error}
				</span>
				<Form.Item label={null}>
					<Button type='primary' htmlType='submit' loading={btnLoading}>
						Регистрация
					</Button>
				</Form.Item>
			</Form>
		</Flex>
	);
};

export default RegisterForm;
