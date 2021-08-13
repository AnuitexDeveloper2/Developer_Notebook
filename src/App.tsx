import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./Pages/home/Home";
import Content from "./Pages/content";
import Header from "./components/header/index";
import { configureStore } from "./redux/store";
import { Provider } from "react-redux";
import { HeaderState } from "./redux/reducers/headerReducer";
import AdminRoute from "./components/common/adminRoute";

import './App.css';

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
          <AdminRoute>
          <Route exact path="/content" component={Content} />
          </AdminRoute>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
