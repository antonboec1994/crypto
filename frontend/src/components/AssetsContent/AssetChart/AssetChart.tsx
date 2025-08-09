import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styles from './AssetChart.module.scss';
import { useContext } from 'react';
import { CryptoContext } from '../../../context/cryptoContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const AssetChart = () => {
	const { crypto, assets, parsedUserLS } = useContext(CryptoContext);

	const randomColors = (length: number) => {
		return new Array(length).fill(null).map(() => {
			const randomNumber1 = Math.floor(Math.random() * 256);
			const randomNumber2 = Math.floor(Math.random() * 256);
			const randomNumber3 = Math.floor(Math.random() * 256);
			return `rgba(${randomNumber1},${randomNumber2},${randomNumber3},1)`;
		});
	};

	const getChartData = () => {
		if (parsedUserLS?.access_token) {
			return {
				labels: assets.map((asset: any) => asset.name),
				datasets: [
					{
						label: '# of Votes',
						data: assets.map((asset: any) => asset.totalAmount),
						backgroundColor: randomColors(assets.length),
					},
				],
			};
		} else {
			return {
				labels: crypto.map((asset: any) => asset.name),
				datasets: [
					{
						label: '# of Votes',
						data: crypto.map((asset: any) => asset.id),
						backgroundColor: randomColors(crypto.length),
					},
				],
			};
		}
	};

	return (
		<div className={styles.wrapper}>
			<Pie data={getChartData()} />
		</div>
	);
};

export default AssetChart;
