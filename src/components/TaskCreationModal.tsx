import { getAllMembers, getAllStatus, getAllTeams } from "API";
import { useAuth } from "hook";
import React, { useEffect, useState } from "react";

const TaskCreationModal = () => {
  const [teams, setTeams] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const [members, setMembers] = useState<
    { id: number; name: string; teamName: string }[]
  >([]);

  const [status, setStatus] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");

    async function fetchTeamData() {
      const teamsResponse = await getAllTeams();
      setTeams(teamsResponse.data);
    }
    fetchTeamData();

    async function fetchMemberData() {
      const response = await getAllMembers();
      setMembers(response.data);
    }
    fetchMemberData();

    async function fetchStatusData() {
      const response = await getAllStatus();
      setStatus(response.data);
    }
    fetchStatusData();
  }, []);
  return (
    <>
      <div
        className="modal fade"
        id="taskCreationModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="taskCreationModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="taskCreationModalLabel">
                Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Task Title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Initiator</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Initiator"
                    name="Initiator"
                    value={username}
                    // placeholder="Task Title"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teams</label>
                  <select
                    className="form-select"
                    id="team"
                    name="team"
                    aria-label="Default select example"
                  >
                    <option selected>Please Select</option>
                    {teams.length > 0 &&
                      teams.map((member) => (
                        <option value={member.id}>{`${member.name}`}</option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Assignee</label>
                  <select
                    className="form-select"
                    id="assignee"
                    name="assignee"
                    aria-label="Default select example"
                  >
                    <option selected>Please Select</option>
                    {members.length > 0 &&
                      members.map((member) => (
                        <option
                          value={member.id}
                        >{`[${member.teamName}]  ${member.name}`}</option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    aria-label="Default select example"
                  >
                    <option selected>Please Select</option>
                    {status.length > 0 &&
                      status.map((status) => (
                        <option value={status.id}>{`${status.name}`}</option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={3}
                    required
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCreationModal;
