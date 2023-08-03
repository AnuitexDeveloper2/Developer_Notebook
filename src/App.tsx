import { Route, Routes } from "react-router-dom";

import Home from "./Pages/home/Home";
import Content from "./Pages/adminContent";
import Header from "./components/header/Header";
import { setupStore } from "./redux/store";
import { Provider } from "react-redux";
import AdminRoute from "./components/common/adminRoute";

import TopicPage from "./Pages/topic/TopicPage";
import AlertDialog from "./components/common/alert/Alert";

function App() {

  return (
    <Provider store={setupStore()}>
      <AlertDialog />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:id" element={<TopicPage />} />
          <Route
            path="/content"
            element={
              <AdminRoute>
                <Content />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
