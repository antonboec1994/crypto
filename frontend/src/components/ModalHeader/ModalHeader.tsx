import { Divider, Flex, Modal, Tag, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import React from 'react';

const { Text, Title } = Typography;

interface ModalHeaderPropsType {
	value: any;
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
}

const ModalHeader: React.FC<ModalHeaderPropsType> = ({
	value,
	isModalOpen,
	setIsModalOpen,
}) => {
	return (
		<>
			<Modal
				open={isModalOpen}
				onOk={() => setIsModalOpen(false)}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
			>
				<Flex style={{ alignItems: 'center' }}>
					<img
						src={value?.icon}
						alt={value?.name}
						style={{ marginRight: '10px' }}
					/>
					<Title level={2} style={{ marginBottom: '0' }}>
						({value?.symbol}) {value?.name}
					</Title>
				</Flex>
				<Divider />
				<Paragraph>
					<Text strong>1 час: </Text>
					<Tag color={value?.priceChange1h > 0 ? 'green' : 'red'}>
						{value?.priceChange1h}
					</Tag>
					<Text strong>1 день: </Text>
					<Tag color={value?.priceChange1d > 0 ? 'green' : 'red'}>
						{value?.priceChange1d}
					</Tag>
					<Text strong>1 неделя: </Text>
					<Tag color={value?.priceChange1w > 0 ? 'green' : 'red'}>
						{value?.priceChange1w}
					</Tag>
				</Paragraph>
				<Paragraph>
					<Text strong>Цена: </Text>
					{value?.price.toFixed(2)}
				</Paragraph>
				<Paragraph>
					<Text strong>Цена в биткоинах: </Text>
					{value?.priceBtc.toFixed(3)}
				</Paragraph>
				<Paragraph>
					<Text strong>Рыночная капитализация: </Text>
					{value?.marketCap.toFixed(3)}
				</Paragraph>
				{value?.contractAddress && (
					<Paragraph>
						<Text strong>Код адреса: </Text>
						{value?.contractAddress}
					</Paragraph>
				)}
			</Modal>
		</>
	);
};

export default ModalHeader;
