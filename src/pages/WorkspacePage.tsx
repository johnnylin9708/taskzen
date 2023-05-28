import React, { useEffect, useState } from "react";
import Workspace from "components/Workspace";
import { Outlet } from "react-router-dom";
import SideBar from "components/SideBar";
import WorkspaceAdditionModal from "components/WorkspaceAdditionModal";
import { getAllTasksByUserId } from "API";
import { useAuth } from "hook";
import Loading from "components/Loading";
import TaskUpdateModal from "components/TaskUpdateModal";
import { Task } from "interface/common";
import TaskCreationModal from "components/TaskCreationModal";

const dateNum = 7;
const WorkspacePage: React.FC = () => {
  const { authInfo } = useAuth();

  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [dateList, setDateList] = useState<string[]>([]);
  const [task, setTask] = useState<Task>({
    id: 0,
    title: "",
    initiator: "",
    startDate: "",
    dueDate: "",
    status: "",
    content: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getDate = (next: number) => {
    const date = new Date(new Date().setDate(new Date().getDate() + next));
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const fetchMyTasks = async () => {
    const response = await getAllTasksByUserId(authInfo.id);

    setMyTasks(response.data);
  };

  useEffect(() => {
    setIsFetching(true);
    if (dateList.length === 0) {
      const tempList = [];
      for (let i = 0; i < dateNum; i++) {
        tempList.push(getDate(i));
      }
      setDateList(tempList);
    }

    if (authInfo.id) {
      fetchMyTasks();
    }
    setIsFetching(false);
  }, [authInfo]);

  useEffect(() => {
    if (refresh) {
      fetchMyTasks();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <>
      {/* <SideBar /> */}
      {isFetching && <Loading />}

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex mt-5">
              <h3>我的任務</h3>
              <button
                type="button"
                className="btn btn-outline-warning ms-3"
                style={{ width: "20%", height: "5%" }}
                data-bs-toggle="modal"
                data-bs-target="#taskCreationModal"
              >
                Create
              </button>
            </div>

            <ul>
              {dateList.map((date) => {
                const myTasksInDate = myTasks.filter(
                  (myTask) => new Date(myTask.dueDate) > new Date(date)
                );

                return (
                  <>
                    <li>{date}</li>
                    <ul>
                      {myTasksInDate.map((myTask) => (
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => setTask(myTask)}
                          data-bs-toggle="modal"
                          data-bs-target="#taskUpdateModal"
                        >
                          {`${myTask.dueDate} / ${myTask.title}`}
                        </li>
                      ))}
                    </ul>
                  </>
                );
              })}
            </ul>
          </div>
          <div className="col">
            <h3 className="mt-5">任務邀請</h3>
            <ul>
              {/* <li>任務名稱</li>
              <li>任務名稱</li>
              <li>任務名稱</li> */}
            </ul>
            <h3 className="mt-5">備忘錄</h3>
            <ul>
              {myTasks
                .filter((myTask) => myTask.dueDate === "")
                .map((myTask) => (
                  <li>{myTask.title}</li>
                ))}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3 className="mt-5">我的工作坊</h3>

            <div className="row mt-3">
              <div className="col-2">
                <Workspace />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="float-end mt-4">
          <WorkspaceAdditionModal />
        </div>
        <br />
        <br />
        <div className="row mt-4">
          <div className="col-3">
            <Workspace />
          </div>
          <div className="col-3">
            <Workspace />
          </div>
          <div className="col-3">
            <Workspace />
          </div>
          <div className="col-3">
            <Workspace />
          </div>
        </div> */}
      </div>
      <TaskCreationModal setRefresh={setRefresh} />
      <TaskUpdateModal task={task} setRefresh={setRefresh} />
    </>
  );
};

export default WorkspacePage;
