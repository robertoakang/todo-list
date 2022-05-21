import {
	BrowserRouter as Router,
	Route,
	Routes as Switch,
	Navigate
} from 'react-router-dom';
import { useAuth } from "../context/auth";

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

export default function Routes() {
	const { isAuthenticate } = useAuth();

	return (
		<Router>
			<Switch>
				<Route path="/" element={isAuthenticate ? <Home /> : <Login />} />
				<Route path="/todo" element={isAuthenticate ? <Home /> : <Navigate to="/" />} />
				<Route path="/signup" element={<Signup />} />
			</Switch>
		</Router>
	);
}
