import React from 'react';
import './App.css';
import ItemCRUD from './ItemCrud';
import { Provider } from 'react-redux';
import store from './store';


function App(){
  return (
    <Provider store={store}>
    <div className="App">
<ItemCRUD/>
    </div>
  </Provider> 
  );
}

export default App;
