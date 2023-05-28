import {
  createTask,
  getAllMembers,
  getAllStatus,
  getAllTeams,
  updateTask,
} from "API";
import { useAuth } from "hook";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import AlertMessage from "./AlertMessage";
import { Task, UpdateTask } from "interface/common";

interface Props {
  task: Task;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}
const TaskUpdateModal = (props: Props) => {
  const { task, setRefresh } = props;
  const { id, title, initiator, startDate, dueDate, status, content } = task;
  const { authInfo } = useAuth();

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [teams, setTeams] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const [members, setMembers] = useState<
    { id: number; name: string; teamName: string }[]
  >([]);

  const [statusList, setStatusList] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleTeamCheckbox = (e: ChangeEvent<Element>) => {
    const ischecked = (e.target as HTMLInputElement).checked;

    if (!ischecked) {
      const idx = selectedTeams.indexOf(e.target.id);
      selectedTeams.splice(idx, 1);
    } else {
      selectedTeams.push(e.target.id);
    }
    setSelectedTeams([...selectedTeams]);
  };

  const handleMemberCheckbox = (e: ChangeEvent<Element>) => {
    const ischecked = (e.target as HTMLInputElement).checked;

    if (!ischecked) {
      const idx = selectedMembers.indexOf(e.target.id);
      selectedMembers.splice(idx, 1);
    } else {
      selectedMembers.push(e.target.id);
    }
    setSelectedMembers([...selectedMembers]);
  };

  const handleTaskSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    //   for(var pair of .entries()) {
    //     console.log(pair[0]+ ', '+ pair[1]); // Get the key and the value
    //  }
    const originTask = {
      title: task.title,
      initiator: task.initiator,
      startDate: task.startDate,
      dueDate: task.dueDate,
      status: task.status,
      content: task.content,
    };

    const taskInfo: UpdateTask = {
      ...originTask,
      title: data.get("title")?.toString() || "",
      initiator: data.get("initiator")?.toString() || authInfo.id,
      startDate: data.get("startDate")?.toString() || "",
      dueDate: data.get("dueDate")?.toString() || "",
      status: data.get("status")?.toString() || "",
      content: data.get("content")?.toString() || "",
    };

    const response = await updateTask(taskInfo, task.id);

    if (response.message === "updated") {
      // fetchTeamData();
      setRefresh(true);
    }
    await handleModalClosed("taskUpdateModal");
  };

  const handleModalClosed = async (id: string) => {
    const modal = (window as any).bootstrap.Modal.getInstance(
      document.getElementById(`${id}`)
    );

    await modal.hide();
  };

  useEffect(() => {
    // async function fetchTeamData() {
    //   const teamsResponse = await getAllTeams();
    //   setTeams(teamsResponse.data);
    // }
    // fetchTeamData();

    // async function fetchMemberData() {
    //   const response = await getAllMembers();
    //   setMembers(response.data);
    // }
    // fetchMemberData();

    async function fetchStatusData() {
      const response = await getAllStatus();
      setStatusList(response.data);
    }
    fetchStatusData();
  }, []);

  return (
    <>
      {errorMsg && <AlertMessage errorMessage={errorMsg} />}
      <div
        className="modal fade"
        id="taskUpdateModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="taskUpdateModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="taskUpdateModalLabel">
                Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleTaskSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    defaultValue={title}
                    placeholder="Task Title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Initiator</label>
                  <input
                    type="text"
                    className="form-control"
                    id="initiator"
                    name="initiator"
                    defaultValue={authInfo.username}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="mx-3 px-3"
                    id="startDate"
                    name="startDate"
                    defaultValue={startDate}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label me-1">Due Date</label>
                  <input
                    type="date"
                    className="mx-3 px-3"
                    id="dueDate"
                    name="dueDate"
                    defaultValue={dueDate}
                  />
                </div>
                {/* <div className="mb-3">
                  <label className="form-label">Teams</label>
                  <br />
                  <div className="d-flex flex-row">
                    {teams.map((team) => (
                      <div className="m-2">
                        <input
                          type="checkbox"
                          className="btn-check"
                          id={team.name}
                          autoComplete="off"
                          onChange={handleTeamCheckbox}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor={team.name}
                        >
                          {team.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-1">
                  <label className="form-label">Assignee</label>
                  <br />
                  <div className="d-flex flex-row flex-wrap">
                    {selectedTeams.length > 0 ? (
                      members.map((member) => {
                        if (
                          !selectedTeams.find(
                            (team) => team === member.teamName
                          )
                        ) {
                          return <></>;
                        }
                        return (
                          <div className="m-2">
                            <input
                              type="checkbox"
                              className="btn-check"
                              id={member.name}
                              autoComplete="off"
                              onChange={handleMemberCheckbox}
                            />
                            <label
                              className="btn btn-outline-success"
                              htmlFor={member.name}
                            >
                              {`[${member.teamName}] ${member.name}`}
                            </label>
                          </div>
                        );
                      })
                    ) : (
                      <div className="alert alert-primary" role="alert">
                        Please Select a Team!
                      </div>
                    )}
                  </div>
                </div> */}
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    aria-label="Default select example"
                  >
                    <option selected>Please Select</option>
                    {statusList.length > 0 &&
                      statusList.map((status) => (
                        <option
                          defaultValue={status.id}
                        >{`${status.name}`}</option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Board</label>
                  {/* <select
                    className="form-select"
                    id="board"
                    name="board"
                    aria-label="Default select example"
                  >
                    <option selected>Please Select</option>
                    {status.length > 0 &&
                      status.map((status) => (
                        <option defaultValue={status.id}>{`${status.name}`}</option>
                      ))}
                  </select> */}
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    defaultValue={content}
                    rows={3}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskUpdateModal;
