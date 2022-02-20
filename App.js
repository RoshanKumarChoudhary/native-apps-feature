import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import NativeNavigator from './navigator/NativeNavigator';
import placeReducer from './redux/PlaceReducer';
import ReduxThunk from 'redux-thunk';
import { init } from './helper/db'

export default function App() {
  const rootReducer = combineReducers ({
    Place: placeReducer
  })
  init()
  .then(() => {
    console.log('Db initialized');
  })
  .catch(err => {
    console.log('DB initialized failed');
    console.log(err);
  })
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
  return (
  <Provider store={store} >
     <NativeNavigator />
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
