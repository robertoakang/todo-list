import {
  BrowserRouter as Router, Route, Routes as Switch,
} from 'react-router-dom';
import Login from '../pages/Login';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Login />} />
      </Switch>
    </Router>
  );
}
