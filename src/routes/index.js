import {
  BrowserRouter as Router, Route, Routes as Switch,
} from 'react-router-dom';
// import { useAuth } from '../contexts/auth';
// import { Home } from '../pages/Home';
import Login from '../pages/Login';
// import { Signup } from '../pages/Signup';

export default function Routes() {
//   const { isAuthenticate } = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/" element={<Login />} />
      </Switch>
    </Router>
  );
}
