import React from 'react';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './context/auth';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';

export default function App() {
	return (
		<div className="App">
			<AuthProvider>
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<Routes />
      </AuthProvider>
		</div>
	);
}
