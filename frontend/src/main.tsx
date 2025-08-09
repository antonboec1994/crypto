import { createRoot } from 'react-dom/client';
import './assets/styles/global.scss';
import './index.css';
import App from './App.tsx';
import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
