import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import './fonts/hk-grotesk/HKGrotesk-Regular.otf'

import AuthReducer from './store/reducers/auth'
import ClientsReducer from './store/reducers/clients'
import UsersReducer from './store/reducers/users'
import AssessmentsReducer from './store/reducers/assessments'

//higher order function that is added to help track changes to the store in development mode (shows the changes with redux dev tools extension in chrome)
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;


//combining all the instances (reducers) into one large reducer 
const rootReducer = combineReducers({
  auth: AuthReducer,
  clients: ClientsReducer,
  users: UsersReducer,
  assessments: AssessmentsReducer
});

const appReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'LOGOUT_SUCCESS') {
    //remoting the persisted:root (persisted redux state) in local storage and setting the state of the main reducer to undefined
    //reserting state in the application (wiping state)
    storage.removeItem('persist:root');
    state = undefined;
  }

  return rootReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth',
    'clients',
    'users',
    'assessments'], //list of reducers that need to be persisted to local storage
}

//create the persisted reducer
const persistedReducer = persistReducer(persistConfig, appReducer)

//creating the central store of the application
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk))); //applying redux thunk middleware which enables the action creators to return a function 
const persistor = persistStore(store);

//creating the app
//wrapping the app with router BrowserRouter to allow for routing in the application to make it an SPA
const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root')); //creates the root element of the web application

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
