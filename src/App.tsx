import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./Pages/home/Home";
import Content from "./Pages/adminContent";
import Header from "./components/header/index";
import { configureStore } from "./redux/store";
import { Provider } from "react-redux";
import { HeaderState } from "./redux/reducers/headerReducer";
import AdminRoute from "./components/common/adminRoute";

import './App.css';
import TopicPage from "./Pages/topic";

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
          <Route exact path='/topic/:id' component={TopicPage}/>
          <AdminRoute>
          <Route exact path="/content" component={Content} />
          </AdminRoute>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
