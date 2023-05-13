import React from "react";
import { Outlet } from "react-router-dom";
import "App.css";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="">
        <header className="">
          <div>
            <Outlet />
          </div>
        </header>
      </div>
    </>
  );
};

export default HomePage;
