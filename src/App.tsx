import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Outlet,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage, LoginPage, WorkspacePage } from "pages";
import Navigation from "components/Navigation";
import { useAuth } from "hook";

function PrivateRoute() {
  const { isAuth } = useAuth();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(false);
  }, []);
  if (isFetching) return null;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

const App: React.FC = () => {
  return (
    <div className="App">
      <React.StrictMode>
        <BrowserRouter>
          <Navigation />
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" Component={LoginPage} />
            <Route element={<PrivateRoute />}>
              <Route path="/workspace" element={<WorkspacePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
};

export default App;
