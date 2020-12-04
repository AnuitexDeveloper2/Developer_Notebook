import React from "react";
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Header from "./components/header/Header";
import { createStore } from "redux";
import { configureStore } from "./redux/store";
import { Provider } from "react-redux";

const store = configureStore()
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
