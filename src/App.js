import { Provider, useSelector, shallowEqual } from "react-redux";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import Auth from "./routes/auth";
import "./static/style.css";
import BuildingList from "./page/building/BuildingList";
import Cookies from "js-cookie";

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

function ProviderConfig() {
  useSelector((state) => {
    return {
      token: state.authentication.token,
    };
  }, shallowEqual);

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        {Cookies.get("access_token") ? (
          <Routes>
            <Route path="/*" element={<BuildingList />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={<Auth />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
