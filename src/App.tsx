import React from "react";
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Header from "./components/header/Header";
import { createStore } from "redux";
import { configureStore } from "./redux/store";
import { Provider } from "react-redux";
import { HeaderState } from "./redux/reducers/headerReducer";

const store = configureStore()
const modalManager: HeaderState = {
  openLogin:false,
  openRegister:false,
}
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header modalManager={modalManager}/>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
