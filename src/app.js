import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startAddExpense } from './actions/expenses';//must be { startSetExpenses } 
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;//let can help us reassign it later
const renderApp = () => {
  if(!hasRendered){
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
}; 

ReactDOM.render(<LoadingPage/>, document.getElementById('app'));



firebase.auth().onAuthStateChanged((user) => {
  if (user) {        
    store.dispatch(login(user.uid));              //store.dispatch(startSetExpenses()).then(() => { -this must be done in original file. 
    store.dispatch(startAddExpense()).then(() => {//this line is done for test purpose only to make it working here.
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
    
  } else {
    store.dispatch(logout()); 
    renderApp();
    history.push('/');
  }
});
