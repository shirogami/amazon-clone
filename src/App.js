import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe(
  'pk_test_51J05d0SIggL8bTZ28vuqjRHhA4jAMToeJpebdi7lDPCm00DKnyE5EqTOVvCBjZ4uUoMRAXe1Grify3SVbeRm0Uee00Py2hzKTC'
);


function App() {
  const [{ }, dispatch] = useStateValue();

  // listener 
  useEffect(() => {
    // will only run once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      if (authUser) {
        // the user just logged in or the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    });

  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>

          </Route>

          <Route path='/'>
            <Header />
            <Home />
          </Route>

        </Switch>

      </div>
    </Router>
  );
}

export default App;
