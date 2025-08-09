import { Button, Result } from 'antd';
import { useContext } from 'react';
import { CryptoContext } from '../../context/cryptoContext';
import { CryptoDataItemType } from '../../types';

interface ResultFormPropsType {
	coin: CryptoDataItemType;
	assetData: any;
}

const ResultForm: React.FC<ResultFormPropsType> = ({ coin, assetData }) => {
	const { setIsDrawerOpen } = useContext(CryptoContext);

	return (
		<Result
			status='success'
			title='New asses added!'
			subTitle={`Added ${assetData.amount} of ${coin.name} by price ${assetData.price}$`}
			extra={[
				<Button
					type='primary'
					key='console'
					onClick={() => setIsDrawerOpen(false)}
				>
					Close
				</Button>,
			]}
		/>
	);
};

export default ResultForm;
