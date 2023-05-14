import React from "react";
import TaskCard from "components/TaskCard";
import { Outlet } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-3">
            <TaskCard />
          </div>
          <div className="col-3">
            <TaskCard />
          </div>
          <div className="col-3">
            <TaskCard />
          </div>
          <div className="col-3">
            <TaskCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
