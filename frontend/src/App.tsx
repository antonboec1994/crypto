import AppLayout from './components/AppLayout/AppLayout';
import { CryptoContextProvider } from './context/cryptoContext';

const App = () => {
	return (
		<>
			<CryptoContextProvider>
				<AppLayout />
			</CryptoContextProvider>
		</>
	);
};

export default App;
