import {
  BrowserRouter as Router, Route, Routes as Switch,
} from 'react-router-dom';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Switch>
    </Router>
  );
}
