import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Outlet,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage, LoginPage } from "pages";
import Navigation from "components/Navigation";
import Setting from "components/Setting";
import { useAuth } from "hook";
import WorkspacePage from "pages/WorkspacePage";

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
    <div className="">
      <React.StrictMode>
        <BrowserRouter>
          <Navigation />
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/login" Component={LoginPage} />
            {/* <Route element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />}>
              </Route>
            </Route> */}
            <Route element={<PrivateRoute />}>
              <Route path="/workspace" element={<WorkspacePage />}>
                {/* <Route element={<Setting />} path="setting" />
                <Route element={<Member />} path="member" /> */}
              </Route>
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/setting" element={<Setting />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
};

export default App;
