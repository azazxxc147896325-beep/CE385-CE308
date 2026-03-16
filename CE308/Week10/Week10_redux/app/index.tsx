import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TodoScreen from './Screens/TodoScreen';
//import CartScreen from './Screens/CartScreen';
export default function App() {
  return (
    <Provider store={store}>
      <TodoScreen />
    </Provider>
  );
}