import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Main from './Main';
import Nav from './Nav';

function App() {
  return (
    <>
      <Nav />
      <Router>
        <Route path='/register' component={SignUp} />
        <Route path='/Login' component={Login} />
        <Route path='/Main' component={Main} />
      </Router>
    </>
  );
}

export default App;
