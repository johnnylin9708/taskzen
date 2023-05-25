import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "hook";
import TaskCreationModal from "./TaskCreationModal";

const Navigation = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { isAuth, authLogout } = useAuth();
  const navigate = useNavigate();

  const handleCreateTask = () => {};

  return (
    <>
      <nav
        className="navbar text-bg-primary navbar-expand-lg px-5"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">
            LOGO
          </a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">
                  Home
                </a>
              </li> */}
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/workspace"
                >
                  Workspace
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/setting"
                >
                  Setting
                </a>
              </li>
              {isAuth && (
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-outline-warning mt-1"
                    data-bs-toggle="modal"
                    data-bs-target="#taskCreationModal"
                  >
                    Create
                  </button>
                </li>
              )}
            </ul>
            {isAuth && (
              <button
                className="btn btn-outline-danger"
                aria-current="page"
                onClick={authLogout}
              >
                logout
              </button>
            )}
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
      <TaskCreationModal />
    </>
  );
};

export default Navigation;
