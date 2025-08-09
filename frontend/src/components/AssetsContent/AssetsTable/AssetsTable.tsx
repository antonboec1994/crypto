import { Table } from 'antd';
import type { TableColumnsType, TablePaginationConfig } from 'antd';
import styles from './AssetsTable.module.scss';
import { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../../../context/cryptoContext';

interface DataType {
	key: React.Key;
	name: string;
	price: number;
	amount?: number;
}

const AssetsTable = () => {
	const { crypto, assets, parsedUserLS } = useContext(CryptoContext);
	const [paginationConfig, setPaginationConfig] = useState<
		TablePaginationConfig | false
	>(false);

	const baseColumns: TableColumnsType<any> = [
		{
			title: 'Название',
			dataIndex: 'name',
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend'],
		},
		{
			title: 'Цена',
			dataIndex: 'price',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.price - b.price,
		},
	];

	const optionalColumns: TableColumnsType<any> = parsedUserLS?.token
		? [
				{
					title: 'Количество',
					dataIndex: 'amount',
					sorter: (a, b) => a.amount - b.amount,
				},
		  ]
		: [];

	const columns: TableColumnsType<DataType> = [
		...baseColumns,
		...optionalColumns,
	];

	useEffect(() => {
		if (parsedUserLS?.access_token) {
			setPaginationConfig(assets.length > 10 ? { pageSize: 10 } : false);
		} else {
			setPaginationConfig(crypto?.length > 10 ? { pageSize: 10 } : false);
		}
	}, [parsedUserLS, assets, crypto]);

	const getTableData = () => {
		if (parsedUserLS?.access_token) {
			const data = assets.map((asset: any) => ({
				key: asset.id,
				name: asset.name,
				price: asset.price,
				amount: asset.amount,
			}));
			return data;
		} else {
			const data = crypto.map((asset: any) => ({
				key: asset.id,
				name: asset.name,
				price: asset.price,
			}));
			return data;
		}
	};

	return (
		<>
			<Table<DataType>
				columns={columns}
				dataSource={getTableData()}
				showSorterTooltip={{ target: 'sorter-icon' }}
				pagination={paginationConfig}
				className={styles.table}
			/>
		</>
	);
};

export default AssetsTable;
