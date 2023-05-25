import React from "react";
import TaskCard from "components/Workspace";
import { Outlet } from "react-router-dom";
import SideBar from "components/SideBar";
import WorkspaceAdditionModal from "components/WorkspaceAdditionModal";

const WorkspacePage: React.FC = () => {
  return (
    <>
      {/* <SideBar /> */}

      <div className="container">
        <div className="float-end mt-4">
          <WorkspaceAdditionModal />
        </div>
        <br />
        <br />
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

export default WorkspacePage;
