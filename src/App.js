import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Layout
import Header from './components/Layout/Header';

// Pages
import InstagramApp from './pages/InstagramApp';

// Style
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='app'>
          <Header />
          <Switch>
            <Route exact path='/' component={InstagramApp} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
